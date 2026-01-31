import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-indigo-100 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4 group no-underline">
                            <Shield className="text-primary group-hover:text-accent transition-colors duration-300" size={32} />
                            <span className="font-bold text-2xl text-slate-800 tracking-tight">SafetyCompanion</span>
                        </Link>
                        <p className="text-slate-500 max-w-sm leading-relaxed">
                            Empowering you to navigate the digital world safely. Our AI-powered tools help detect threats, generate reports, and keep you secure.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-slate-500 hover:text-primary transition-colors no-underline">Home</Link></li>
                            <li><Link to="/dashboard" className="text-slate-500 hover:text-primary transition-colors no-underline">Dashboard</Link></li>
                            <li><Link to="/spam-check" className="text-slate-500 hover:text-primary transition-colors no-underline">Spam Detector</Link></li>
                            <li><Link to="/community" className="text-slate-500 hover:text-primary transition-colors no-underline">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><Link to="/faq" className="text-slate-500 hover:text-primary transition-colors no-underline">FAQs</Link></li>
                            <li><Link to="/chatbot" className="text-slate-500 hover:text-primary transition-colors no-underline">Safety Bot</Link></li>
                            <li className="text-slate-500">Helpline: <span className="font-bold text-red-500">1930</span></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-sm">
                        © {new Date().getFullYear()} Digital Safety Companion. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
