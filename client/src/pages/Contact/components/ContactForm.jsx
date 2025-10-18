// src/components/contact/ContactForm.jsx
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Variante de animación (copiada del padre original)
const formVariants = {
    hidden: { opacity: 0, x: 50, rotateY: 15 },
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

const ContactForm = ({ formData, submissionStatus, loading, handleChange, handleSubmit }) => {
    return (
        <motion.div 
            className="bg-gradient-to-br from-white to-blue-50/30 p-10 rounded-3xl shadow-2xl border border-white/60 backdrop-blur-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
        >
            <motion.h2 
                className="text-3xl font-black text-[#1C2E82] mb-6" 
                variants={itemVariants}
            >
                Envíanos un Mensaje
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Campo Nombre Completo */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-3">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#1C2E82]/20 focus:border-[#1C2E82] transition-all duration-300 text-slate-700 font-medium bg-white/80 backdrop-blur-sm"
                        placeholder="Tu nombre completo"
                        required
                    />
                </motion.div>

                {/* Campo Correo Electrónico */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-3">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#1C2E82]/20 focus:border-[#1C2E82] transition-all duration-300 text-slate-700 font-medium bg-white/80 backdrop-blur-sm"
                        placeholder="tu@email.com"
                        required
                    />
                </motion.div>

                {/* Campo Tu Mensaje */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-3">
                        Tu Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-5 py-4 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#1C2E82]/20 focus:border-[#1C2E82] transition-all duration-300 resize-none text-slate-700 font-medium bg-white/80 backdrop-blur-sm"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        required
                    ></textarea>
                </motion.div>

                {/* Botón de Envío */}
                <motion.button
                    type="submit"
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-[#ED0000] via-[#ff4444] to-[#ff6b6b] rounded-2xl px-8 py-5 text-white font-black text-lg shadow-2xl border-2 border-white/30 backdrop-blur-sm"
                    disabled={loading}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 25px 50px -12px rgba(237, 0, 0, 0.4)",
                        transition: { duration: 0.3 } 
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Efecto de brillo deslizante */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="relative flex items-center justify-center">
                        {loading ? (
                            <>
                                <motion.div 
                                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mr-3"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Enviando mensaje...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                                <span>Enviar Mensaje</span>
                            </>
                        )}
                    </div>
                </motion.button>

                {/* Estados de respuesta */}
                {submissionStatus === 'success' && (
                    <motion.div
                        className="flex items-center justify-center p-4 bg-green-50 border-2 border-green-200 rounded-2xl"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                        <p className="text-green-700 font-medium">
                            ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                        </p>
                    </motion.div>
                )}

                {submissionStatus === 'error' && (
                    <motion.div
                        className="flex items-center justify-center p-4 bg-red-50 border-2 border-red-200 rounded-2xl"
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                        <p className="text-red-700 font-medium">
                            Ocurrió un error. Por favor, inténtalo de nuevo más tarde.
                        </p>
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;