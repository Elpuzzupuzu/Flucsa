/**
 * @fileoverview Funciones de utilidad para formatear fechas y monedas.
 */

// Formato de fecha: '25 dic. 2025, 10:30'
export const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    // Se usa 'es-ES' como locale y 'short' para el mes (dic.)
    return new Date(isoDate).toLocaleString('es-ES', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

// Formato de moneda: '$1.234,56'
export const formatCurrency = (amount) => {
    // Se usa 'es-ES' y 'USD' para el formato de moneda.
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', currency: 'USD'
    }).format(amount || 0);
};