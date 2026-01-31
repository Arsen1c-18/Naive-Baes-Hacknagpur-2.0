import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, supabaseConnected } = useAuth();

    // If supabase is not connected, we rely on the mock user state which is handled by mockLogin()
    // However, if we refresh, mock user state is lost in this simple implementation unless persisted.
    // Ideally we persist to localStorage for MVP without Supabase.

    // For now, let's allow access if user is null BUT we are in "demo mode" (optional improvement)
    // But standard Logic:
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
