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

    // Profile Completion Check
    // If Supabase is connected, User is logged in, but Profile is missing...
    // AND we are not already on the completion page...
    // THEN redirect to /complete-profile
    if (supabaseConnected && !profile && location.pathname !== '/complete-profile') {
        return <Navigate to="/complete-profile" replace />;
    }

    // If we ARE on /complete-profile but HAVE a profile, let them stay (editing) OR redirect?
    // UserDashboard links here for editing, so we allow it.

    return children;
};

export default ProtectedRoute;
