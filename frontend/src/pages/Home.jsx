import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, Image, FileText, Users, Cpu, ArrowRight, Zap, CheckCircle, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const tools = [
        { title: "Spam Detector", icon: <Shield size={28} className="text-white" />, desc: "Instantly check messages for scams.", link: "/spam-check", gradient: "from-red-500 to-pink-600" },
        { title: "Text Analysis", icon: <MessageSquare size={28} className="text-white" />, desc: "Detect harassment & threats in text.", link: "/text-check", gradient: "from-cyan-500 to-blue-500" },
        { title: "Media Guard", icon: <Image size={28} className="text-white" />, desc: "Spot deepfakes in images & audio.", link: "/media-check", gradient: "from-blue-500 to-indigo-600" },
        { title: "Report Templates", icon: <FileText size={28} className="text-white" />, desc: "Generate professional reports.", link: "/templates", gradient: "from-emerald-500 to-teal-600" },
        { title: "Safety Chatbot", icon: <Cpu size={28} className="text-white" />, desc: "24/7 AI safety assistant.", link: "/chatbot", gradient: "from-amber-500 to-orange-500" },
        { title: "Community", icon: <Users size={28} className="text-white" />, desc: "Real-time user alerts.", link: "/community", gradient: "from-violet-500 to-purple-500" },
    ];

    const stats = [
        { value: "99.9%", label: "Accuracy Rate", icon: <BarChart3 size={20} className="text-cyan-600" /> },
        { value: "24/7", label: "Real-time Protection", icon: <Zap size={20} className="text-amber-500" /> },
        { value: "Global", label: "Threat Intelligence", icon: <Globe size={20} className="text-blue-500" /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-white text-slate-900 selection:bg-cyan-500 selection:text-white">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Modern Grid Pattern using SVG */}
                <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>

                {/* Animated Gradient Orbs */}
                <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-cyan-300/30 to-blue-300/30 blur-[100px] animate-pulse mix-blend-multiply" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-teal-300/30 to-emerald-300/30 blur-[100px] animate-pulse mix-blend-multiply" style={{ animationDelay: '2s', animationDuration: '6s' }} />
                <div className="absolute top-[30%] right-[30%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-r from-sky-200/40 to-indigo-200/40 blur-[80px] animate-bounce mix-blend-multiply" style={{ animationDuration: '10s' }} />

                {/* Floating Shapes */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[15%] left-[10%] w-12 h-12 border-4 border-cyan-200/40 rounded-xl"
                    />
                    <motion.div
                        animate={{ y: [0, 30, 0], rotate: [0, -20, 0] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[40%] left-[5%] w-8 h-8 bg-blue-200/30 rounded-full"
                    />
                    <motion.div
                        animate={{ y: [0, -40, 0], rotate: [0, 45, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[20%] left-[15%] w-16 h-16 border-4 border-teal-200/30 rounded-full"
                    />
                    <motion.div
                        animate={{ x: [0, 20, 0], rotate: [0, 15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] right-[10%] w-10 h-10 bg-sky-200/30 rounded-lg rotate-12"
                    />
                    <motion.div
                        animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[30%] right-[20%] w-20 h-20 border-4 border-indigo-200/30 rounded-full"
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-24 max-w-4xl mx-auto"
                >
                    <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white border border-cyan-100 shadow-sm">
                        <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <Zap size={14} className="text-amber-500 fill-amber-500" /> AI-Powered Protection Suite
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-[1.1]">
                        Your Digital <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                            Safety Companion
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Navigate the digital world with confidence. Our advanced AI tools protect you from scams, harassment, and deepfakes in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                        <Link to="/spam-check" className="btn bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 flex items-center gap-2">
                            Start Scanning <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 rounded-xl text-lg font-bold text-slate-700 border border-slate-200 hover:bg-white hover:border-slate-300 transition-all flex items-center gap-2 bg-white/50 backdrop-blur-sm">
                            Emergency: 1930
                        </button>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Protection Tools</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Everything you need to stay safe online, powered by cutting-edge artificial intelligence.</p>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {tools.map((tool, i) => (
                            <Link to={tool.link} key={i} className="no-underline group">
                                <motion.div
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                    className="h-full bg-white rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-cyan-500/10 border border-slate-100 group-hover:border-cyan-200 relative overflow-hidden"
                                >
                                    {/* Top Accent Line */}
                                    <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${tool.gradient}`} />

                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        {tool.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-cyan-600 transition-colors">{tool.title}</h3>
                                    <p className="text-slate-500 leading-relaxed group-hover:text-slate-600">{tool.desc}</p>

                                    <div className="mt-6 flex items-center text-sm font-semibold text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                                        Try Now <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {/* Informational / Trust Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose SafetyCompanion?</h2>
                        <div className="space-y-6">
                            {[
                                { title: "Privacy First", desc: "Your data is processed securely and never shared without consent." },
                                { title: "Community Driven", desc: "Real-time alerts from a network of vigilant users." },
                                { title: "Government Aligned", desc: "Direct integration with national cybercrime reporting portals." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle className="text-teal-500" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative h-64 md:h-full bg-slate-100 rounded-2xl overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-blue-50" />
                        <div className="relative text-center p-6">
                            <Shield size={64} className="text-cyan-600 mx-auto mb-4 opacity-80" />
                            <p className="font-medium text-slate-400">Secure • Reliable • Fast</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
