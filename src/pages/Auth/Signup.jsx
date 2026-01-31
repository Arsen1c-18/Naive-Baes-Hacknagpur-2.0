import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signUp, supabaseConnected } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!supabaseConnected) {
            setError("Supabase not connected. Cannot create real account.");
            return;
        }

        const { error } = await signUp(email, password);
        if (error) setError(error.message);
        else setMsg("Account created! Please check your email for verification before logging in.");
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Create Account</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                {msg && <div style={{ color: 'var(--success)', marginBottom: '1rem', textAlign: 'center' }}>{msg}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
                        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Sign Up
                    </button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
                    <Link to="/login" style={{ color: 'var(--primary-color)' }}>Log In</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
