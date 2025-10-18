// src/utils/profileUtils.js

/**
 * Función para obtener las iniciales del nombre de un usuario.
 * @param {string} name - El nombre completo del usuario.
 * @returns {string} Las iniciales del nombre (máximo 2).
 */
export const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    let initials = "";

    if (parts.length > 0) {
        initials += parts[0].charAt(0).toUpperCase();
    }
    if (parts.length > 1) {
        initials += parts[1].charAt(0).toUpperCase();
    } else if (initials.length === 1 && name.length > 1) {
        // Caso de un solo nombre largo, usa la segunda letra
        initials += name.charAt(1).toUpperCase();
    }

    return initials.substring(0, 2);
};