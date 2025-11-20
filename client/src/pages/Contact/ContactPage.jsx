// src/pages/ContactPage.jsx (Contenedor principal actualizado)

import React from 'react';
// La mayoría de los imports de React y estados ya no son necesarios aquí
import { motion } from 'framer-motion'; // Se mantiene si usas animaciones en el layout
import { Send, CheckCircle, AlertCircle } from 'lucide-react'; // Puedes quitar estos si solo se usan en ContactForm

// Importar componentes modulares
import ContactHero from './components/ContactHero';
import ContactInfoSection from './components/ContactInfoSection';
import ContactForm from './components/ContactForm';

// Importar el hook con toda la lógica del formulario
import useContactForm from './components/useContactForm'; // Asegúrate de ajustar la ruta

const ContactPage = () => {
    // 1. Llama al hook para obtener la lógica
    const { 
        formData, 
        submissionStatus, 
        loading, 
        handleChange, 
        handleSubmit 
    } = useContactForm();

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

                        {/* 2b. Formulario de Contacto (Paso de props limpios) */}
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