import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, mockLogin, supabaseConnected } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!supabaseConnected) {
            mockLogin();
            navigate('/');
            return;
        }

        const { error } = await signIn(email, password);
        if (error) setError(error.message);
        else navigate('/');
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Login</h2>
                {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

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
                        Sign In
                    </button>
                    {!supabaseConnected && (
                        <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--warning)', textAlign: 'center' }}>
                            (Supabase not connected. clicking Sign In will use Mock Login)
                        </p>
                    )}
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Don't have an account? </span>
                    <Link to="/signup" style={{ color: 'var(--primary-color)' }}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
