import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { FAQ_DATA } from '../lib/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <PageShell title="Frequency Asked Questions">
            <div className="max-w-3xl mx-auto space-y-4">
                {FAQ_DATA.map((item, index) => (
                    <div
                        key={index}
                        className={`card p-0 overflow-hidden cursor-pointer border transition-colors ${openIndex === index ? 'border-primary/50' : 'border-surface-border hover:border-surface-border/80'
                            }`}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                        <div className={`p-5 flex justify-between items-center ${openIndex === index ? 'bg-white/5' : ''
                            }`}>
                            <div className="flex items-center gap-4 font-medium text-lg text-white">
                                <HelpCircle size={24} className="text-primary" />
                                {item.q}
                            </div>
                            {openIndex === index ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-500" />}
                        </div>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="p-5 pt-0 pl-[4.5rem] text-gray-400 leading-relaxed border-t border-surface-border/50">
                                        {item.a}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </PageShell>
    );
};

export default FAQ;
