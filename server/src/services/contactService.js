// src/services/ContactService.js

import nodemailer from 'nodemailer';
// Asegúrate de configurar tus variables de entorno para el SMTP
// Usualmente en un archivo .env y cargadas al inicio de la app
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

class contactService {
    /**
     * Envía un correo electrónico con los datos del formulario.
     * @param {object} formData - Datos del formulario (name, email, message).
     * @returns {Promise<object>} Información sobre el envío.
     */
    async sendContactEmail(formData) {
        const { name, email, message } = formData;
        
        // 1. Configuración del correo
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.CONTACT_RECIPIENT_EMAIL, // El correo de tu empresa o tuyo
            subject: `[Contacto Web] Nuevo mensaje de ${name}`,
            html: `
                <h3>Detalles del Contacto</h3>
                <p><strong>Nombre:</strong> ${name}</p>
                <p><strong>Correo Electrónico:</strong> ${email}</p>
                <hr>
                <p><strong>Mensaje:</strong></p>
                <p>${message}</p>
            `,
        };

        try {
            // 2. Envío real usando Nodemailer
            const info = await transporter.sendMail(mailOptions);
            console.log('Correo enviado: %s', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (error) {
            console.error("Error al enviar el correo:", error);
            // Re-lanza un error más limpio para que el Controller lo maneje
            throw new Error("Fallo al contactar el servidor de correo.");
        }
    }
}

export default new contactService();