import React from 'react';
import { FileText } from 'lucide-react';

/**
 * Componente Presentacional: Muestra la tabla de cotizaciones y sus filas.
 */
const QuotationTable = ({ loading, allQuotationsCount, filteredQuotations, onViewDetails, onUpdateStatus }) => {
    
    // Función de utilidad extraída
    const getStatusColor = (status) => {
        const colors = {
            GENERADA: 'bg-amber-100 text-amber-800 border-amber-200',
            ACEPTADA: 'bg-green-100 text-green-800 border-green-200',
            COMPLETADA: 'bg-blue-100 text-blue-800 border-blue-200',
            RECHAZADA: 'bg-red-100 text-red-800 border-red-200',
            CANCELADA: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    // Función de utilidad para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        // Esto asume que el backend te da un string ISO (Tirando solo fecha)
        return new Date(dateString).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    };

    // Función de utilidad para formatear el total
    const formatCurrency = (amount) => {
        if (amount === null || amount === undefined) return 'N/A';
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN', // Asumiendo pesos mexicanos o tu moneda local
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <>
            {/* Results Count */}
            <div className="mb-4 text-sm text-gray-600">
                Mostrando <span className="font-semibold text-gray-900">{filteredQuotations.length}</span> de <span className="font-semibold text-gray-900">{allQuotationsCount}</span> cotizaciones
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <span className="ml-3 text-gray-600">Cargando cotizaciones...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredQuotations.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                                        <p className="text-lg font-medium">No se encontraron cotizaciones</p>
                                        <p className="text-sm mt-1">Intenta ajustar los filtros de búsqueda</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredQuotations.map((quotation) => {
                                    // Desestructurar o definir el objeto usuario para un código más limpio
                                    const user = quotation.usuario_id;
                                    const fullName = user ? `${user.nombre || ''} ${user.apellido || ''}`.trim() : 'Usuario Desconocido';

                                    return (
                                        <tr key={quotation.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="font-mono text-sm font-medium text-gray-900">{quotation.id.substring(0, 8) || 'N/A'}</span>
                                            </td>
                                            
                                            {/* 🎯 CAMBIO CLAVE AQUÍ: Acceso a través de usuario_id */}
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{fullName}</div>
                                                    <div className="text-sm text-gray-500">{user?.correo || 'Sin email'}</div>
                                                </div>
                                            </td>
                                            {/* FIN DEL CAMBIO CLAVE */}

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {/* Se usa la fecha de creación, ajustando el nombre de la columna si es necesario */}
                                                {formatDate(quotation.fecha_creacion)} 
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {/* Se asume 'total_cotizado' como el nombre de la columna del total */}
                                                    {formatCurrency(quotation.total_cotizado)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quotation.estado_cotizacion)}`}>
                                                    {quotation.estado_cotizacion}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => onViewDetails(quotation.id)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium mr-4 transition-colors"
                                                >
                                                    Ver detalles
                                                </button>
                                                <select
                                                    onChange={(e) => onUpdateStatus(quotation.id, e.target.value)}
                                                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-xs font-medium bg-white hover:bg-gray-50 transition-colors"
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Cambiar estado</option>
                                                    <option value="GENERADA">Generada</option>
                                                    <option value="ACEPTADA">Aceptada</option>
                                                    <option value="RECHAZADA">Rechazada</option>
                                                    <option value="COMPLETADA">Completada</option>
                                                    <option value="CANCELADA">Cancelada</option>
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default QuotationTable;