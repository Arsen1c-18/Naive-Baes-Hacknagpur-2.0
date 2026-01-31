import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { REPORT_TEMPLATES } from '../lib/mockData';
import { Copy, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TemplateGenerator = () => {
    const [type, setType] = useState('Scam');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(REPORT_TEMPLATES[type]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <PageShell title="Report Templates">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                    <h3 className="text-xl font-bold mb-2 text-white">Select Category</h3>
                    <p className="text-gray-400 text-sm mb-4">Choose the type of incident you need to report.</p>

                    <div className="flex flex-col gap-2">
                        {Object.keys(REPORT_TEMPLATES).map(key => (
                            <button
                                key={key}
                                onClick={() => setType(key)}
                                className={`
                                    p-4 text-left rounded-xl border transition-all duration-200
                                    ${type === key
                                        ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10'
                                        : 'bg-transparent border-transparent text-gray-400 hover:bg-surface-border'
                                    }
                                `}
                            >
                                <span className="font-semibold">{key}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                            <FileText size={20} className="text-accent" /> Generated Template
                        </h3>
                        <button
                            className={`btn text-xs py-2 px-3 transition-colors ${copied ? 'bg-green-500/20 text-green-400' : 'btn-primary'}`}
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <span className="flex items-center gap-1">
                                    <Check size={14} /> Copied
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <Copy size={14} /> Copy Text
                                </span>
                            )}
                        </button>
                    </div>

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={type}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#050510] border border-surface-border rounded-xl p-6 font-mono text-sm leading-relaxed text-gray-300 shadow-inner overflow-auto max-h-[500px]"
                        >
                            {REPORT_TEMPLATES[type]}
                        </motion.div>
                    </AnimatePresence>

                    <p className="mt-4 text-xs text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse"></span>
                        Tip: Copy this text and fill in the [bracketed] details before sending.
                    </p>
                </div>
            </div>
        </PageShell>
    );
};

export default TemplateGenerator;
