import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path ? 'active' : '';

    if (!user) return null;

    return (
        <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-surface-border">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white no-underline group">
                    <Shield className="text-primary group-hover:text-accent transition-colors duration-300" size={24} />
                    <span className="font-bold text-xl tracking-tight">SafetyCompanion</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-gray-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-4 items-center">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/dashboard" className={`nav-link ${isActive('/dashboard')}`}>Dashboard</Link>
                    <Link to="/spam-check" className={`nav-link ${isActive('/spam-check')}`}>Spam</Link>
                    <Link to="/text-check" className={`nav-link ${isActive('/text-check')}`}>Text</Link>
                    <Link to="/media-check" className={`nav-link ${isActive('/media-check')}`}>Media</Link>
                    <Link to="/templates" className={`nav-link ${isActive('/templates')}`}>Templates</Link>
                    <Link to="/chatbot" className={`nav-link ${isActive('/chatbot')}`}>Chatbot</Link>
                    <Link to="/community" className={`nav-link ${isActive('/community')}`}>Community</Link>
                    <button onClick={signOut} className="btn bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border border-red-500/20 px-3 py-1 text-xs gap-1">
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
