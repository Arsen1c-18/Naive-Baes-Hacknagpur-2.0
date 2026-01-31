import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Shield, Calendar, Clock } from 'lucide-react';

const UserDashboard = () => {
    const { user, profile, emergencyContact } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-12 text-center text-slate-500">
                Please log in to view your dashboard.
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Prefer profile data from DB, fallback to metadata
    const displayName = profile?.name || user.user_metadata?.full_name || 'User';
    const displayPhone = profile?.phone || user.user_metadata?.phone || 'N/A';

    // Use the fetched emergency contact object
    const displayEmergency = emergencyContact?.phone_number || emergencyContact?.contact_name || user.user_metadata?.emergency_contact || 'None Set';

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex justify-between items-end"
            >
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">User Dashboard</h1>
                    <p className="text-slate-500">Manage your profile and account settings.</p>
                </div>
                <button
                    onClick={() => navigate('/complete-profile')}
                    className="btn btn-outline border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                >
                    Edit Profile
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="card bg-white p-8 rounded-2xl shadow-soft-indigo border border-indigo-100"
            >
                <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <User size={40} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Welcome, {displayName}!
                        </h2>
                        <p className="text-slate-500 text-sm">{user.email}</p>
                    </div>
                    <div className="ml-auto hidden md:block">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            <Shield size={12} className="mr-1" /> Active Account
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Security & Contact Info */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 col-span-1 md:col-span-2">
                        <h3 className="text-md font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <Shield className="text-primary" size={18} /> Emergency & Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Emergency Contact</label>
                                <div className="text-red-500 font-bold text-lg">
                                    {displayEmergency}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Phone Number</label>
                                <div className="text-slate-900 font-medium">
                                    {displayPhone}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Stats */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium uppercase tracking-wider">
                            <Clock size={16} /> Last Login
                        </div>
                        <div className="text-slate-900 font-medium">
                            {formatDate(user.last_sign_in_at)}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-2 text-slate-500 text-sm font-medium uppercase tracking-wider">
                            <Calendar size={16} /> Member Since
                        </div>
                        <div className="text-slate-900 font-medium">
                            {formatDate(user.created_at)}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default UserDashboard;
