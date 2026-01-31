import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Shield, User, Smartphone, AlertCircle, MapPin } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        emergencyContact: '',
        password: '',
        confirmPassword: ''
    });

    const { signUp, signInWithGoogle, supabaseConnected } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    // Check for message from redirect
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const message = params.get('message');
        if (message) {
            setError(message); // Using setError to show it in red/warning style, or setMsg for green
            // Ideally if it's an error like "Account doesn't exist", maybe yellow/red is better?
            // The user said "redirect to sign up page" with a message.
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleGoogleLogin = async () => {
        setError('');
        if (!supabaseConnected) {
            alert('Supabase is not connected. Google Login cannot function in Mock Mode.');
            return;
        }
        const { error } = await signInWithGoogle('signup');
        if (error) setError(error.message);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        if (!supabaseConnected) {
            setError("Supabase not connected. Cannot create real account.");
            return;
        }

        setLoading(true);

        // Prepare metadata
        const metaData = {
            full_name: formData.fullName,
            phone: formData.phone,
            emergency_contact: formData.emergencyContact
        };

        const { data, error } = await signUp(formData.email, formData.password, metaData);

        if (error) {
            setError(error.message);
        } else {
            // If session exists (auto-login active or mock), go to dashboard
            // Otherwise show verification message
            if (data?.session || data?.user?.isDemo) {
                navigate('/');
            } else {
                setMsg("Account created! Please check your email for verification before logging in.");
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-bg">
            <div className="card max-w-md w-full p-8 shadow-soft-indigo border border-indigo-100 bg-white rounded-2xl">
                <div className="text-center mb-8">
                    <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900">Create an Account</h2>
                    <p className="mt-2 text-sm text-slate-500">Join our community effectively and securely.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {msg && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-md">
                        <p className="text-sm text-green-700">{msg}</p>
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name (Username)</label>
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
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="input"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <AlertCircle className="h-4 w-4 text-red-400" />
                            </div>
                            <input
                                name="emergencyContact"
                                type="tel"
                                required
                                className="input pl-10 border-red-100 focus:border-red-500 focus:ring-red-200"
                                placeholder="Emergency Number (e.g. Guardian)"
                                value={formData.emergencyContact}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                type="password"
                                required
                                className="input"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full shadow-lg shadow-indigo-200"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-500">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Sign up with Google
                </button>

                <p className="mt-8 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:text-indigo-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
