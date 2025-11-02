// En src/features/quotations/components/QuotationRow.jsx
import React from 'react';

/**
 * Componente presentacional para mostrar una sola fila de cotización.
 */
const QuotationRow = ({ quotation, onDelete, onViewDetails }) => {
    // Función de ayuda para formatear la fecha (asumiendo formato ISO en 'fecha_creacion')
    const formatDate = (isoDate) => {
        if (!isoDate) return 'N/A';
        return new Date(isoDate).toLocaleDateString('es-ES', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });
    };

    // Función de ayuda para formatear la moneda
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { 
            style: 'currency', currency: 'USD' // Ajusta la moneda si es necesario
        }).format(amount || 0);
    };

    return (
        <tr>
            <td>{quotation.id.substring(0, 8)}...</td> {/* Mostrar ID truncado */}
            <td>{formatDate(quotation.fecha_creacion)}</td>
            <td>{formatCurrency(quotation.total_cotizado)}</td>
            <td>
                <span className={`badge ${getStatusClass(quotation.estado_cotizacion)}`}>
                    {quotation.estado_cotizacion}
                </span>
            </td>
            <td>
                <button 
                    className="btn btn-sm btn-info me-2" 
                    onClick={() => onViewDetails(quotation.id)}
                    title="Ver Detalles"
                >
                    Detalle
                </button>
                <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => onDelete(quotation.id)}
                    disabled={quotation.estado_cotizacion === 'CANCELADA'} // Ejemplo de lógica simple
                    title="Eliminar o Cancelar"
                >
                    {quotation.estado_cotizacion === 'GENERADA' ? 'Cancelar' : 'Eliminar'}
                </button>
            </td>
        </tr>
    );
};

// Función simple para determinar la clase CSS del estado (puedes mover esto a un helper)
const getStatusClass = (status) => {
    switch (status) {
        case 'GENERADA':
            return 'bg-warning text-dark';
        case 'ACEPTADA':
            return 'bg-success';
        case 'RECHAZADA':
            return 'bg-danger';
        case 'CANCELADA':
            return 'bg-secondary';
        default:
            return 'bg-primary';
    }
};

export default QuotationRow;