// src/hooks/useContactForm.js

import { useState } from 'react';

// Define el camino al endpoint, constante para todos los entornos
const CONTACT_PATH = '/contact/submit';

// Función de validación (separada para mantener limpio el handleSubmit)
const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
        errors.name = 'El nombre es obligatorio.';
    }
    if (!data.email.trim()) {
        errors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'El formato del correo electrónico no es válido.';
    }
    if (!data.message.trim()) {
        errors.message = 'El mensaje es obligatorio.';
    }

    return errors;
};


const useContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    // submissionStatus: 'loading', 'success', 'error', null
    const [submissionStatus, setSubmissionStatus] = useState(null); 
    const [loading, setLoading] = useState(false);
    // Nuevo estado para mostrar errores de validación específicos
    const [formErrors, setFormErrors] = useState({}); 

    // Limpia el estado de error y status después de un tiempo
    const clearFeedback = () => {
        setTimeout(() => {
            setSubmissionStatus(null);
            setFormErrors({});
        }, 5000); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        // Opcional: Limpiar el error específico del campo al teclear
        setFormErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // --- 1. VALIDACIÓN FRONTEND ---
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setSubmissionStatus('error'); // Indica un error de validación local
            clearFeedback();
            return; // Detiene el envío
        }

        setLoading(true);
        setSubmissionStatus('loading');
        setFormErrors({}); // Limpiar errores de validación si pasaron

        // --- 2. CONFIGURACIÓN DEL ENDPOINT ---
        // Usa la variable de entorno para la URL base (p.ej. https://flucsa-backend.onrender.com)
        // El operador || es un fallback para desarrollo local si la variable no está definida.
        const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
        const API_ENDPOINT = `${BASE_URL}${CONTACT_PATH}`;
        
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                // El backend debe devolver un JSON con un mensaje de error si falla (400, 500)
                const errorData = await response.json();
                // Si hay un error 400 (Bad Request), el backend puede enviar errores de validación detallados
                throw new Error(errorData.message || 'Error desconocido del servidor.');
            }
            
            // Éxito
            setSubmissionStatus('success');
            setFormData({ name: '', email: '', message: '' }); // Limpia el formulario
            
        } catch (error) {
            // Manejo de Errores (Red o Servidor)
            setSubmissionStatus('error');
            console.error('Error al enviar el formulario:', error.message);
            // Puedes usar error.message para mostrar el error específico al usuario si lo deseas
            
        } finally {
            setLoading(false); 
            clearFeedback();
        }
    };

    return {
        formData,
        submissionStatus,
        loading,
        formErrors,      // Se retorna el nuevo estado de errores
        handleChange,
        handleSubmit,
    };
};

export default useContactForm;