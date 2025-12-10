import React, { useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Loader2 } from 'lucide-react';

import { fetchQuotationById } from '../../features/quotations/quotationSlice';
import { createFacturaFromQuotation } from '../../features/facturas/facturasSlice'; 
import QuotationDetailsCard from './components/QuotationDetailsCard';

const QuotationDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.user);
    const quotation = useSelector(state => state.quotations.currentQuotation);
    const { loading, error } = useSelector(state => state.quotations); 
    
    useEffect(() => {
        if (!quotation || quotation.id !== id) {
            dispatch(fetchQuotationById(id));
        }
    }, [dispatch, id, quotation]);

    const handleGoBack = useCallback(() => {
        if (currentUser.user.rol === "admin") {
            navigate('/admin/quotations');
        } else {
            navigate('/cotizaciones');
        }
    }, [navigate, currentUser]);

    const handleCreateInvoice = useCallback(() => {

        // -----------------------------
        // 🛑 Validación frontal agregada
        // -----------------------------

        if (!quotation) {
            alert("No se encontró la cotización.");
            return;
        }

        if (quotation.estado_cotizacion === "COMPLETADA") {
            alert("Esta cotización ya está COMPLETADA y no puede generar factura.");
            return;
        }

        if (quotation.estado_cotizacion !== "GENERADA") {
            alert(`No se puede generar factura cuando la cotización está en estado: ${quotation.estado_cotizacion}`);
            return;
        }

        if (!quotation.cotizaciones_items || quotation.cotizaciones_items.length === 0) {
            alert("La cotización no tiene ítems válidos para generar una factura.");
            return;
        }

        const itemsFactura = quotation.cotizaciones_items.map(item => ({
            producto_id: item.producto_id,
            nombre: item.nombre_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario_aplicado,
        }));

        const invoicePayload = {
            cotizacion_id: quotation.id, 
            usuario_id: quotation.usuario_id,
            total: quotation.total_cotizado,
            items: itemsFactura, 
        };
        
        console.log("🚚 Payload preparado para crear factura:", invoicePayload);

        dispatch(createFacturaFromQuotation(invoicePayload))
            .unwrap()
            .then(response => {
                // Ajuste según la nueva estructura de respuesta del backend
                const newFactura = response.data?.factura;
                if (!newFactura) {
                    alert("Error: No se recibió la factura del servidor.");
                    return;
                }
                alert(`Factura ${newFactura.id} creada exitosamente.`);
            })
            .catch(err => {
                alert(`Error al crear la factura: ${err.message || 'Ver consola para más detalles.'}`);
            });


    }, [dispatch, quotation]);

    if (!quotation || quotation.id !== id) {
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

    if (error && (!quotation || quotation.id !== id)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        Error al cargar la cotización
                    </h2>
                    <p className="text-slate-600 mb-6">{error}</p>
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-6 flex justify-between items-center">
                    <button
                        onClick={handleGoBack}
                        className="inline-flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-white rounded-lg transition-all font-medium group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Volver a cotizaciones
                    </button>

                    {/* Solo ADMIN y solo si estado = GENERADA */}
                    {currentUser?.user?.rol === "admin" && (
                        <button
                            onClick={handleCreateInvoice}
                            disabled={
                                loading ||
                                quotation.estado_cotizacion !== "GENERADA"
                            }
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Generar Factura
                        </button>
                    )}
                </div>

                <QuotationDetailsCard 
                    key={quotation.id}
                    quotation={quotation}
                    onGoBack={handleGoBack}
                />
            </div>
        </div>
    );
};

export default QuotationDetailPage;
