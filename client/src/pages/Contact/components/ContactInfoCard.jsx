// src/components/contact/ContactInfoCard.jsx
import { motion } from 'framer-motion';

// Variante de animación (copiada del padre original)
const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactInfoCard = ({ Icon, title, value, href, iconBg, itemDelay }) => (
    <motion.div 
        className="group flex items-center space-x-5 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300" 
        variants={itemVariants}
        style={{ transitionDelay: `${itemDelay}s` }} // Aplicamos el delay aquí para escalamiento secuencial
        whileHover={{ x: 10, transition: { duration: 0.3 } }}
    >
        <div className={`${iconBg} w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white drop-shadow-sm" />
        </div>
        <div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">{title}</h3>
            {/* Si existe href, es un enlace; si no, es un párrafo */}
            {href ? (
                <a href={href} className={`text-slate-600 text-base ${title.includes('Email') ? 'hover:text-[#ED0000]' : 'hover:text-[#1C2E82]'} transition-colors duration-300 break-words`}>
                    {value}
                </a>
            ) : (
                <p className="text-slate-600 text-base break-words">{value}</p>
            )}
        </div>
    </motion.div>
);

export default ContactInfoCard;