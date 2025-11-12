// src/components/contact/ContactInfoCard.jsx
import { motion } from 'framer-motion';

// Variante de animación (ajustada para un movimiento más sutil)
const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactInfoCard = ({ Icon, title, value, href, iconBg, itemDelay }) => (
    // 💡 Tarjeta: Limpia, esquinas más suaves (rounded-xl) y un sutil borde gris para definir el espacio.
    <motion.div 
        className="group flex items-center space-x-5 p-5 bg-white border border-gray-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-lg" 
        variants={itemVariants}
        style={{ transitionDelay: `${itemDelay}s` }} // Aplicamos el delay aquí para escalamiento secuencial
        // 💫 Hover: Animación de levantamiento sutil en lugar de desplazamiento lateral
        whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
        {/* Ícono: Fondo Azul Marino corporativo, esquinas más cuadradas (rounded-lg) */}
        <div className={`w-14 h-14 bg-[#1E3A8A] rounded-lg flex items-center justify-center shrink-0 shadow-lg group-hover:bg-blue-800 transition-colors duration-300`}>
            {/* 📏 Ícono ligeramente más pequeño para un look más formal */}
            <Icon className="w-6 h-6 text-white" />
        </div>
        
        <div>
            {/* Título: Gris Carbón (casi negro), peso font-semibold para autoridad */}
            <h3 className="font-semibold text-gray-900 text-lg mb-1">{title}</h3>
            
            {/* Si existe href, es un enlace; si no, es un párrafo */}
            {href ? (
                // 🔗 Enlace: Color de texto Gris Oscuro, hover en Azul Marino
                <a 
                    href={href} 
                    className="text-gray-600 text-base hover:text-[#1E3A8A] transition-colors duration-300 break-words font-medium"
                    // Eliminamos la lógica de cambio de color condicional por ser menos profesional
                >
                    {value}
                </a>
            ) : (
                // Párrafo: Gris medio, limpio y legible
                <p className="text-gray-600 text-base break-words font-medium">{value}</p>
            )}
        </div>
    </motion.div>
);

export default ContactInfoCard;