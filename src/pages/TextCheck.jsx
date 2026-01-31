import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { analyzeText } from '../lib/mockData';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TextCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = () => {
        if (!text.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setResult(analyzeText(text));
            setLoading(false);
        }, 1000);
    };

    return (
        <PageShell title="Text Threat Analyzer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <p className="text-gray-400 mb-4">
                        Analyze DM's, emails, or social media comments for potential threats like harassment or impersonation.
                    </p>
                    <textarea
                        className="textarea h-64 mb-4 font-mono text-sm leading-relaxed"
                        placeholder="Paste content here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="btn btn-primary w-full"
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                    >
                        {loading ? 'Processing...' : 'Analyze Text'}
                    </button>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="card h-fit border-l-4"
                            style={{
                                borderLeftColor: result.threatType === 'Safe' ? '#10b981' : '#ef4444'
                            }}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold m-0">Analysis Report</h3>
                                {result.threatType === 'Safe'
                                    ? <ShieldCheck className="text-success" size={32} />
                                    : <ShieldAlert className="text-danger animate-pulse-slow" size={32} />
                                }
                            </div>

                            <div className="mb-6">
                                <div className="text-sm text-gray-400 mb-1">Detected Threat Type</div>
                                <div className={`text-3xl font-bold ${result.threatType === 'Safe' ? 'text-success' : 'text-danger'
                                    }`}>
                                    {result.threatType}
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <span>Risk Potential</span>
                                    <span className="font-mono">{result.riskScore}%</span>
                                </div>
                                <div className="w-full h-2 bg-surface-border rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.riskScore}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className={`h-full ${result.riskScore < 30 ? 'bg-success' :
                                                result.riskScore < 70 ? 'bg-warning' : 'bg-danger'
                                            }`}
                                    />
                                </div>
                            </div>

                            <h4 className="font-semibold mb-2">Safety Guidance</h4>
                            <ul className="space-y-2 text-gray-300">
                                {result.guidance.map((g, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        {g}
                                    </li>
                                ))}
                            </ul>

                            {result.threatType !== 'Safe' && (
                                <div className="mt-6 pt-4 border-t border-surface-border">
                                    <button className="btn btn-emergency w-full">
                                        Report {result.threatType}
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

export default TextCheck;
