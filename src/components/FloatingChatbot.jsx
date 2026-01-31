import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Bot, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAFETY_BOT_RESPONSES } from '../lib/mockData';

const FloatingChatbot = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Chat Logic State
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi! I am your Safety Assistant. How can I help?' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, typing, isOpen]);

    // Do not show on Login or Signup pages
    if (['/login', '/signup', '/chatbot'].includes(location.pathname)) {
        return null; // hide on auth pages AND main chatbot page (if exists)
    }

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        setTimeout(() => {
            const randomResponse = SAFETY_BOT_RESPONSES[Math.floor(Math.random() * SAFETY_BOT_RESPONSES.length)];
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: randomResponse };
            setMessages(prev => [...prev, botMsg]);
            setTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* Floating Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, height: 0 }}
                        animate={{ opacity: 1, y: 0, scale: 1, height: '500px' }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, height: 0 }}
                        className="pointer-events-auto bg-white w-[350px] md:w-[400px] rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between text-white shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-white/20 rounded-lg">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Safety Assistant</h3>
                                    <p className="text-xs text-indigo-100 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Minimize2 size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-3">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white text-slate-700 border border-slate-100 shadow-sm rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {typing && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-3 shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-75"></span>
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                            <form onSubmit={handleSend} className="flex gap-2 relative">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full bg-slate-50 border-none rounded-full pl-4 pr-12 py-3 focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-slate-700 focus:bg-white transition-all outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md active:scale-95"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/chatbot')}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all duration-300 group flex items-center justify-center"
            >
                <MessageCircle size={32} />
            </motion.button>
        </div>
    );
};

export default FloatingChatbot;
