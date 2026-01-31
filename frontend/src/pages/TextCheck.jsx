import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { api } from '../lib/api';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TextCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setLoading(true);
        try {
            const data = await api.analyzeText(text);
            // Map backend response to frontend expected format
            setResult({
                threatType: data.pattern_detected || (data.risk_level === 'LOW' ? 'Safe' : 'Suspicious'),
                riskScore: Math.round(data.confidence * 100),
                guidance: data.analysis ? [data.analysis] : ["No specific guidance provided."]
            });
        } catch (error) {
            console.error(error);
            setResult({
                threatType: 'Error',
                riskScore: 0,
                guidance: ["Failed to analyze text. Please try again."]
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell title="Text Threat Analyzer">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card bg-white p-8 rounded-2xl shadow-soft-indigo border border-indigo-100 h-fit">
                    <p className="text-slate-500 mb-6 text-lg">
                        Analyze DM's, emails, or social media comments for potential threats like harassment or impersonation.
                    </p>
                    <textarea
                        className="textarea h-64 mb-6 font-mono text-sm leading-relaxed bg-slate-50 focus:bg-white shadow-inner"
                        placeholder="Paste content here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="btn btn-primary w-full h-12 text-lg shadow-lg shadow-indigo-500/30"
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
                            className="bg-white p-8 rounded-2xl shadow-xl border-l-8 h-fit"
                            style={{
                                borderLeftColor: result.threatType === 'Safe' ? '#10b981' : '#ef4444'
                            }}
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-slate-900 m-0">Analysis Report</h3>
                                {result.threatType === 'Safe'
                                    ? <div className="p-3 bg-emerald-100 rounded-full text-emerald-600"><ShieldCheck size={36} /></div>
                                    : <div className="p-3 bg-red-100 rounded-full text-red-600"><ShieldAlert className="animate-pulse" size={36} /></div>
                                }
                            </div>

                            <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="text-sm text-slate-500 mb-1 font-semibold uppercase tracking-wider">Detected Threat Type</div>
                                <div className={`text-4xl font-extrabold ${result.threatType === 'Safe' ? 'text-emerald-600' : 'text-red-600'
                                    }`}>
                                    {result.threatType}
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex justify-between mb-3">
                                    <span className="text-slate-700 font-bold">Risk Potential</span>
                                    <span className="font-mono text-slate-900 font-bold">{result.riskScore}%</span>
                                </div>
                                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.riskScore}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className={`h-full rounded-full shadow-sm ${result.riskScore < 30 ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' :
                                            result.riskScore < 70 ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-red-500 to-rose-600'
                                            }`}
                                    />
                                </div>
                            </div>

                            <h4 className="font-bold text-lg mb-4 text-slate-900">Safety Guidance</h4>
                            <ul className="space-y-3">
                                {result.guidance.map((g, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg">
                                        <span className="text-primary mt-0.5 font-bold">•</span>
                                        {g}
                                    </li>
                                ))}
                            </ul>

                            {result.threatType !== 'Safe' && (
                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <button className="btn btn-emergency w-full py-3 shadow-red-500/30">
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
