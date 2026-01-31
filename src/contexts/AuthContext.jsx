import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const signUp = async (email, password) => {
        if (!supabase) return { error: { message: "Supabase not configured" } };
        return await supabase.auth.signUp({ email, password });
    };

    const signIn = async (email, password) => {
        if (!supabase) return { error: { message: "Supabase not configured" } };
        return await supabase.auth.signInWithPassword({ email, password });
    };

    const signOut = async () => {
        if (!supabase) return;
        return await supabase.auth.signOut();
    };

    const signInWithGoogle = async () => {
        if (!supabase) return { error: { message: "Supabase not configured" } };
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
        setUser({ id: 'mock-user-id', email: 'user@example.com' });
    };

    const value = {
        user,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        mockLogin, // Exposed for demo purposes
        supabaseConnected: !!supabase
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
