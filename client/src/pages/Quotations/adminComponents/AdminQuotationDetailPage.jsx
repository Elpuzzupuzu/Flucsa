import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import QuotationDetailsCard from './components/QuotationDetailsCard';
import { fetchQuotationById } from '../../store/quotationSlice';

const QuotationDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const quotation = useSelector(state => state.quotations.selectedQuotation);
    const loading = useSelector(state => state.quotations.loading);
    const error = useSelector(state => state.quotations.error);

    // LOGS IMPORTANTES
    console.log("📌 URL ID recibido:", id);
    console.log("📌 Estado actual loading:", loading);
    console.log("📌 Estado actual error:", error);
    console.log("📌 Cotización seleccionada:", quotation);

    // --------------------------
    // FETCH AUTOMÁTICO POR ID
    // --------------------------
    useEffect(() => {
        console.log("🔄 useEffect ejecutado con ID:", id);

        if (id) {
            console.log("🚀 Dispatch → fetchQuotationById:", id);
            dispatch(fetchQuotationById(id));
        } else {
            console.log("❌ No se encontró ID en la URL");
        }
    }, [dispatch, id]);

    const handleGoBack = useCallback(() => {
        navigate('/admin/quotations');
    }, [navigate]);

    // LOADING
    if (loading) {
        console.log("⏳ Renderizando loading...");
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
    }

    // ERROR O SIN DATA
    if (error || !quotation) {
        console.log("❗ Renderizando error o falta de data...");
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-slate-200">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        Cotización no encontrada
                    </h2>
                    <p className="text-slate-600 mb-6">
                        {error || "No se pudo cargar la cotización."}
                    </p>
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver a cotizaciones
                    </button>
                </div>
            </div>
        );
    }

    // RENDER DETALLE
    console.log("✅ Renderizando detalle con data:", quotation);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-all font-medium group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Volver a cotizaciones
                    </button>
                </div>

                <QuotationDetailsCard
                    quotation={quotation}
                    onGoBack={handleGoBack}
                />
            </div>
        </div>
    );
};

export default QuotationDetailPage;
