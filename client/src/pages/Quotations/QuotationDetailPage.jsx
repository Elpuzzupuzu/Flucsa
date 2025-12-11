// src/pages/quotations/QuotationDetailPage.jsx

import React from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';

// Hooks Modulares
import useQuotationData from './hooks/quotationHooks/useQuotationData'; 
import useQuotationActions from './hooks/quotationHooks/useQuotationActions';

// Componentes
import QuotationDetailsCard from './components/QuotationDetailsCard';
import QuotationEditModal from './components/QuoationEditModal';
import QuotationLoadingState from './components/loadingState/QuotationLoadingState'; // 

const QuotationDetailPage = () => {
    // 1. Obtener Datos y Estado de Carga
    const {
        id,
        currentUser,
        quotation,
        error,
        loading,
        isQuotationLoaded
    } = useQuotationData();

    // 2. Obtener Acciones y Manejadores
    const {
        isModalOpen,
        handleGoBack,
        handleCreateInvoice,
        handleOpenModal,
        handleCloseModal,
    } = useQuotationActions(quotation, currentUser);

    // 3. Manejo de Carga y Error (UI de Estado)
    if (!isQuotationLoaded || (error && !quotation)) {
        console.log(`⏳ Renderizando estado de carga o error para ID: ${id}`);
        // Utilizamos el componente dedicado para la UI de estado
        return <QuotationLoadingState error={error} onGoBack={handleGoBack} />;
    }

    // 4. Renderizado del Contenido Principal
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6 flex justify-between items-center">
                    {/* Botón Volver */}
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-all font-medium group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Volver a cotizaciones
                    </button>

                    <div className="flex gap-2">
                        {/* Botón Editar Cotización */}
                        <button
                            onClick={handleOpenModal}
                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                        >
                            <Edit3 className="inline w-4 h-4 mr-1" />
                            Editar Cotizacion
                        </button>

                        {/* Botón Generar Factura (Solo Admin y GENERADA) */}
                        {currentUser?.rol === "admin" && (
                            <button
                                onClick={handleCreateInvoice}
                                disabled={loading || quotation.estado_cotizacion !== "GENERADA"}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                            >
                                Generar Factura
                            </button>
                        )}
                    </div>
                </div>

                {/* Tarjeta de Detalles de la Cotización */}
                <QuotationDetailsCard 
                    key={quotation.id}
                    quotation={quotation}
                    onGoBack={handleGoBack}
                />

                {/* Modal de edición */}
                <QuotationEditModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    quotation={quotation}
                    // Nota: Asumiendo que QuotationEditModal consume updateQuotationItems internamente
                />

            </div>
        </div>
    );
};

export default QuotationDetailPage;