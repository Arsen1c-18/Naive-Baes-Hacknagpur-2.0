import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        const session = supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Fetch Profile Helper & State
    const [profile, setProfile] = useState(null);
    const [emergencyContact, setEmergencyContact] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (user?.isDemo) {
            setProfileLoading(false);
            return;
        }

        if (user && supabase) {
            setProfileLoading(true);
            const fetchProfile = async () => {
                // Use maybeSingle() to avoid 406 errors for new users
                const { data: profileData } = await supabase
                    .from('public_profiles')
                    .select('*')
                    .eq('id', user.id)
                    .maybeSingle();

                if (profileData) setProfile(profileData);
                else {
                    // Check if user is trying to Login but has no profile (New User)
                    const flow = sessionStorage.getItem('auth_flow');
                    if (flow === 'login') {
                        await signOut();
                        navigate('/signup?message=Account+does+not+exist.+Please+Sign+Up');
                        setProfileLoading(false);
                        return;
                    }
                }

                // Fetch Emergency Contact
                const { data: contactData } = await supabase
                    .from('emergency_contacts')
                    .select('*')
                    .eq('user_id', user.id)
                    .maybeSingle();

                if (contactData) setEmergencyContact(contactData);
                setProfileLoading(false);
            };
            fetchProfile();
        } else {
            setProfile(null);
            setEmergencyContact(null);
            setProfileLoading(false);
        }
    }, [user]);

    const signUp = async (email, password, metaData = {}) => {
        if (!supabase) {
            // Mock Signup - Auto Login
            const mockUser = {
                id: 'mock-user-' + Math.random().toString(36).substr(2, 9),
                email,
                user_metadata: metaData
            };
            setUser(mockUser);
            return { data: { user: mockUser, session: { user: mockUser } }, error: null };
        }
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: metaData
            }
        });

        // Hack for Demo: If account created but email not verified (no session),
        // we force a local login state so they can enter immediately.
        if (data?.user && !data.session) {
            const demoUser = { ...data.user, isDemo: true };
            setUser(demoUser);

            // Do NOT set local profile here. We want to force the "Complete Profile" flow.
            // setProfile({ ... }); 
            // if (metaData.emergency_contact) ...

            return {
                data: { ...data, session: { user: demoUser, access_token: 'demo-token' } },
                error
            };
        }

        return { data, error };
    };

    const signIn = async (email, password) => {
        if (!supabase) return { error: { message: "Supabase not configured" } };
        return await supabase.auth.signInWithPassword({ email, password });
    };

    const signOut = async () => {
        if (!supabase) return;
        return await supabase.auth.signOut();
    };

    const signInWithGoogle = async (flow = 'signup') => {
        if (!supabase) return { error: { message: "Supabase not configured" } };

        sessionStorage.setItem('auth_flow', flow);

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin,
            }
        });
        return { data, error };
    };

    // Mock login for MVP if Supabase is missing
    const mockLogin = () => {
        setUser({
            id: 'mock-user-id',
            email: 'user@example.com',
            user_metadata: {
                full_name: 'Demo User',
                phone: '9876543210',
                emergency_contact: '112'
            }
        });
        setEmergencyContact({ phone_number: '112', contact_name: 'Emergency Services' });
    };

    const value = {
        user,
        profile,
        setProfile,
        profileLoading,
        emergencyContact,
        setEmergencyContact,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        mockLogin,
        supabaseConnected: !!supabase
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
