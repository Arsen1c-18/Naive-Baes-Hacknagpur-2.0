import React from 'react';
import { motion } from 'framer-motion';

const PageShell = ({ title, children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`container mx-auto px-4 py-8 ${className}`}
        >
            <h1 className="hero-text text-3xl md:text-4xl mb-6">{title}</h1>
            <div className="card">
                {children}
            </div>
        </motion.div>
    );
};

export default PageShell; 
