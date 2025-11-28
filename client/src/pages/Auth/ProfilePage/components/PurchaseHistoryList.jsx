import React, { useState } from "react";
import { CalendarDays, ReceiptText, ChevronRight, Package } from "lucide-react";
import OrderDetailsModal from "./OrderDetailsModal";

const PurchaseHistoryList = ({ history }) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const handleOpen = (purchase) => {
        setSelectedPurchase(purchase);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedPurchase(null);
    };

    if (!history || history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-16 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
                    <Package className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
                </div>
                <p className="text-slate-900 font-semibold text-base">Sin compras registradas</p>
                <p className="text-slate-500 text-sm mt-1.5">El historial de tus pedidos aparecerá aquí</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                {history.map((purchase, index) => (
                    <div
                        key={purchase.id}
                        className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                        onClick={() => handleOpen(purchase)}
                    >
                        <div className="p-5">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2.5">
                                        <div className="w-9 h-9 bg-slate-900 rounded-md flex items-center justify-center">
                                            <ReceiptText className="w-4.5 h-4.5 text-white" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                                                Orden #{purchase.id.slice(0, 8).toUpperCase()}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                                                Pedido {history.length - index} de {history.length}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-slate-600 ml-12">
                                        <CalendarDays className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                        <span className="font-medium">
                                            {new Date(purchase.fecha_compra).toLocaleDateString('es-MX', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 font-medium mb-1">Total</p>
                                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                                            ${purchase.total_final.toFixed(2)}
                                        </span>
                                    </div>
                                    
                                    <div className="w-8 h-8 bg-slate-50 rounded-md flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5 text-slate-400" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100" />
                        
                        <div className="px-5 py-3 bg-slate-50">
                            <p className="text-xs text-slate-600 font-medium">
                                Ver detalles de la compra
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <OrderDetailsModal 
                open={openModal}
                onClose={handleClose}
                purchase={selectedPurchase}
            />
        </>
    );
};

export default PurchaseHistoryList;