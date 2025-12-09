import React from 'react';
import { formatCurrency } from '../../../components/utils/formatters';

const QuotationItemsTable = ({ 
    editItems, 
    handleIncrease, 
    handleDecrease, 
    handleDelete 
}) => {

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {/* Header de la tabla */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Productos
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                        {editItems.length} {editItems.length === 1 ? 'producto' : 'productos'}
                    </span>
                </div>
            </div>

            {/* Tabla con scroll */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Encabezados */}
                    <thead>
                        <tr className="bg-gray-50 border-b-2 border-gray-200">
                            <th className="text-left py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Producto
                            </th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Precio Unit.
                            </th>
                            <th className="text-center py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Cantidad
                            </th>
                            <th className="text-right py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Subtotal
                            </th>
                            <th className="text-center py-4 px-6 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="bg-white divide-y divide-gray-100">
                        {editItems.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-12 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">No hay productos en esta cotización</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            editItems.map((item, index) => (
                                <tr 
                                    key={index} 
                                    className="hover:bg-blue-50/50 transition-colors duration-150"
                                >
                                    {/* Nombre + imagen */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            {item.imagen_producto ? (
                                                <img 
                                                    src={item.imagen_producto}
                                                    alt={item.nombre_producto || "Producto"}
                                                    className="w-14 h-14 rounded-lg object-cover border-2 border-gray-200 shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-200 shadow-sm">
                                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-gray-900 font-semibold text-sm leading-tight">
                                                    {item.nombre_producto || "Producto sin nombre"}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    ID: {item.producto_id?.substring(0, 8) || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Precio unitario */}
                                    <td className="py-4 px-6 text-right">
                                        <span className="text-gray-900 font-semibold text-base">
                                            {formatCurrency(item.precio_unitario_aplicado)}
                                        </span>
                                    </td>

                                    {/* Cantidad con controles */}
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => handleDecrease(index)}
                                                disabled={item.cantidad <= 1}
                                                className={`w-8 h-8 rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-200 ${
                                                    item.cantidad <= 1
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md'
                                                }`}
                                            >
                                                −
                                            </button>
                                            <span className="w-12 text-center font-bold text-gray-900 text-base">
                                                {item.cantidad}
                                            </span>
                                            <button
                                                onClick={() => handleIncrease(index)}
                                                className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 hover:shadow-md font-bold text-lg flex items-center justify-center transition-all duration-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    {/* Subtotal */}
                                    <td className="py-4 px-6 text-right">
                                        <span className="text-gray-900 font-bold text-base">
                                            {formatCurrency((item.precio_unitario_aplicado || 0) * (item.cantidad || 0))}
                                        </span>
                                    </td>

                                    {/* Acciones - Eliminar */}
                                    <td className="py-4 px-6 text-center">
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 hover:shadow-md font-semibold text-sm transition-all duration-200"
                                            title="Eliminar producto"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuotationItemsTable;