import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MessageSquare, Image, FileText, Users, Cpu, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const tools = [
        { title: "Spam Detector", icon: <Shield size={32} className="text-white" />, desc: "Instantly check messages for scams.", link: "/spam-check", gradient: "from-red-500 to-pink-600" },
        { title: "Text Analysis", icon: <MessageSquare size={32} className="text-white" />, desc: "Detect harassment & threats in text.", link: "/text-check", gradient: "from-blue-500 to-cyan-500" },
        { title: "Media Guard", icon: <Image size={32} className="text-white" />, desc: "Spot deepfakes in images & audio.", link: "/media-check", gradient: "from-purple-500 to-indigo-600" },
        { title: "Report Templates", icon: <FileText size={32} className="text-white" />, desc: "Generate professional reports.", link: "/templates", gradient: "from-green-500 to-emerald-600" },
        { title: "Safety Chatbot", icon: <Cpu size={32} className="text-white" />, desc: "24/7 AI safety assistant.", link: "/chatbot", gradient: "from-orange-500 to-amber-500" },
        { title: "Community", icon: <Users size={32} className="text-white" />, desc: "Real-time user alerts.", link: "/community", gradient: "from-yellow-400 to-orange-500" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-900">
            {/* dynamic background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 py-16 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                            <Zap size={14} className="text-pink-500" /> AI-Powered Protection
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white leading-tight">
                        Your Digital <br className="hidden md:block" />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Safety Companion
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Navigate the digital world with confidence. Our advanced AI tools protect you from scams, harassment, and deepfakes in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/spam-check" className="btn bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 flex items-center gap-2">
                            Start Scanning <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 rounded-xl text-lg font-bold text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 backdrop-blur-sm">
                            Emergency: 1930
                        </button>
                    </div>
                </motion.div>

                {/* Features Grid */}
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
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="h-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 relative overflow-hidden"
                            >
                                {/* Gradient Orb Effect on Hover */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.gradient} opacity-10 blur-2xl rounded-full group-hover:opacity-20 transition-opacity`} />

                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                                    {tool.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-indigo-200 transition-colors">{tool.title}</h3>
                                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300">{tool.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
