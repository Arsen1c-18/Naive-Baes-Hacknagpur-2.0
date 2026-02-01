import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import PageShell from '../components/PageShell';
import { REPORT_TEMPLATES } from '../lib/mockData';
import { api } from '../lib/api';
import { Copy, FileText, Check, Printer } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

const TemplateGenerator = () => {
    const [type, setType] = useState('Scam');
    const [incidentText, setIncidentText] = useState('');
    const [generatedReport, setGeneratedReport] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
        if (!incidentText.trim()) return;
        setLoading(true);
        try {
            // Map frontend categories to backend RAG template types
            let backendType = 'cybercrime'; // Default for Scam
            if (type === 'Harassment' || type === 'Impersonation') {
                backendType = 'platform';
            }

            const data = await api.generateReport(backendType, incidentText);
            setGeneratedReport(data.report);
        } catch (error) {
            console.error("Report generation failed:", error);
            setGeneratedReport("Error generating report. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (!generatedReport) return;
        navigator.clipboard.writeText(generatedReport);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePrint = () => {
        if (!generatedReport) return;
        const printWindow = window.open('', '_blank');
        const content = document.getElementById('report-markdown-container')?.innerHTML || generatedReport;

        printWindow.document.write(`
            <html>
            <head>
                <title>Incident Report - ${type}</title>
                <style>
                    body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #000; line-height: 1.6; max-width: 800px; margin: 0 auto; }
                    h1 { font-size: 24px; margin-bottom: 20px; color: #000; }
                    h2 { font-size: 18px; margin-top: 25px; margin-bottom: 10px; color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                    h3 { font-size: 16px; margin-top: 20px; margin-bottom: 10px; font-weight: bold; }
                    p { margin-bottom: 12px; }
                    ul, ol { margin-bottom: 12px; padding-left: 20px; }
                    li { margin-bottom: 4px; }
                    strong { font-weight: bold; color: #000; }
                    .report-header { text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #000; }
                    .footer { margin-top: 50px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; color: #666; text-align: center; }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>Incident Report: ${type}</h1>
                    <p style="color: #666;">Generated via Digital Safety Companion</p>
                </div>
                <div class="content">
                    ${content}
                </div>
                <div class="footer">
                    Confidential &bull; Generated on ${new Date().toLocaleDateString()}
                </div>
                <script>
                    window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <PageShell title="Report Templates">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
                {/* Left: Input Selection */}
                <div className="flex flex-col gap-6 overflow-y-auto pr-2">
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-white">1. Select Category</h3>
                        <p className="text-gray-400 text-sm mb-4">Choose the type of incident.</p>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.keys(REPORT_TEMPLATES).map(key => (
                                <button
                                    key={key}
                                    onClick={() => setType(key)}
                                    className={`
                                        p-3 text-left rounded-xl border transition-all duration-200
                                        ${type === key
                                            ? 'bg-primary/20 border-primary text-primary shadow-lg shadow-primary/10'
                                            : 'bg-transparent border-surface-border text-gray-400 hover:bg-surface-border/50'
                                        }
                                    `}
                                >
                                    <span className="font-semibold text-sm">{key}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 text-white">2. Incident Details</h3>
                        <p className="text-gray-400 text-sm mb-4">Describe the incident to generate a custom report.</p>
                        <textarea
                            value={incidentText}
                            onChange={(e) => setIncidentText(e.target.value)}
                            placeholder="e.g., I received a call from someone claiming to be from my bank..."
                            className="flex-1 w-full bg-[#050510] border border-surface-border rounded-xl p-4 text-gray-300 focus:ring-2 focus:ring-primary/50 outline-none resize-none transition-all placeholder:text-gray-600"
                        />
                        <button
                            onClick={handleGenerate}
                            disabled={loading || !incidentText.trim()}
                            className="btn btn-primary w-full mt-4 py-3 text-sm font-bold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-75"></span>
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-150"></span>
                                    Generating...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <FileText size={16} /> Generate AI Report
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right: Output */}
                <div className="flex flex-col h-full bg-[#050510] border border-surface-border rounded-xl overflow-hidden shadow-2xl">
                    <div className="bg-surface-border/30 p-4 border-b border-surface-border flex justify-between items-center">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <FileText size={18} className="text-accent" /> Generated Report
                        </h3>
                        <button
                            className="btn text-xs py-1.5 px-3 bg-surface-border hover:bg-surface-border/80 text-white flex items-center gap-2 mr-2"
                            onClick={handlePrint}
                            disabled={!generatedReport}
                        >
                            <Printer size={14} /> Print PDF
                        </button>
                        <button
                            className={`btn text-xs py-1.5 px-3 transition-colors ${copied ? 'bg-green-500/20 text-green-400' : 'bg-surface-border hover:text-white text-gray-400'}`}
                            onClick={handleCopy}
                            disabled={!generatedReport}
                        >
                            {copied ? (
                                <span className="flex items-center gap-1">
                                    <Check size={14} /> Copied
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <Copy size={14} /> Copy
                                </span>
                            )}
                        </button>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-gray-300">
                        <AnimatePresence mode='wait'>
                            {generatedReport ? (
                                <motion.div
                                    key="report"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="prose prose-invert max-w-none"
                                    id="report-markdown-container"
                                >
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 text-white" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3 text-white border-b border-gray-800 pb-2" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-white" {...props} />,
                                            p: ({ node, ...props }) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 text-gray-300 space-y-1" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 text-gray-300 space-y-1" {...props} />,
                                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                                            strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 pl-4 py-1 my-4 bg-primary/5 italic text-gray-400" {...props} />,
                                        }}
                                    >
                                        {generatedReport}
                                    </ReactMarkdown>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50"
                                >
                                    <FileText size={48} className="mb-4" />
                                    <p>Select a category and enter details to generate a report.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default TemplateGenerator;
