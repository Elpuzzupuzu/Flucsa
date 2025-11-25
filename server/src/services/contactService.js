// src/services/ContactService.js (Versión con Resend API)

import { Resend } from 'resend';

// Inicializa Resend con la clave API
// La clave API debe estar definida en process.env.RESEND_API_KEY en Render
const resend = new Resend(process.env.RESEND_API_KEY);

// El correo FROM debe ser un dominio/correo verificado en el panel de Resend
// Usamos el correo del remitente configurado en las variables de entorno para Nodemailer
const SENDER_EMAIL = process.env.SMTP_USER || 'noreply@flucsa.com.mx';

class contactService {
  /**
   * Envía un correo electrónico con los datos del formulario usando la API de Resend.
   * @param {object} formData - Datos del formulario (name, email, message).
   * @returns {Promise<object>} Información sobre el envío.
   */
  async sendContactEmail(formData) {
    const { name, email, message } = formData;

    // 1. Configuración del correo (siguiendo el formato de Resend)
    const mailOptions = {
      // FROM: Debe ser un correo verificado en Resend
      from: `${name} <${SENDER_EMAIL}>`,

      // TO: El destinatario del formulario de contacto
      to: process.env.CONTACT_RECIPIENT_EMAIL,

      // REPLY_TO: Permite responder directamente al cliente original
      reply_to: email,

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
      // 2. Envío real usando la API de Resend
      const { data, error } = await resend.emails.send(mailOptions);

      if (error) {
        console.error('Error de Resend al enviar el correo:', error);
        throw new Error(error.message || 'Fallo al enviar correo con Resend.');
      }

      console.log('Correo enviado con éxito por Resend. ID:', data.id);
      return { success: true, messageId: data.id };
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}

export default new contactService();
