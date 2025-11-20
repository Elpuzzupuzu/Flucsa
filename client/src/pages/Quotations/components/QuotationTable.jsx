import React from 'react';
import { ChevronRight, DollarSign, Calendar, Zap, ClipboardList } from 'lucide-react'; // Nuevos iconos para las tarjetas

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

    // --- RENDERIZADO DE TABLA (ESCRITORIO: sm: y superiores) ---
    const renderTable = () => (
        <div className="hidden sm:block overflow-x-auto bg-white">
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
                        <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quotation.id.substring(0, 8)}...</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(quotation.fecha_creacion).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">${quotation.total_cotizado.toFixed(2) || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[quotation.estado_cotizacion]}`}>
                                    {quotation.estado_cotizacion}
                                </span>
                            </td>
                            {isAdmin && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {quotation.estado_cotizacion === 'GENERADA' && (
                                        <>
                                            <button 
                                                onClick={() => onUpdateStatus(quotation.id, 'ACEPTADA')}
                                                className="text-green-600 hover:text-green-900 text-xs"
                                            >
                                                Aceptar
                                            </button>
                                            <button 
                                                onClick={() => onUpdateStatus(quotation.id, 'RECHAZADA')}
                                                className="text-red-600 hover:text-red-900 text-xs"
                                            >
                                                Rechazar
                                            </button>
                                        </>
                                    )}
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button 
                                    onClick={() => onViewDetails(quotation.id)} 
                                    className="text-indigo-600 hover:text-indigo-900 text-sm"
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
    
    // --- RENDERIZADO DE TARJETAS (MÓVIL: hasta sm:) ---
    const renderCards = () => (
        <div className="sm:hidden space-y-4">
            {quotations.map(quotation => (
                <div 
                    key={quotation.id} 
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-3">
                        {/* ID y Estado */}
                        <div className="flex flex-col">
                            <h3 className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                <ClipboardList className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                {quotation.id.substring(0, 8)}...
                            </h3>
                            <span className={`mt-1 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_STYLES[quotation.estado_cotizacion]}`}>
                                {quotation.estado_cotizacion}
                            </span>
                        </div>
                        
                        {/* Botón de Detalle/Ver */}
                        <button 
                            onClick={() => onViewDetails(quotation.id)} 
                            className="text-indigo-600 hover:text-indigo-900 flex items-center font-medium text-sm"
                        >
                            Ver <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    {/* Detalles Adicionales */}
                    <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 border-t pt-3">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Fecha:</span> {new Date(quotation.fecha_creacion).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Total:</span> **${quotation.total_cotizado.toFixed(2) || 'N/A'}**
                        </div>
                    </div>
                    
                    {/* Acciones de Admin (Abajo en la tarjeta) */}
                    {isAdmin && quotation.estado_cotizacion === 'GENERADA' && (
                        <div className="mt-4 pt-3 border-t flex justify-end space-x-3">
                            <button 
                                onClick={() => onUpdateStatus(quotation.id, 'ACEPTADA')}
                                className="px-3 py-1 text-xs font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition-colors flex items-center"
                            >
                                <Zap className="w-3 h-3 mr-1" /> Aceptar
                            </button>
                            <button 
                                onClick={() => onUpdateStatus(quotation.id, 'RECHAZADA')}
                                className="px-3 py-1 text-xs font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition-colors"
                            >
                                Rechazar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="overflow-x-clip"> {/* clip previene que el overflow-x-auto de la tabla arruine el layout */}
            {renderCards()}
            {renderTable()}
        </div>
    );
};

export default QuotationTable