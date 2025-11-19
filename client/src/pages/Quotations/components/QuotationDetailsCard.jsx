import React from 'react';

// Formato de fecha
const formatDate = (isoDate) => {
    if (!isoDate) return 'N/A';
    return new Date(isoDate).toLocaleString('es-ES', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

// Formato de moneda
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', { 
        style: 'currency', currency: 'USD'
    }).format(amount || 0);
};

const QuotationDetailsCard = ({ quotation, onGoBack }) => {
    if (!quotation) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                Cargando detalles de la cotización...
            </div>
        );
    }

    const items = quotation.cotizaciones_items ?? [];
    const user = quotation.usuario ?? {};
    const fullName =
        user.nombre && user.apellido
            ? `${user.nombre} ${user.apellido}`
            : user.nombre || "Usuario Desconocido";
    const userEmail = user.correo || "N/A";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h3 className="text-white text-xl font-semibold">
                    Detalles de la Cotización #{quotation.id?.substring(0, 10) || "—"}
                </h3>
            </div>

            <div className="p-6">
                {/* Info Cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">ID Origen Carrito</p>
                        <p className="text-gray-900 font-medium">
                            {quotation.carrito_id_origen?.substring(0, 10) + "..." || "N/A"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Fecha de Creación</p>
                        <p className="text-gray-900 font-medium">{formatDate(quotation.fecha_creacion)}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">ID Cliente</p>
                        <p className="text-gray-900 font-medium">{quotation.usuario_id?.substring(0, 10) + "..." || "N/A"}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Cliente</p>
                        <p className="text-gray-900 font-medium">{fullName}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 mb-1">Correo</p>
                        <p className="text-gray-900 font-medium">{userEmail}</p>
                    </div>
                </div>

                {/* Estado */}
                <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-1">Estado</p>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {quotation.estado_cotizacion || "N/A"}
                    </span>
                </div>

                {/* Productos */}
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Productos Cotizados ({items.length})
                    </h4>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Producto</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Precio Unitario</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Cantidad</th>
                                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-gray-900 flex items-center gap-3">
                                            {item.imagen_producto ? (
                                                <img 
                                                    src={item.imagen_producto}
                                                    alt={item.nombre_producto || "Producto"}
                                                    className="w-12 h-12 rounded object-cover border"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-500 text-xs border">
                                                    N/A
                                                </div>
                                            )}
                                            <span>{item.nombre_producto || "Producto sin nombre"}</span>
                                        </td>

                                        <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(item.precio_unitario)}</td>
                                        <td className="py-3 px-4 text-right text-gray-700">{item.cantidad || 0}</td>
                                        <td className="py-3 px-4 text-right text-gray-900 font-medium">
                                            {formatCurrency((item.precio_unitario || 0) * (item.cantidad || 0))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-end">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg px-6 py-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-600 mb-1">Total Cotizado</p>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(quotation.total_cotizado)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationDetailsCard;
