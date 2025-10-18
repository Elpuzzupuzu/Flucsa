// src/components/contact/ContactInfoSection.jsx

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactInfoCard from './ContactInfoCard';

// Variante de animación (copiada del padre original)
const cardVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -15 },
    visible: { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactInfoSection = () => (
    <motion.div 
        className="bg-gradient-to-br from-white to-slate-50/50 p-10 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardVariants}
    >
        <motion.h2 
            className="text-3xl font-black text-[#1C2E82] mb-6" 
            variants={itemVariants}
        >
            Detalles de Contacto
        </motion.h2>
        
        <motion.p 
            className="text-slate-600 text-lg leading-relaxed mb-10 font-medium" 
            variants={itemVariants}
        >
            Si prefieres comunicarte directamente, aquí están nuestros datos. Estamos disponibles para ayudarte con cualquier consulta que tengas.
        </motion.p>

        <div className="space-y-8">
            <ContactInfoCard
                Icon={Mail}
                title="Email"
                value="ventas@flucsa.com.mx"
                href="mailto:ventas@flucsa.com.mx"
                iconBg="bg-gradient-to-br from-[#ED0000] to-[#ff4444]"
                itemDelay={0.1} // Ejemplo de delay para escalonamiento
            />
            <ContactInfoCard
                Icon={Phone}
                title="Teléfono"
                value="(+52) 9993632630"
                href="tel:+529993632630"
                iconBg="bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7]"
                itemDelay={0.25}
            />
            <ContactInfoCard
                Icon={MapPin}
                title="Dirección"
                value="Calle 26a entre 47 y 51. Colonia El Roble Ciudad Industrial, Mérida Yucatán, México C.P : 97256"
                iconBg="bg-gradient-to-br from-[#ED0000] to-[#ff4444]"
                itemDelay={0.4}
            />
        </div>
    </motion.div>
);

export default ContactInfoSection;