import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

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
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error al enviar el formulario:', error);
        }
    };

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <main className="min-h-screen bg-white">
            <section className="bg-slate-100 py-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-10 w-64 h-64 bg-[#1C2E82] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#ED0000] rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        className="text-center mb-12"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div className="inline-flex items-center justify-center w-12 h-12 bg-[#ED0000] rounded-xl mb-4" variants={itemVariants}>
                            <Mail className="w-6 h-6 text-white" />
                        </motion.div>
                        <motion.h1 className="text-4xl md:text-5xl font-black text-[#1C2E82] mb-3 tracking-tight" variants={itemVariants}>
                            Contáctanos
                        </motion.h1>
                        <motion.div className="w-20 h-0.5 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] mx-auto mb-4 rounded-full" variants={itemVariants}></motion.div>
                        <motion.p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed" variants={itemVariants}>
                            Estamos aquí para ayudarte. Si tienes alguna pregunta sobre nuestros servicios o productos, no dudes en contactarnos.
                        </motion.p>
                    </motion.div>
                </div>
            </section>
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Información de Contacto */}
                    <motion.div 
                        className="bg-slate-50 p-8 rounded-2xl shadow-lg border border-slate-100"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                    >
                        <motion.h2 className="text-2xl font-bold text-[#1C2E82] mb-4" variants={itemVariants}>
                            Detalles de Contacto
                        </motion.h2>
                        <motion.p className="text-slate-700 leading-relaxed mb-6" variants={itemVariants}>
                            Si prefieres comunicarte directamente, aquí están nuestros datos. Estamos disponibles para ayudarte con cualquier consulta.
                        </motion.p>
                        <div className="space-y-6">
                            <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                                <div className="w-12 h-12 bg-[#ED0000] rounded-xl flex items-center justify-center shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Email</h3>
                                    <p className="text-slate-600 break-words">info@empresa.com</p>
                                </div>
                            </motion.div>
                            <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                                <div className="w-12 h-12 bg-[#1C2E82] rounded-xl flex items-center justify-center shrink-0">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Teléfono</h3>
                                    <p className="text-slate-600">(+52) 55 1234 5678</p>
                                </div>
                            </motion.div>
                            <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                                <div className="w-12 h-12 bg-[#ED0000] rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-800">Dirección</h3>
                                    <p className="text-slate-600">Av. Siempre Viva 123, Springfield, México</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Formulario de Contacto */}
                    <motion.div 
                        className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                    >
                        <motion.h2 className="text-2xl font-bold text-[#1C2E82] mb-4" variants={itemVariants}>
                            Envíanos un Mensaje
                        </motion.h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1C2E82] focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1C2E82] focus:border-transparent transition-all duration-300"
                                    required
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1C2E82] focus:border-transparent transition-all duration-300"
                                    required
                                ></textarea>
                            </motion.div>
                            <motion.button
                                type="submit"
                                className="w-full inline-flex items-center justify-center bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-2xl px-6 py-4 text-white font-bold transition-transform duration-300 transform-gpu hover:scale-105"
                                disabled={submissionStatus === 'loading'}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {submissionStatus === 'loading' ? 'Enviando...' : (
                                    <>
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        <span>Enviar Mensaje</span>
                                    </>
                                )}
                            </motion.button>
                            {submissionStatus === 'success' && (
                                <motion.p 
                                    className="text-center text-green-600 mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                                </motion.p>
                            )}
                            {submissionStatus === 'error' && (
                                <motion.p 
                                    className="text-center text-red-600 mt-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Ocurrió un error. Por favor, inténtalo de nuevo más tarde.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;
