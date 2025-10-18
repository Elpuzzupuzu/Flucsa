// src/components/contact/ContactHero.jsx

import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

const floatingVariants = {
    animate: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.15
        }
    },
};

const headerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactHero = () => (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24 px-6 overflow-hidden">
        {/* Elementos decorativos animados (Framer Motion) */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div 
                className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-[#1C2E82]/20 to-[#2d4bc7]/20 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
            />
            <motion.div 
                className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-[#ED0000]/20 to-[#ff4444]/20 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
            />
            <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '4s' }}
            />
        </div>

        {/* Patrón decorativo */}
        <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
                backgroundImage: 'radial-gradient(circle, #1C2E82 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#ED0000] via-[#ff4444] to-[#ff6b6b] rounded-3xl mb-8 shadow-2xl ring-4 ring-white/50" 
                    variants={headerVariants}
                    whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
                >
                    <Mail className="w-10 h-10 text-white drop-shadow-lg" />
                </motion.div>

                <motion.h1 
                    className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#1C2E82] via-[#2d4bc7] to-[#4361ee] bg-clip-text text-transparent mb-6 tracking-tight leading-tight" 
                    variants={headerVariants}
                >
                    Contáctanos
                </motion.h1>

                <motion.div 
                    className="flex items-center justify-center mb-8" 
                    variants={headerVariants}
                >
                    <div className="w-20 h-1.5 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-full"></div>
                    <div className="w-4 h-4 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-full mx-4 shadow-lg"></div>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-full"></div>
                </motion.div>

                <motion.p 
                    className="text-slate-700 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium" 
                    variants={headerVariants}
                >
                    Estamos aquí para ayudarte. Si tienes alguna pregunta sobre nuestros servicios o productos, no dudes en contactarnos.
                </motion.p>
            </motion.div>
        </div>
    </section>
);

export default ContactHero;