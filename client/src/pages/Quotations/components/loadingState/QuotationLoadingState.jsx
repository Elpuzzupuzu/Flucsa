// src/pages/quotations/components/QuotationLoadingState.jsx

import React from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';

const QuotationLoadingState = ({ error, onGoBack }) => {
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        Error al cargar la cotización
                    </h2>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <button
                        onClick={onGoBack}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a cotizaciones
                    </button>
                </div>
            </div>
        );
    }

    // Estado de carga (Loading)
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="text-center">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-slate-600 font-medium">
                    Cargando detalles de cotización...
                </p>
            </div>
        </div>
    );
};

export default QuotationLoadingState;