import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateQuotationItems, fetchQuotationById } from "../../../features/quotations/quotationSlice";

// Importaciones modulares
import { formatDate, formatCurrency } from "../../../components/utils/formatters"; 
import QuotationItemsTable from "./QuotationItemsTable";

const QuotationDetailsCard = ({ quotation, onGoBack }) => {

    const dispatch = useDispatch();
    const [saving, setSaving] = useState(false);

    if (!quotation) {
        return (
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-5 text-amber-800">
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Cargando detalles de la cotización...</span>
                </div>
            </div>
        );
    }

    // Estado local de items editables
    const [editItems, setEditItems] = useState(
        quotation.cotizaciones_items?.map(i => ({ ...i })) || []
    );

    // === Funciones de edición (Manejadores de estado) ===
    const handleIncrease = (index) => {
        const updated = [...editItems];
        updated[index].cantidad += 1;
        setEditItems(updated);
    };

    const handleDecrease = (index) => {
        const updated = [...editItems];
        if (updated[index].cantidad > 1) {
            updated[index].cantidad -= 1;
        }
        setEditItems(updated);
    };

    const handleDelete = (index) => {
        const updated = editItems.filter((_, i) => i !== index);
        setEditItems(updated);
    };

    // Función de guardado de Redux
    const handleSave = async () => {
        setSaving(true);

        const result = await dispatch(updateQuotationItems({
            id: quotation.id,
            items: editItems.map(i => ({
                id: i.id,
                producto_id: i.producto_id,
                cantidad: i.cantidad
            }))
        }));

        // Si actualizó correctamente → recargar estado desde backend
        if (updateQuotationItems.fulfilled.match(result)) {
            await dispatch(fetchQuotationById(quotation.id));
        }

        setSaving(false);
    };
    // === FIN DE FUNCIONES DE EDICIÓN ===

    const user = quotation.usuario ?? {};
    const fullName =
        user.nombre && user.apellido
            ? `${user.nombre} ${user.apellido}`
            : user.nombre || "Usuario Desconocido";
    const userEmail = user.correo || "N/A";

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header con gradiente mejorado */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-8 py-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-2xl font-bold tracking-tight mb-1">
                            Cotización #{quotation.id?.substring(0, 10) || "—"}
                        </h2>
                        <p className="text-blue-100 text-sm font-medium">
                            Detalles completos de la cotización
                        </p>
                    </div>

                    <button
                        onClick={onGoBack}
                        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-lg font-medium transition-all duration-200 border border-white/20"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                </div>
            </div>

            <div className="p-8">
                {/* Información del Cliente - Grid mejorado */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Información del Cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Cliente</p>
                            <p className="text-gray-900 font-semibold text-base">{fullName}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Correo Electrónico</p>
                            <p className="text-gray-900 font-medium text-base break-all">{userEmail}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ID Cliente</p>
                            <p className="text-gray-900 font-mono text-sm">{quotation.usuario_id?.substring(0, 10) + "..." || "N/A"}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Fecha de Creación</p>
                            <p className="text-gray-900 font-semibold text-base">{formatDate(quotation.fecha_creacion)}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">ID Carrito Origen</p>
                            <p className="text-gray-900 font-mono text-sm">{quotation.carrito_id_origen?.substring(0, 10) + "..." || "N/A"}</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Estado</p>
                            <span className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                {quotation.estado_cotizacion || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Productos */}
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Productos Cotizados
                    </h3>
                    
                    <QuotationItemsTable
                        editItems={editItems}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleDelete={handleDelete}
                    />

                    {/* Botón guardar cambios mejorado */}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-200 ${
                                saving 
                                    ? "bg-gray-400 cursor-not-allowed" 
                                    : "bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5"
                            }`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Total - Card mejorado */}
                <div className="flex justify-end">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl px-8 py-6 shadow-md">
                        <div className="text-right">
                            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                                Total Cotizado
                            </p>
                            <p className="text-4xl font-bold text-green-700 tracking-tight">
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