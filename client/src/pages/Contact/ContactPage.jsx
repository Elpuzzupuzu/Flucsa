// src/pages/ContactPage.jsx (Contenedor principal)

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react'; // Solo los íconos necesarios para el estado

// Importar componentes modulares
import ContactHero from './components/ContactHero';
import ContactInfoSection from './components/ContactInfoSection';
import ContactForm from './components/ContactForm';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submissionStatus, setSubmissionStatus] = useState(null); // 'loading', 'success', 'error'
    const [loading, setLoading] = useState(false); // Nuevo estado para el loading (más explícito)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Activa el loading
        setSubmissionStatus('loading');
        
        console.log('Datos del formulario:', formData);
        
        // Simulación de una llamada a la API
        try {
            await new Promise((resolve, reject) => setTimeout(() => {
                // Simula éxito o error (ej. 80% éxito, 20% error)
                if (Math.random() < 0.8) {
                    resolve(); 
                } else {
                    reject(new Error("Error de servidor simulado"));
                }
            }, 2000));

            setSubmissionStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
        } catch (error) {
            setSubmissionStatus('error');
            console.error('Error al enviar el formulario:', error);
        } finally {
            setLoading(false); // Desactiva el loading
            // Opcional: limpiar el estado de éxito/error después de unos segundos
            setTimeout(() => setSubmissionStatus(null), 5000); 
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30">
            {/* 1. SECCIÓN HERO */}
            <ContactHero />

            {/* 2. SECCIÓN PRINCIPAL (Info y Formulario) */}
            <section className="py-20 px-6 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        
                        {/* 2a. Información de Contacto */}
                        <ContactInfoSection />

                        {/* 2b. Formulario de Contacto */}
                        <ContactForm
                            formData={formData}
                            submissionStatus={submissionStatus}
                            loading={loading}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;