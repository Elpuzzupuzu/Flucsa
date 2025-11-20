// src/components/contact/ContactInfoSection.jsx

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactInfoCard from './ContactInfoCard';

// Variante de animación del contenedor (más simple y profesional)
const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94],
            when: "beforeChildren", // Aseguramos que los hijos aparezcan después
            staggerChildren: 0.15 
        } 
    },
};

// Variante de animación para el texto (se mantiene limpia)
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactInfoSection = () => (
    // 💡 Contenedor: Fondo blanco sólido, esquinas redondeadas elegantes (xl), sombra nítida, borde sutil.
    <motion.div 
        className="bg-white p-8 md:p-10 rounded-xl shadow-2xl shadow-gray-300/50 border border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
    >
        {/* Título: Gris Carbón (más serio) y peso font-bold */}
        <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight" 
            variants={itemVariants}
        >
            Detalles de Contacto
        </motion.h2>
        
        {/* Párrafo: Gris oscuro, peso normal para la legibilidad */}
        <motion.p 
            className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 font-normal" 
            variants={itemVariants}
        >
            Si prefieres comunicarte directamente, aquí están nuestros datos. Estamos disponibles para ayudarte con cualquier consulta que tengas.
        </motion.p>

        <div className="space-y-6">
            {/* Uso de ContactInfoCard (ya modificado en el paso anterior) */}
            <ContactInfoCard
                Icon={Mail}
                title="Email"
                value="ventas@flucsa.com.mx"
                href="mailto:ventas@flucsa.com.mx"
                // ❌ Eliminamos iconBg. El color del ícono es fijo en ContactInfoCard.jsx
                itemDelay={0} 
            />
            <ContactInfoCard
                Icon={Phone}
                title="Teléfono"
                value="(+52) 9993632630"
                href="tel:+529993632630"
                //  Eliminamos iconBg. El color del ícono es fijo en ContactInfoCard.jsx
                itemDelay={0.15}
            />
            <ContactInfoCard
                Icon={MapPin}
                title="Dirección"
                value="Calle 26a entre 47 y 51. Colonia El Roble Ciudad Industrial, Mérida Yucatán, México C.P : 97256"
                // ❌ Eliminamos iconBg. El color del ícono es fijo en ContactInfoCard.jsx
                itemDelay={0.3}
            />
        </div>
    </motion.div>
);

export default ContactInfoSection;