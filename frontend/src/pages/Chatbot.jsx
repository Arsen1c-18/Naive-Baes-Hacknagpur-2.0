import React, { useState, useRef, useEffect } from 'react';
import PageShell from '../components/PageShell';
import { SAFETY_BOT_RESPONSES } from '../lib/mockData';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am your Digital Safety Assistant. How can I help you today? You can ask me about scams, reporting harassment, or online safety tips.' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, typing]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const randomResponse = SAFETY_BOT_RESPONSES[Math.floor(Math.random() * SAFETY_BOT_RESPONSES.length)];
            const botMsg = { id: Date.now() + 1, sender: 'bot', text: randomResponse };
            setMessages(prev => [...prev, botMsg]);
            setTyping(false);
        }, 1500);
    };

    return (
        <PageShell title="Safety Assistant AI">
            <div className="h-[600px] flex flex-col bg-white rounded-2xl border border-indigo-100 overflow-hidden shadow-soft-indigo">
                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${msg.sender === 'user' ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-white border border-indigo-100'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-indigo-600" />}
                                    </div>

                                    <div className={`p-4 rounded-2xl shadow-sm leading-relaxed ${msg.sender === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none'
                                        : 'bg-white text-slate-800 border border-indigo-100 rounded-tl-none font-medium'
                                        }`}>
                                        <p className="m-0 text-sm md:text-base">{msg.text}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {typing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-slate-400 text-sm ml-16"
                        >
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce"></span>
                            </span>
                            Safety Assistant is typing
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-indigo-100">
                    <form onSubmit={handleSend} className="flex gap-3 relative">
                        <input
                            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-full pl-6 pr-14 py-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-inner"
                            placeholder="Ask about safety..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-200"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </PageShell>
    );
};

export default Chatbot;
