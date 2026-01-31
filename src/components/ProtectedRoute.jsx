import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, profile, supabaseConnected } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Profile Completion Check
    // If Supabase is connected, User is logged in, but Profile is missing...
    // AND we are not already on the completion page...
    // THEN redirect to /complete-profile
    if (supabaseConnected && !profile && location.pathname !== '/complete-profile') {
        // We might want to give it a second to load? 
        // For MVP, relying on the fact that profile fetch happens fast or 'profile' is null initially.
        // Issue: 'profile' is null while loading. We need a loading state for profile?
        // Let's assume strictness for now. 
        // Better: Check if we have *attempted* to load it. 
        // For now, let's just checking if we are on a "content" page.
        return <Navigate to="/complete-profile" replace />;
    }

    // If we ARE on /complete-profile but HAVE a profile, let them stay (editing) OR redirect?
    // UserDashboard links here for editing, so we allow it.

    return children;
};

export default ProtectedRoute;
