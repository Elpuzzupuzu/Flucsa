import React from 'react';
import { Plus, FileText } from 'lucide-react';
import QuotationList from './components/QuotationList';

/**
 * Componente de la página que organiza el listado de cotizaciones.
 * Este actúa como el componente de vista, recibiendo handlers del Manager/Contenedor.
 */
const QuotationsListPage = ({ quotations, isLoading, onCreate, onDelete, onViewDetails }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Mis Cotizaciones</h1>
                                <p className="text-slate-600 text-sm mt-1">
                                    Gestiona y visualiza todas tus cotizaciones
                                </p>
                            </div>
                        </div>
                        
                        {/* <button 
                            onClick={onCreate}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg group"
                        >
                            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                            <span>Nueva Cotización</span>
                        </button> */}
                    </div>
                </header>
                
                {/* Main Content Card */}
                <section className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <QuotationList
                            quotations={quotations}
                            isLoading={isLoading}
                            onDelete={onDelete}
                            onViewDetails={onViewDetails}
                        />
                    </div>
                </section>

                {/* Footer Info */}
                <div className="mt-6 text-center text-slate-500 text-sm">
                    {quotations && quotations.length > 0 && (
                        <p>Mostrando {quotations.length} {quotations.length === 1 ? 'cotización' : 'cotizaciones'}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuotationsListPage;