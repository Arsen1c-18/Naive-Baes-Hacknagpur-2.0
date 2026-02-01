import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, profile, supabaseConnected, profileLoading } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Wait for the profile to finish loading before making decisions
    if (supabaseConnected && profileLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-bg text-indigo-600">Loading Profile...</div>;
    }

    // Debug Redirect Logic
    if (location.pathname !== '/complete-profile') {
        console.log('ProtectedRoute Check:', {
            connected: supabaseConnected,
            hasProfile: !!profile,
            hasName: !!profile?.name,
            path: location.pathname,
            profile: profile
        });
    }

    // Profile Completion Check
    if (supabaseConnected && (!profile || !profile.name) && location.pathname !== '/complete-profile') {
        console.warn('Redirecting to /complete-profile because profile or name is missing', profile);
        return <Navigate to="/complete-profile" replace />;
    }

    // If we ARE on /complete-profile but HAVE a profile, let them stay (editing) OR redirect?
    // UserDashboard links here for editing, so we allow it.

    return children;
};

export default ProtectedRoute;
