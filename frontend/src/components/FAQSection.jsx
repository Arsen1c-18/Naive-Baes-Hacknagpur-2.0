import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FAQS = [
    {
        question: "How does the Spam Detector work?",
        answer: "Our AI analyzes the text patterns and links within the message to identify common scam indicators, phishing attempts, and fraudulent language used by cybercriminals."
    },
    {
        question: "Is my data private when using the tools?",
        answer: "Yes, absolutely. We process data in real-time and do not store your personal messages or analyzed text unless you explicitly choose to submit them as a report to the community."
    },
    {
        question: "What should I do if I find a deepfake?",
        answer: "Use our Media Guard tool to analyze the content. If confirmed as a deepfake, you can generate a report template and submit it to the relevant platform or cybercrime portal using the '1930' helpline."
    },
    {
        question: "Is this service free to use?",
        answer: "Yes, the core safety tools (Spam Check, Text Analysis, Media Guard) are completely free for individual users to ensure everyone has access to digital safety."
    },
    {
        question: "How can I report a cybercrime?",
        answer: "You can dial '1930' immediately for the National Cyber Crime Helpline in India, or use our 'Report Templates' feature to draft a formal complaint for cybercrime.gov.in."
    }
];

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="w-full max-w-3xl mx-auto py-12 px-4" id="faq">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-cyan-50 rounded-full mb-4">
                    <MessageCircleQuestion className="text-cyan-600" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-500">Everything you need to know about staying safe online.</p>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-cyan-200 hover:shadow-sm"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                        >
                            <span className="font-semibold text-slate-800 text-lg pr-4">{faq.question}</span>
                            <ChevronDown
                                className={`text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-cyan-500' : ''}`}
                                size={20}
                            />
                        </button>

                        <AnimatePresence>
                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                >
                                    <div className="px-5 pb-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 mt-2">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;
