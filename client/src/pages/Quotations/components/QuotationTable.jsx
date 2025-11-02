import React from 'react';

// Mapeo simple de estados a estilos
const STATUS_STYLES = {
    'GENERADA': 'bg-blue-100 text-blue-800',
    'ACEPTADA': 'bg-green-100 text-green-800',
    'RECHAZADA': 'bg-red-100 text-red-800',
    'COMPLETADA': 'bg-purple-100 text-purple-800',
    'CANCELADA': 'bg-yellow-100 text-yellow-800',
};

const QuotationTable = ({ quotations, isLoading, onUpdateStatus, onViewDetails, isAdmin }) => {
    if (isLoading) {
        return <div className="text-center py-10">Cargando cotizaciones...</div>;
    }
    
    if (quotations.length === 0) {
        return <div className="text-center py-10 text-gray-500">No hay cotizaciones para mostrar con el filtro actual.</div>;
    }

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                        {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones Admin</th>}
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Detalle</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {quotations.map(quotation => (
                        <tr key={quotation.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quotation.id.substring(0, 8)}...</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(quotation.fecha_creacion).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${quotation.total_cotizado.toFixed(2) || 'N/A'}</td>
                            
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[quotation.estado_cotizacion]}`}>
                                    {quotation.estado_cotizacion}
                                </span>
                            </td>

                            {isAdmin && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {quotation.estado_cotizacion === 'GENERADA' && (
                                        <>
                                            <button 
                                                onClick={() => onUpdateStatus(quotation.id, 'ACEPTADA')}
                                                className="text-green-600 hover:text-green-900 mr-2"
                                            >
                                                Aceptar
                                            </button>
                                            <button 
                                                onClick={() => onUpdateStatus(quotation.id, 'RECHAZADA')}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Rechazar
                                            </button>
                                        </>
                                    )}
                                    {/* Aquí podrías añadir más lógica de estados (ej. Marcar como COMPLETADA) */}
                                </td>
                            )}

                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => onViewDetails(quotation.id)} 
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuotationTable;