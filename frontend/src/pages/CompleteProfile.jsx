import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Shield, Smartphone, AlertCircle, MapPin, User, Loader2 } from 'lucide-react';

const CompleteProfile = () => {
    const { user, profile, supabaseConnected, setProfile, setEmergencyContact } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        emergencyContact: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData(prev => ({
                ...prev,
                fullName: profile.name || prev.fullName,
                phone: profile.phone || prev.phone,
            }));
        }

        if (user?.user_metadata) {
            setFormData(prev => ({
                ...prev,
                fullName: prev.fullName || user.user_metadata.full_name || '',
                phone: prev.phone || user.user_metadata.phone || '',
                emergencyContact: prev.emergencyContact || user.user_metadata.emergency_contact || ''
            }));
        }
    }, [user, profile]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const minDelayPromise = new Promise(resolve => setTimeout(resolve, 8000)); // 8 seconds wait

        if (!supabaseConnected || user?.isDemo) {
            await minDelayPromise;
            // Update local state to simulate save
            setProfile({
                id: user.id,
                name: formData.fullName,
                phone: formData.phone
            });
            if (formData.emergencyContact) {
                setEmergencyContact({ phone_number: formData.emergencyContact });
            }
            navigate('/', { replace: true });
            return;
        }

        try {
            const userId = user.id;

            // Database Operations
            const dbOperations = async () => {
                // 1. Update/Insert Public Profile
                const { error: profileError } = await supabase
                    .from('public_profiles')
                    .upsert({
                        id: userId,
                        name: formData.fullName,
                        phone: formData.phone,
                        updated_at: new Date().toISOString()
                    });

                if (profileError) throw profileError;

                // 2. Update/Insert Emergency Contact
                const { error: contactError } = await supabase
                    .from('emergency_contacts')
                    .upsert({
                        user_id: userId,
                        contact_name: "Emergency Contact",
                        phone_number: formData.emergencyContact,
                        updated_at: new Date().toISOString()
                    }, { onConflict: 'user_id' });

                if (contactError) throw contactError;

                // Update local context after successful DB save
                setProfile({
                    id: userId,
                    name: formData.fullName,
                    phone: formData.phone
                });
                setEmergencyContact({ phone_number: formData.emergencyContact });
            };

            // Wait for BOTH the minimum delay AND the DB operations
            await Promise.all([dbOperations(), minDelayPromise]);

            // Success
            navigate('/', { replace: true });

        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to save profile.");
            setLoading(false); // Stop loading only on error so they can retry
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg relative">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
                    <Loader2 className="h-12 w-12 animate-spin mb-4 text-cyan-400" />
                    <h3 className="text-xl font-semibold">Creating your secure profile...</h3>
                    <p className="text-slate-200 mt-2">Uploading encrypted data to SafeVault.</p>
                </div>
            )}

            <div className="card max-w-md w-full p-8 shadow-soft-indigo border border-indigo-100 bg-white rounded-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Complete Your Profile</h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Please provide a few more details to ensure your safety features work correctly.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                name="fullName"
                                type="text"
                                required
                                className="input pl-10"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Smartphone className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                name="phone"
                                type="tel"
                                required
                                className="input pl-10"
                                placeholder="+91..."
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AlertCircle className="h-4 w-4 text-red-400" />
                            </div>
                            <input
                                name="emergencyContact"
                                type="tel"
                                required
                                className="input pl-10 border-red-100 focus:border-red-500 focus:ring-red-200"
                                placeholder="Emergency Number"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full shadow-lg shadow-indigo-200 mt-6"
                    >
                        {loading ? 'Processing...' : 'Complete Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CompleteProfile;
