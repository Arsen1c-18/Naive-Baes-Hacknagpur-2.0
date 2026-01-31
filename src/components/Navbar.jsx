import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, signOut, emergencyContact } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    const handleSOS = () => {
        if (!emergencyContact || !emergencyContact.phone_number) {
            alert('Emergency Contact not set! Please go to Dashboard/Profile to set it.');
            // navigate('/complete-profile'); // Optional: redirect them
            return;
        }

        const message = `SOS! I need help! I am using SafetyCompanion and this is an emergency.`;
        const url = `https://wa.me/${emergencyContact.phone_number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    if (!user) return null;


    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-200/50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white no-underline group">
                    <Shield className="text-white group-hover:text-indigo-100 transition-colors duration-300" size={32} />
                    <span className="font-bold text-2xl tracking-tight text-white">SafetyCompanion</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-indigo-100 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link to="/" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Home</Link>
                    <Link to="/dashboard" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/dashboard' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Dashboard</Link>
                    <Link to="/spam-check" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/spam-check' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Spam</Link>
                    <Link to="/text-check" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/text-check' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Text</Link>
                    <Link to="/media-check" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/media-check' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Media</Link>
                    <Link to="/templates" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/templates' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Templates</Link>
                    <Link to="/chatbot" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/chatbot' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Chatbot</Link>
                    <Link to="/community" className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === '/community' ? 'bg-white/20 text-white shadow-sm' : 'text-indigo-100 hover:bg-white/10 hover:text-white'}`}>Community</Link>
                    <button onClick={handleSOS} className="btn bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm font-bold shadow-lg shadow-red-500/30 animate-pulse">
                        SOS
                    </button>
                    <button onClick={signOut} className="btn bg-white/10 text-white hover:bg-white/20 border border-white/20 px-3 py-1 text-xs gap-1">
                        <LogOut size={14} /> Logout
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-surface border-b border-surface-border overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            <Link to="/" onClick={() => setIsOpen(false)} className="nav-link block">Home</Link>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="nav-link block">Dashboard</Link>
                            <Link to="/spam-check" onClick={() => setIsOpen(false)} className="nav-link block">Spam Check</Link>
                            <Link to="/text-check" onClick={() => setIsOpen(false)} className="nav-link block">Text Analysis</Link>
                            <Link to="/media-check" onClick={() => setIsOpen(false)} className="nav-link block">Media Guard</Link>
                            <Link to="/templates" onClick={() => setIsOpen(false)} className="nav-link block">Templates</Link>
                            <Link to="/chatbot" onClick={() => setIsOpen(false)} className="nav-link block">Chatbot</Link>
                            <Link to="/community" onClick={() => setIsOpen(false)} className="nav-link block">Community</Link>
                            <Link to="/faq" onClick={() => setIsOpen(false)} className="nav-link block">FAQ</Link>
                            <button onClick={handleSOS} className="w-full text-left nav-link block text-red-500 font-bold bg-red-50">
                                SOS (Emergency)
                            </button>
                            <div className="h-px bg-surface-border my-2"></div>
                            <button onClick={signOut} className="btn btn-danger w-full justify-start">
                                <LogOut size={16} className="mr-2" /> Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
