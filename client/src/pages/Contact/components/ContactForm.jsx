// src/components/contact/ContactForm.jsx
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Variante de animación del contenedor (más simple y profesional)
const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
        opacity: 1, 
        x: 0, 
        transition: { 
            duration: 0.7, 
            ease: [0.25, 0.46, 0.45, 0.94],
            when: "beforeChildren",
            staggerChildren: 0.15 
        } 
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Ajustamos y a 20 para ser más sutil
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
    },
};

const ContactForm = ({ formData, submissionStatus, loading, handleChange, handleSubmit }) => {
    return (
        // 💡 Contenedor: Fondo blanco sólido, esquinas redondeadas elegantes (xl), sombra nítida.
        <motion.div 
            className="bg-white p-8 md:p-10 rounded-xl shadow-2xl shadow-gray-300/50 border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={formVariants}
        >
            {/* Título: Gris Carbón (más serio) y peso font-bold */}
            <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 tracking-tight" 
                variants={itemVariants}
            >
                Envíanos un Mensaje
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6"> {/* Espaciado ajustado a space-y-6 */}
                
                {/* Campo Nombre Completo */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2"> {/* font-semibold y mb-2 */}
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        // 📝 Estilo de Input: Borde más oscuro (gray-300), esquinas menos redondeadas (lg), focus en Azul Marino
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all duration-300 text-gray-800 font-normal bg-white"
                        placeholder="Tu nombre completo"
                        required
                    />
                </motion.div>

                {/* Campo Correo Electrónico */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        // 📝 Estilo de Input consistente
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all duration-300 text-gray-800 font-normal bg-white"
                        placeholder="tu@email.com"
                        required
                    />
                </motion.div>

                {/* Campo Tu Mensaje */}
                <motion.div variants={itemVariants}>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Tu Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        // 📝 Estilo de Input consistente
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A]/30 focus:border-[#1E3A8A] transition-all duration-300 resize-none text-gray-800 font-normal bg-white"
                        placeholder="Cuéntanos cómo podemos ayudarte..."
                        required
                    ></textarea>
                </motion.div>

                {/* Botón de Envío */}
                <motion.button
                    type="submit"
                    // 🟦 Botón: Color Azul Marino Sólido Corporativo
                    className="group relative w-full overflow-hidden bg-[#1E3A8A] rounded-lg px-8 py-4 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                    variants={itemVariants}
                    whileHover={{ 
                        scale: 1.01, // Hover más sutil
                        boxShadow: "0 10px 20px -5px rgba(30, 58, 138, 0.4)", // Sombra de acento azul
                        transition: { duration: 0.3 } 
                    }}
                    whileTap={{ scale: 0.99 }}
                >
                    {/* Efecto de brillo deslizante (reutilizado, pero más sutil) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <div className="relative flex items-center justify-center">
                        {loading ? (
                            <>
                                {/* Aseguramos que el spinner sea visible */}
                                <motion.div 
                                    className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full mr-3"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                                <span>Enviando...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-3 group-hover:translate-x-0.5 transition-transform duration-300" />
                                <span>Enviar Mensaje</span>
                            </>
                        )}
                    </div>
                </motion.button>

                {/* Estados de respuesta (Ajustados a tonos más corporativos) */}
                {submissionStatus === 'success' && (
                    <motion.div
                        className="flex items-center p-4 bg-green-50 border border-green-300 rounded-lg text-green-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CheckCircle className="w-5 h-5 mr-3 shrink-0" />
                        <p className="font-medium text-sm">
                            ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en 24 horas.
                        </p>
                    </motion.div>
                )}

                {submissionStatus === 'error' && (
                    <motion.div
                        className="flex items-center p-4 bg-red-50 border border-red-300 rounded-lg text-red-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
                        <p className="font-medium text-sm">
                            Ocurrió un error al enviar. Por favor, verifica tus datos e inténtalo de nuevo.
                        </p>
                    </motion.div>
                )}
            </form>
        </motion.div>
    );
};

export default ContactForm;