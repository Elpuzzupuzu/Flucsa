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
            <div className="bg-amber-50 border border-amber-300 rounded-md p-4 text-amber-800" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-sm">Cargando detalles de la cotización...</span>
                </div>
            </div>
        );
    }

    // Estado local de items editables
    const [editItems, setEditItems] = useState(
        quotation.cotizaciones_items?.map(i => ({ ...i })) || []
    );

    // Cada vez que cambie la cotización → reinicia items
    React.useEffect(() => {
        setEditItems(quotation.cotizaciones_items?.map(i => ({ ...i })) || []);
    }, [quotation?.id]);

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
        <div className="bg-white rounded-md border border-neutral-200 overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
            {/* Header profesional */}
            <div className="bg-neutral-800 px-6 py-5 border-b border-neutral-700">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-white text-xl font-semibold mb-1" style={{ letterSpacing: '-0.02em' }}>
                            Cotización #{quotation.id?.substring(0, 10) || "—"}
                        </h2>
                        <p className="text-neutral-400 text-sm font-normal">
                            Detalles completos de la cotización
                        </p>
                    </div>

                    <button
                        onClick={onGoBack}
                        className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150"
                        style={{ letterSpacing: '-0.01em' }}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                    </button>
                </div>
            </div>

            <div className="p-6">
                {/* Información del Cliente */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2" style={{ letterSpacing: '-0.01em' }}>
                        <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Información del Cliente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>Cliente</p>
                            <p className="text-neutral-900 font-medium text-sm">{fullName}</p>
                        </div>

                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>Correo Electrónico</p>
                            <p className="text-neutral-900 font-normal text-sm break-all">{userEmail}</p>
                        </div>

                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>ID Cliente</p>
                            <p className="text-neutral-900 font-mono text-xs">{quotation.usuario_id?.substring(0, 10) + "..." || "N/A"}</p>
                        </div>

                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>Fecha de Creación</p>
                            <p className="text-neutral-900 font-medium text-sm">{formatDate(quotation.fecha_creacion)}</p>
                        </div>

                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>ID Carrito Origen</p>
                            <p className="text-neutral-900 font-mono text-xs">{quotation.carrito_id_origen?.substring(0, 10) + "..." || "N/A"}</p>
                        </div>

                        <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                            <p className="text-xs font-medium text-neutral-500 uppercase mb-2" style={{ letterSpacing: '0.05em' }}>Estado</p>
                            <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-xs font-medium">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                                {quotation.estado_cotizacion || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Productos */}
                <div className="mb-8">
                    <h3 className="text-base font-semibold text-neutral-900 mb-4 flex items-center gap-2" style={{ letterSpacing: '-0.01em' }}>
                        <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Productos Cotizados
                    </h3>
                    
                    <QuotationItemsTable
                        editItems={editItems}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                        handleDelete={handleDelete}
                    />

                    {/* Botón guardar cambios */}
                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium text-white border transition-colors duration-150 ${
                                saving 
                                    ? "bg-neutral-400 border-neutral-400 cursor-not-allowed" 
                                    : "bg-emerald-600 hover:bg-emerald-700 border-emerald-700"
                            }`}
                            style={{ letterSpacing: '-0.01em' }}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-end">
                    <div className="bg-neutral-50 border border-neutral-300 rounded-md px-6 py-4">
                        <div className="text-right">
                            <p className="text-xs font-medium text-neutral-600 uppercase mb-1" style={{ letterSpacing: '0.05em' }}>
                                Total Cotizado
                            </p>
                            <p className="text-3xl font-semibold text-neutral-900" style={{ letterSpacing: '-0.02em' }}>
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