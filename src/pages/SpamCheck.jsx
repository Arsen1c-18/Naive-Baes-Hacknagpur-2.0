import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { checkSpam } from '../lib/mockData';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SpamCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = () => {
        if (!text.trim()) return;
        setLoading(true);
        setResult(null);
        // Simulate API delay
        setTimeout(() => {
            const analysis = checkSpam(text);
            setResult(analysis);
            setLoading(false);
        }, 800);
    };

    return (
        <PageShell title="Spam Detector">
            <div className="max-w-2xl mx-auto">
                <p className="text-gray-400 mb-6">
                    Paste a message, email content, or SMS to check if it's likely to be spam or a scam.
                </p>

                <textarea
                    className="textarea h-40 mb-4 resize-none"
                    placeholder="Paste message text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <button
                    className="btn btn-primary w-full mb-8 h-12 text-lg"
                    onClick={handleCheck}
                    disabled={loading || !text.trim()}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                            Analyzing Patterns...
                        </span>
                    ) : 'Check Validity'}
                </button>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={`p-6 rounded-xl border ${result.riskLevel === 'High' ? 'bg-red-500/10 border-red-500/50' :
                                    result.riskLevel === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/50' :
                                        'bg-green-500/10 border-green-500/50'
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                {result.riskLevel === 'High' && <AlertOctagon size={40} className="text-danger" />}
                                {result.riskLevel === 'Medium' && <AlertTriangle size={40} className="text-warning" />}
                                {result.riskLevel === 'Low' && <CheckCircle size={40} className="text-success" />}

                                <div>
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        Risk Level:
                                        <span className={
                                            result.riskLevel === 'High' ? 'text-danger' :
                                                result.riskLevel === 'Medium' ? 'text-warning' : 'text-success'
                                        }>{result.riskLevel}</span>
                                    </h3>
                                    <div className="text-sm text-gray-400">Trust Score: {100 - result.score}/100</div>
                                </div>
                            </div>

                            <div className="h-px bg-surface-border my-4 opacity-50"></div>

                            <h4 className="font-semibold mb-2">Analysis Report:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-300">
                                {result.reasons.map((r, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {r}
                                    </motion.li>
                                ))}
                            </ul>

                            {result.riskLevel === 'High' && (
                                <div className="mt-6 flex justify-end">
                                    <button className="btn btn-emergency text-sm py-1 px-3">
                                        Report as Fraud
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageShell>
    );
};

export default SpamCheck;
