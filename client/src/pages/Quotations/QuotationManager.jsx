import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    fetchQuotations, 
    createQuotation, 
    deleteQuotation 
} from '../../features/quotations/quotationSlice'; // Ajusta la ruta si es necesario
import QuotationsListPage from './QuotationsListPage'; 

// 🚨 CORRECCIÓN: IMPORTAR EL HOOK DE NOTIFICACIÓN
import useNotification from '../../hooks/Notify/useNotification'; 

/**
 * Contenedor principal que gestiona el estado de las cotizaciones.
 * Se encarga de las llamadas a la API (Thunks) y de pasar los datos
 * y handlers a la vista presentacional (QuotationsListPage).
 */
const QuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { 
        list: quotations, 
        loading, 
        error 
    } = useSelector(state => state.quotations);

    // Obtener el hook de notificación para mensajes específicos
    const { notify } = useNotification(); // <--- Aquí ya está definido
    
    // 1. Cargar datos al inicio (cuando se monta la página)
    useEffect(() => {
        // Solo cargar si la lista está vacía o si quieres recargar siempre
        if (quotations.length === 0) { 
            dispatch(fetchQuotations());
        }
    }, [dispatch, quotations.length]); // Añadir dependency 'quotations.length' para evitar warnings/re-renders innecesarios

    // 2. Handler para generar nueva cotización
    const handleCreate = () => {
        dispatch(createQuotation())
            .unwrap()
            .then((newQuotation) => {
                notify(`Cotización #${newQuotation.id.substring(0, 8)} generada con éxito!`, 'success');
                // Opcional: Navegar inmediatamente al detalle de la nueva cotización
                navigate(`/cotizaciones/${newQuotation.id}`);
            })
            .catch((err) => {
                // El error ya es capturado por ReduxToast, pero podemos personalizarlo aquí
                // Usamos el mensaje del error devuelto por el thunk, o un fallback genérico.
                const errorMessage = err.message || err.error || 'Verifica tu carrito';
                notify(`Fallo al generar cotización: ${errorMessage}`, 'error');
            });
    };

    // 3. Handler para eliminar/cancelar 
    const handleDelete = (id) => {
        if (window.confirm("¿Confirmas la cancelación de esta cotización? Esta acción no se puede revertir fácilmente.")) {
            dispatch(deleteQuotation(id))
                .unwrap()
                .then(() => {
                    notify(`Cotización ${id.substring(0, 8)} cancelada.`, 'warning');
                })
                .catch((err) => {
                    const errorMessage = err.message || err.error || 'No se pudo cancelar la cotización';
                    notify(`Error de permiso: ${errorMessage}`, 'error');
                });
        }
    };

    // 4. Handler para ver detalle (usa react-router-dom)
    const handleViewDetails = (id) => {
        navigate(`/cotizaciones/${id}`); 
    };

    // Puedes manejar el error visiblemente aquí si no quieres depender solo de ReduxToast.
    if (error) {
        // Podríamos mostrar una alerta o un componente de error específico
        // return <div className="alert alert-danger text-center mt-5">Error: {error}</div>; 
    }

    return (
        <QuotationsListPage
            quotations={quotations}
            isLoading={loading}
            onCreate={handleCreate}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
        />
    );
};

export default QuotationManager;