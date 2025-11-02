// En src/features/quotations/components/QuotationDetailsCard.jsx

import React from 'react';

// Función de ayuda para formatear la fecha
const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleString('es-ES', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

// Función de ayuda para formatear la moneda
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', currency: 'USD' // Ajusta la moneda si es necesario
    }).format(amount || 0);
};

/**
 * Componente presentacional que muestra los detalles de una cotización, incluyendo sus ítems.
 * @param {object} quotation - El objeto de cotización completo con cotizaciones_items anidados.
 */
const QuotationDetailsCard = ({ quotation }) => {
    if (!quotation) {
        return <div className="alert alert-warning">No se encontraron detalles de la cotización.</div>;
    }

    const items = quotation.cotizaciones_items || [];

    return (
        <div className="card shadow-sm p-4">
            <h3 className="card-title text-primary mb-4">Detalles de la Cotización #{quotation.id.substring(0, 10)}</h3>
            
            {/* 1. SECCIÓN DE CABECERA (Meta-Data) */}
            <div className="row mb-4 border-bottom pb-3">
                <div className="col-md-4">
                    <p><strong>ID Origen Carrito:</strong> {quotation.carrito_id_origen.substring(0, 10)}...</p>
                </div>
                <div className="col-md-4">
                    <p><strong>Fecha de Creación:</strong> {formatDate(quotation.fecha_creacion)}</p>
                </div>
                <div className="col-md-4">
                    <p><strong>Usuario ID:</strong> {quotation.usuario_id.substring(0, 10)}...</p>
                </div>
                <div className="col-md-4">
                    <p><strong>Estado:</strong> <span className={`badge bg-info text-dark`}>{quotation.estado_cotizacion}</span></p>
                </div>
            </div>

            {/* 2. SECCIÓN DE ÍTEMS */}
            <h4 className="mb-3">Productos Cotizados ({items.length})</h4>
            <div className="table-responsive mb-4">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className="text-end">Precio Unitario</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.nombre_producto}</td>
                                <td className="text-end">{formatCurrency(item.precio_unitario)}</td>
                                <td className="text-end">{item.cantidad}</td>
                                <td className="text-end">{formatCurrency(item.precio_unitario * item.cantidad)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 3. SECCIÓN DE TOTALES */}
            <div className="d-flex justify-content-end">
                <div className="border p-3 bg-light rounded text-end">
                    <h5>Total Cotizado: <span className="text-success fw-bold">{formatCurrency(quotation.total_cotizado)}</span></h5>
                </div>
            </div>

            {/* Opcional: Botones de Acción para Admin/Usuario */}
            <div className="mt-4 text-end">
                {/* Por ejemplo, un botón para que el usuario cancele (si está GENERADA) */}
                {/* <button className="btn btn-danger me-2" onClick={handleCancel}>Cancelar Cotización</button> */}
                
                {/* Por ejemplo, botones para que el admin cambie el estado */}
                {/* <button className="btn btn-success" onClick={handleAccept}>Aceptar</button> */}
            </div>

        </div>
    );
};

export default QuotationDetailsCard;