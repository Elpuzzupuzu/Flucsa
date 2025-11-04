import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    createQuotation, 
    clearQuotationError,
    resetQuotationUI 
} from '../../../../features/quotations/quotationSlice'; 
import { fetchCart } from '../../../../features/cart/cartSlice'; 


const CartFooter = ({ total }) => {
    const dispatch = useDispatch();
    
    // 1. Obtener estado de Redux de Cotizaciones
    const { loading: quotationLoading, error, list } = useSelector((state) => state.quotations); 
    
    // 🚨 CAMBIO 1: Obtener estado de Redux del Carrito
    const { loading: cartLoading } = useSelector((state) => state.cart); 
    
    const currentQuotation = list.length > 0 ? list[0] : null;

    // 🚨 CAMBIO 2: La carga general es true si CUALQUIERA de los dos thunks está pendiente
    const isLoading = quotationLoading || cartLoading; 
    const isFailed = !!error;
    const isSuccess = !quotationLoading && currentQuotation && !error; 
    // Usamos 'quotationLoading' aquí para que el éxito se marque inmediatamente después de la creación
    
    // 2. Función para disparar la cotización (Lógica sin cambios)
    const handleSolicitarCotizacion = () => {
        if (isFailed) {
            dispatch(clearQuotationError());
        }
        
        if (isLoading || total <= 0) return;
        
        dispatch(createQuotation()); 
    };

    // 3. Manejar el éxito y DISPARAR LA LIMPIEZA
    useEffect(() => {
        if (isSuccess) {
            
            // Retraso para que el usuario vea el mensaje de éxito.
            const timer = setTimeout(() => {
                
                // Despacha la limpieza de UI de cotización Y la recarga del carrito.
                // Durante esta recarga, 'cartLoading' será true y el botón se deshabilitará.
                dispatch(resetQuotationUI()); 
                dispatch(fetchCart()); 
                
            }, 3000); 

            return () => clearTimeout(timer); // Limpiar el timer

        }
    }, [isSuccess, currentQuotation, dispatch]); 
    
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
            
            {/* Mostrar Mini-Carga si está en Pending de cotización O de carrito */}
            {isLoading && !isFailed && (
                <div className="p-3 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
                    {/* El mensaje debe reflejar que el proceso aún está en curso (cotización o recarga) */}
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>{quotationLoading ? 'Procesando cotización...' : 'Actualizando carrito...'}</span>
                </div>
            )}
            
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
                // 🚨 CAMBIO 3: Ahora se deshabilita si CUALQUIER carga está activa, si el total es cero o si es éxito.
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
                    ? (quotationLoading ? 'Procesando Solicitud...' : 'Actualizando carrito...')
                    : isSuccess 
                    ? 'Cotización Exitosa'
                    : 'Solicitar Cotización'
                }
            </button>
        </div>
    );
};

export default CartFooter;