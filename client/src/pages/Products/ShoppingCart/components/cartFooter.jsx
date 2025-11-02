import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createQuotation, 
    clearQuotationError // 🚨 CORRECCIÓN: Usando el nombre de acción correcto
} from '../../../../features/quotations/quotationSlice'; 

const CartFooter = ({ total }) => {
    const dispatch = useDispatch();
    
    // 1. Obtener estado de Redux (usando 'loading', 'error' y 'list' como referencia a la data)
    const { loading, error, list } = useSelector((state) => state.quotations); 
    
    // Asumimos que la cotización recién creada se encuentra en la primera posición de la 'list'
    const currentQuotation = list.length > 0 ? list[0] : null;

    const isLoading = loading;
    const isFailed = !!error;
    // Consideramos éxito si ya tenemos una cotización en el estado
    const isSuccess = !loading && currentQuotation && !error; 

    // 2. Función para disparar la cotización
    const handleSolicitarCotizacion = () => {
        // Podríamos limpiar un error previo antes de la solicitud
        if (isFailed) {
            dispatch(clearQuotationError());
        }
        
        if (isLoading || total <= 0) return;
        
        dispatch(createQuotation()); 
    };

    // 3. Opcional: Manejar el éxito (p. ej., redirigir)
    useEffect(() => {
        if (isSuccess) {
            console.log(`Cotización creada: ${currentQuotation.id}`);
            // Lógica de redirección aquí si fuera necesario
        }
    }, [isSuccess, currentQuotation]);


    // ==========================================================
    // RENDERIZADO
    // ==========================================================
    return (
        <div className="border-t pt-4 mt-4 space-y-4 animate-slide-up">
            
            {/* ... Sección de Totales (sin cambios) ... */}
            <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Envío:</span>
                    <span className="font-medium text-green-600 animate-pulse">Gratis</span>
                </div>
                <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-blue-600 hover:scale-105 transition-transform">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* --- Mensajes de Estado --- */}
            {isFailed && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                    ❌ Error: {error.message || error}
                </div>
            )}
            {isSuccess && (
                 <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                    ✅ Cotización **#{currentQuotation.id.substring(0, 8)}** generada.
                </div>
            )}
            
            {/* --- Botón de Acción --- */}
            <button
                onClick={handleSolicitarCotizacion}
                // Deshabilitar si está cargando, si el total es cero o si ya tuvo éxito 
                disabled={isLoading || total <= 0 || isSuccess}
                className={`
                    w-full py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95
                    ${isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'}
                `}
            >
                {/* Texto del Botón basado en el estado */}
                {isLoading 
                    ? 'Procesando Solicitud...' 
                    : isSuccess 
                    ? 'Cotización Exitosa'
                    : 'Solicitar Cotización'
                }
            </button>
        </div>
    );
};

export default CartFooter;