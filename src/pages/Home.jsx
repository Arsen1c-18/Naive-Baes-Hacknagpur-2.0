import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, Image, FileText, Users, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const tools = [
        { title: "Spam Detector", icon: <Shield size={32} className="text-red-300" />, desc: "Check messages for spam & scams.", link: "/spam-check", color: "bg-red-500/10", border: "hover:border-red-500/50" },
        { title: "Text Analysis", icon: <MessageSquare size={32} className="text-blue-300" />, desc: "Analyze text for harassment/threats.", link: "/text-check", color: "bg-blue-500/10", border: "hover:border-blue-500/50" },
        { title: "Media Guard", icon: <Image size={32} className="text-purple-300" />, desc: "Detect deepfakes in images/audio.", link: "/media-check", color: "bg-purple-500/10", border: "hover:border-purple-500/50" },
        { title: "Report Templates", icon: <FileText size={32} className="text-green-300" />, desc: "Generate official reports.", link: "/templates", color: "bg-green-500/10", border: "hover:border-green-500/50" },
        { title: "Safety Chatbot", icon: <Cpu size={32} className="text-orange-300" />, desc: "AI assistant for safety queries.", link: "/chatbot", color: "bg-orange-500/10", border: "hover:border-orange-500/50" },
        { title: "Community", icon: <Users size={32} className="text-yellow-300" />, desc: "Recent alerts from users.", link: "/community", color: "bg-yellow-500/10", border: "hover:border-yellow-500/50" },
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="hero-text">Your Digital Safety Companion</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Protect yourself from online harassment, scams, and digital threats with our AI-powered toolkit.
                </p>

                {/* Emergency CTA */}
                <div className="mt-8">
                    <button className="btn btn-emergency">
                        Emergency Helpline: 1930
                    </button>
                    <p className="text-xs text-red-400/70 mt-2 tracking-widest uppercase">Cyber Crime Reporting Portal</p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, i) => (
                    <Link to={tool.link} key={i} className="no-underline">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className={`card h-full transition-all duration-300 hover:-translate-y-2 border border-surface-border ${tool.border}`}
                        >
                            <div className={`${tool.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                                {tool.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{tool.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{tool.desc}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
