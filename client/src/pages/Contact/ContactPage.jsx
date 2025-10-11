import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('loading');
        // Aquí puedes enviar los datos del formulario a un backend
        console.log('Datos del formulario:', formData);
        
        // Simulación de una llamada a la API
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error al enviar el formulario:', error);
        }
    };

    // Variantes de animación mejoradas
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
            transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            } 
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                duration: 0.6, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            } 
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -50, rotateY: -15 },
        visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            } 
        },
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50, rotateY: 15 },
        visible: { 
            opacity: 1, 
            x: 0, 
            rotateY: 0,
            transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94] 
            } 
        },
    };

    const floatingVariants = {
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
            {/* Hero Section con animaciones mejoradas */}
            <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-24 px-6 overflow-hidden">
                {/* Elementos decorativos animados */}
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
                            whileHover={{ 
                                scale: 1.1, 
                                rotate: 5,
                                transition: { duration: 0.3 } 
                            }}
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

            {/* Sección principal con mejor espaciado */}
            <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Información de Contacto mejorada */}
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
                                <motion.div 
                                    className="group flex items-center space-x-5 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300" 
                                    variants={itemVariants}
                                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-7 h-7 text-white drop-shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1">Email</h3>
                                        <a href="mailto:info@empresa.com" className="text-slate-600 text-base hover:text-[#ED0000] transition-colors duration-300">
                                            ventas@flucsa.com.mx
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="group flex items-center space-x-5 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300" 
                                    variants={itemVariants}
                                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-7 h-7 text-white drop-shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1">Teléfono</h3>
                                        <a href="tel:+5255123456789" className="text-slate-600 text-base hover:text-[#1C2E82] transition-colors duration-300">
                                            (+52) 9993632630
                                        </a>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="group flex items-center space-x-5 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300" 
                                    variants={itemVariants}
                                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-7 h-7 text-white drop-shadow-sm" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1">Dirección</h3>
                                        <p className="text-slate-600 text-base">Calle 26a entre 47 y 51.Colonia El Roble Ciudad Industrial,Mérida Yucatán, México C.P : 97256</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Formulario de Contacto mejorado */}
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

                                <motion.button
                                    type="submit"
                                    className="group relative w-full overflow-hidden bg-gradient-to-r from-[#ED0000] via-[#ff4444] to-[#ff6b6b] rounded-2xl px-8 py-5 text-white font-black text-lg shadow-2xl border-2 border-white/30 backdrop-blur-sm"
                                    disabled={submissionStatus === 'loading'}
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
                                        {submissionStatus === 'loading' ? (
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

                                {/* Estados de respuesta mejorados */}
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
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;