import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { api } from '../lib/api';
import { AlertTriangle, CheckCircle, AlertOctagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SpamCheck = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setResult(null);
        try {
            const data = await api.analyzeText(text);
            const riskLevel = data.risk_level === 'HIGH' ? 'High' : (data.risk_level === 'MEDIUM' ? 'Medium' : 'Low');
            // Mocking 'score' inverse logic for trust score (100 - score)
            // Backend confidence is threat confidence, so score = confidence * 100
            const score = Math.round(data.confidence * 100);

            setResult({
                riskLevel: riskLevel,
                score: score,
                reasons: data.rules_triggered && data.rules_triggered.length > 0 ? data.rules_triggered : (data.pattern_detected ? [data.pattern_detected] : ["No specific spam patterns detected"])
            });
        } catch (error) {
            console.error(error);
            setResult({
                riskLevel: 'Unknown',
                score: 0,
                reasons: ["Error connecting to server"]
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell title="Spam Detector">
            <div className="max-w-4xl mx-auto">
                <div className="card bg-white p-8 rounded-2xl shadow-soft-indigo border border-indigo-100 mb-8">
                    <p className="text-slate-500 mb-6 text-lg">
                        Paste a message, email content, or SMS to check if it's likely to be spam or a scam.
                    </p>

                    <textarea
                        className="textarea h-40 mb-6 resize-none shadow-inner bg-slate-50 focus:bg-white transition-all"
                        placeholder="Paste message text here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <button
                        className="btn btn-primary w-full h-12 text-lg shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all font-bold"
                        onClick={handleCheck}
                        disabled={loading || !text.trim()}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                Analyzing Patterns...
                            </span>
                        ) : 'Check Validity'}
                    </button>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`p-8 rounded-2xl border-l-8 shadow-lg backdrop-blur-sm ${result.riskLevel === 'High' ? 'bg-red-50 border-red-500 shadow-red-200' :
                                result.riskLevel === 'Medium' ? 'bg-amber-50 border-amber-500 shadow-amber-200' :
                                    'bg-emerald-50 border-emerald-500 shadow-emerald-200'
                                }`}
                        >
                            <div className="flex items-center gap-6 mb-6">
                                <div className={`p-4 rounded-full ${result.riskLevel === 'High' ? 'bg-red-100 text-red-600' :
                                    result.riskLevel === 'Medium' ? 'bg-amber-100 text-amber-600' :
                                        'bg-emerald-100 text-emerald-600'
                                    }`}>
                                    {result.riskLevel === 'High' && <AlertOctagon size={48} />}
                                    {result.riskLevel === 'Medium' && <AlertTriangle size={48} />}
                                    {result.riskLevel === 'Low' && <CheckCircle size={48} />}
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
                                        Risk Level:
                                        <span className={
                                            result.riskLevel === 'High' ? 'text-red-600' :
                                                result.riskLevel === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
                                        }>{result.riskLevel}</span>
                                    </h3>
                                    <div className="text-lg text-slate-500 font-medium mt-1">Trust Score: <span className="font-bold text-slate-700">{100 - result.score}/100</span></div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-200 my-6"></div>

                            <h4 className="font-bold text-xl mb-4 text-slate-800">Analysis Report:</h4>
                            <ul className="space-y-3">
                                {result.reasons.map((r, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-3 text-slate-700 font-medium"
                                    >
                                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${result.riskLevel === 'High' ? 'bg-red-400' :
                                            result.riskLevel === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'
                                            }`} />
                                        {r}
                                    </motion.li>
                                ))}
                            </ul>

                            {result.riskLevel === 'High' && (
                                <div className="mt-8 flex justify-end">
                                    <button className="btn btn-emergency py-3 px-6 text-base shadow-red-500/30">
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
