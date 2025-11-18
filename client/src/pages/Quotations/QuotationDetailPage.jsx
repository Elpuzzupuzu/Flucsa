// En src/features/quotations/QuotationDetailPage.jsx

import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';
import QuotationDetailsCard from './components/QuotationDetailsCard';
import { fetchQuotationById } from '../../features/quotations/quotationSlice'; // 🔥 IMPORTANTE

const QuotationDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user);

    const quotation = useSelector(state =>
        state.quotations.list.find(q => q.id === id)
    );

    const loading = useSelector(state => state.quotations.loading);
    const error = useSelector(state => state.quotations.error);

    // 🟦 Logs para depurar
    useEffect(() => {
        console.log("🔍 ID recibido:", id);
        console.log("📦 Quotation en Redux:", quotation);
        console.log("⏳ loading:", loading);
        console.log("❌ error:", error);
    }, [id, quotation, loading, error]);

    // 🟩 Si no existe en Redux, cargar desde backend
    useEffect(() => {
        if (!quotation && !loading) {
            console.log("📡 Cotización no está en Redux → consultando backend...");
            dispatch(fetchQuotationById(id));
        }
    }, [dispatch, id, quotation, loading]);

    // ⬅ Botón para volver
    const handleGoBack = useCallback(() => {
        if (currentUser.user.rol === "admin") {
            navigate('/admin/quotations');
        } else {
            navigate('/cotizaciones');
        }
    }, [navigate, currentUser]);

    // 🟦 Cargando
    if (loading && !quotation) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600 font-medium">Cargando detalles de cotización...</p>
                </div>
            </div>
        );
    }

    // 🟥 Error o no encontrada
    if (!quotation && !loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-slate-200">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">Cotización no encontrada</h2>
                    <p className="text-slate-600 mb-6">
                        La cotización solicitada no existe o no se pudo cargar.
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

    // 🟩 Render principal
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
