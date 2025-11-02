// En src/features/quotations/components/QuotationList.jsx

import React from 'react';
import QuotationRow from './QuotationRow';

/**
 * Componente presentacional que muestra una lista de cotizaciones en una tabla.
 * @param {Array} quotations - Lista de cotizaciones.
 * @param {boolean} isLoading - Estado de carga.
 * @param {function} onDelete - Handler para eliminar/cancelar una cotización.
 * @param {function} onViewDetails - Handler para ver los detalles.
 */
const QuotationList = ({ quotations, isLoading, onDelete, onViewDetails }) => {
    if (isLoading) {
        return <p>Cargando cotizaciones...</p>;
    }

    if (!quotations || quotations.length === 0) {
        return <p className="text-center mt-5">No hay cotizaciones registradas.</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Total Cotizado</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.map(quotation => (
                        <QuotationRow
                            key={quotation.id}
                            quotation={quotation}
                            onDelete={onDelete}
                            onViewDetails={onViewDetails}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationList;