import React from "react";
import { X, Package, CalendarDays, ReceiptText } from "lucide-react";

const OrderDetailsModal = ({ open, onClose, purchase }) => {
    if (!open || !purchase) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl relative">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-slate-200">
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" strokeWidth={2} />
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-md flex items-center justify-center">
                            <ReceiptText className="w-5 h-5 text-white" strokeWidth={2} />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                                Orden #{purchase.id.slice(0, 8).toUpperCase()}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                                <CalendarDays className="w-3.5 h-3.5" strokeWidth={2} />
                                {new Date(purchase.fecha_compra).toLocaleDateString('es-MX', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Items List */}
                <div className="px-6 py-4 max-h-96 overflow-y-auto">
                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                        Productos ({purchase.detalles.length})
                    </h3>
                    
                    <div className="space-y-3">
                        {purchase.detalles.map((item) => (
                            <div 
                                key={item.id}
                                className="flex items-center gap-4 p-3 border border-slate-200 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <img
                                    src={item.productos?.imagen}
                                    className="w-14 h-14 rounded object-cover border border-slate-200 bg-white"
                                    alt={item.productos?.nombre}
                                />

                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-900 font-medium text-sm truncate">
                                        {item.productos?.nombre}
                                    </p>
                                    <p className="text-slate-600 text-xs font-medium flex items-center gap-1.5 mt-1">
                                        <Package className="w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
                                        Cantidad: {item.cantidad}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-900 tracking-tight">
                                        ${item.precio_unitario_aplicado.toFixed(2)}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        por unidad
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer with Total */}
                <div className="px-6 py-5 border-t border-slate-200 bg-slate-50">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                Total pagado
                            </p>
                            <span className="text-2xl font-bold text-slate-900 tracking-tight">
                                ${purchase.total_final.toFixed(2)}
                            </span>
                        </div>
                        
                        <button 
                            onClick={onClose}
                            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-md hover:bg-slate-800 transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsModal;