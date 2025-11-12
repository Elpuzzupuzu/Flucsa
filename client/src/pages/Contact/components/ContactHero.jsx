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
    hidden: { opacity: 0, y: 30 }, // Reducimos un poco el desplazamiento
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactHero = () => (
    // 🎨 Fondo: Blanco nítido con un sutil degradado a Gris Claro (más limpio)
    <section className="relative bg-white py-32 px-6 overflow-hidden">
        
        {/* Elementos decorativos animados: Tonalidades de acento muy tenues (Gris muy claro) */}
        <div className="absolute inset-0 overflow-hidden">
            <motion.div 
                // 🔹 Gris muy claro, opacidad mínima
                className="absolute top-20 right-10 w-80 h-80 bg-gray-200/5 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
            />
            <motion.div 
                // ◻️ Azul Marino tenue y sutil
                className="absolute bottom-20 left-10 w-64 h-64 bg-[#1E3A8A]/5 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
            />
        </div>

        {/* Patrón decorativo: Se eliminan los puntos para una superficie totalmente limpia */}

        <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Ícono Principal: Fondo Gris Carbón (más neutro y corporativo) */}
                <motion.div 
                    // 🔘 Fondo Gris Carbón/Azul Oscuro casi negro
                    className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-xl mb-6 shadow-md ring-4 ring-gray-100" 
                    variants={headerVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                    <Mail className="w-8 h-8 text-white" />
                </motion.div>

                {/* Título (H1): Fuente más pequeña, peso 'bold' y color Gris Carbón/Azul Oscuro */}
                <motion.h1 
                    // ✍️ Fuentes: Reducimos tamaño (6xl), usamos font-bold, color más oscuro y serio
                    className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-tight" 
                    variants={headerVariants}
                >
                    Conectemos.
                </motion.h1>
                
                {/* Párrafo Principal: Texto en Gris Oscuro, peso 'normal' para facilitar la lectura */}
                <motion.p 
                    className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal" 
                    variants={headerVariants}
                >
                    Estamos aquí para ayudarte. **Si tienes alguna pregunta** sobre nuestros servicios o productos, no dudes en contactarnos.
                </motion.p>


                {/* Separador: Más minimalista en un tono de Azul Marino sutil */}
                <motion.div 
                    className="flex items-center justify-center mt-6 mb-8" 
                    variants={headerVariants}
                >
                    {/* ➖ Línea fina en Azul Marino Corporativo */}
                    <div className="w-12 h-0.5 bg-[#1E3A8A]/50 rounded-full"></div>
                </motion.div>

                {/* Texto de apoyo opcional: Gris más claro, fuente 'light', sin cursivas */}
                <motion.p 
                    className="text-gray-500 text-sm md:text-base max-w-3xl mx-auto leading-normal font-light" 
                    variants={headerVariants}
                >
                    Nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas laborables.
                </motion.p>
            </motion.div>
        </div>
    </section>
);

export default ContactHero;