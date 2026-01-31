import React, { useState } from 'react';
import PageShell from '../components/PageShell';
import { api } from '../lib/api';
import { Upload, FileAudio, FileImage, ShieldCheck, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaCheck = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setResult(null);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;
        setLoading(true);
        try {
            let res;
            if (file.type.startsWith('image/')) {
                res = await api.analyzeScreenshot(file);
            } else if (file.type.startsWith('audio/')) {
                res = await api.analyzeVoice(file);
            }

            setResult({
                detected: res.risk_level === 'HIGH' || res.risk_level === 'MEDIUM',
                message: res.analysis || `Analysis complete. Risk Level: ${res.risk_level}`,
                confidence: Math.round(res.confidence * 100)
            });
        } catch (error) {
            console.error(error);
            setResult({
                detected: true,
                message: "Error analyzing file. Please try again.",
                confidence: 0
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell title="Deepfake & Media Guard">
            <div className="max-w-3xl mx-auto">
                <p className="text-gray-400 mb-8 text-center text-lg">
                    Upload images or audio clips to detect potential manipulation, deepfakes, or voice cloning.
                </p>

                <div
                    className="border-2 border-dashed border-surface-border rounded-2xl p-12 text-center cursor-pointer bg-white/5 transition-colors hover:border-primary group mb-8"
                    onClick={() => document.getElementById('file-upload').click()}
                >
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*,audio/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {!file ? (
                        <>
                            <Upload size={48} className="text-gray-500 mx-auto mb-4 group-hover:text-primary transition-colors" />
                            <p className="text-xl font-medium mb-1">Click to upload Image or Audio</p>
                            <p className="text-sm text-gray-400">Supports JPG, PNG, MP3, WAV</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center">
                            {file.type.startsWith('image/')
                                ? <FileImage size={48} className="text-primary mb-4" />
                                : <FileAudio size={48} className="text-accent mb-4" />
                            }
                            <p className="text-lg font-medium">{file.name}</p>
                            <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mb-8">
                    <button
                        className={`btn btn-primary px-8 py-3 text-lg ${!file && 'opacity-50'}`}
                        onClick={handleAnalyze}
                        disabled={loading || !file}
                    >
                        {loading ? 'Analyzing Media...' : 'Scan for Manipulation'}
                    </button>
                </div>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`p-6 rounded-xl border-l-4 shadow-lg ${result.detected
                                ? 'bg-red-500/10 border-red-500 border-l-red-500'
                                : 'bg-green-500/10 border-green-500 border-l-green-500'
                                }`}
                        >
                            <div className="flex items-center gap-6">
                                {result.detected
                                    ? <ShieldAlert size={56} className="text-danger flex-shrink-0" />
                                    : <ShieldCheck size={56} className="text-success flex-shrink-0" />
                                }
                                <div>
                                    <h3 className={`text-2xl font-bold m-0 ${result.detected ? 'text-danger' : 'text-success'
                                        }`}>
                                        {result.detected ? 'Suspicious Elements Detected' : 'Media Appears Authentic'}
                                    </h3>
                                    <p className="text-lg my-2 text-gray-200">{result.message}</p>
                                    <div className="text-sm text-gray-400">
                                        Confidence: <span className="font-mono">{result.confidence}%</span>
                                    </div>

                                    {result.detected && (
                                        <div className="mt-4">
                                            <button className="btn btn-emergency text-sm uppercase px-4 py-2">
                                                Flag Content
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </PageShell>
    );
};

export default MediaCheck;
