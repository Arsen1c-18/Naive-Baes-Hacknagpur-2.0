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
            <div className="h-[600px] flex flex-col bg-surface/50 rounded-2xl border border-surface-border overflow-hidden shadow-2xl backdrop-blur-sm">
                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${msg.sender === 'user' ? 'bg-primary' : 'bg-accent'
                                        }`}>
                                        {msg.sender === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
                                    </div>

                                    <div className={`p-4 rounded-2xl shadow-md leading-relaxed ${msg.sender === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-surface text-gray-100 border border-surface-border rounded-tl-none'
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
                            className="flex items-center gap-2 text-gray-400 text-sm ml-14"
                        >
                            <span className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                            </span>
                            Safety Assistant is typing
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-surface border-t border-surface-border">
                    <form onSubmit={handleSend} className="flex gap-3 relative">
                        <input
                            className="input rounded-full pl-6 pr-14 bg-bg py-3 focus:ring-2 focus:ring-primary/50"
                            placeholder="Ask about safety..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary rounded-full w-10 h-10 p-0 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
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
