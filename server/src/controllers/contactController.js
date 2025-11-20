// src/controllers/ContactController.js

import ContactService from '../services/contactService.js';

class contactController {
    async handleSubmission(req, res) {
        const formData = req.body;

        // 1. Validación (Mínima, puedes añadir Joi o Express Validator aquí)
        if (!formData.name || !formData.email || !formData.message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Faltan campos obligatorios (nombre, email, o mensaje).' 
            });
        }

        try {
            // 2. Delegar el trabajo al Service
            await ContactService.sendContactEmail(formData);

            // 3. Respuesta de éxito
            return res.status(200).json({ 
                success: true, 
                message: 'Mensaje enviado con éxito.' 
            });
        } catch (error) {
            // 4. Respuesta de error del servidor
            console.error('Error en el controlador de contacto:', error.message);
            return res.status(500).json({ 
                success: false, 
                message: 'Error interno del servidor al procesar el envío.' 
            });
        }
    }
}

export default new contactController();