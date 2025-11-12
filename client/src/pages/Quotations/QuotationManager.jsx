import React, { useEffect, useCallback } from 'react'; // 💡 Importar useCallback
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    fetchQuotations, 
    createQuotation, 
    deleteQuotation,
} from '../../features/quotations/quotationSlice'; 
import QuotationsListPage from './QuotationsListPage'; 

import useNotification from '../../hooks/Notify/useNotification'; 

const QuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { 
        list: quotations, 
        loading, 
        error,
        // 💡 CAMBIO CLAVE 1: Extraer el objeto de paginación del estado de Redux
        pagination 
    } = useSelector(state => state.quotations); 

    const { notify } = useNotification(); 
    
    // 💡 SOLUCIÓN CLAVE: Usar useCallback para memoizar handleFetch
    const handleFetch = useCallback((params = { page: 1, pageSize: 10, search: '' }) => {
        console.log(`🔄 [Manager] Cargando cotizaciones con parámetros:`, params);
        dispatch(fetchQuotations(params));
    }, [dispatch]); // Dependencia: solo dispatch (que es estable).

    // 1. Cargar datos iniciales
    useEffect(() => {
        console.log("🔄 [Manager] Montando componente y cargando datos iniciales.");
        
        // 💡 CAMBIO CLAVE 2: Llamar a handleFetch
        handleFetch();

    }, [handleFetch]); // 💡 DEPENDENCIA CORREGIDA: Depende de handleFetch memoizado.

    // 2. Handler para generar nueva cotización
    const handleCreate = () => {
        dispatch(createQuotation())
            .unwrap()
            .then((newQuotation) => {
                notify(`Cotización #${newQuotation.id.substring(0, 8)} generada con éxito!`, 'success');
                navigate(`/cotizaciones/${newQuotation.id}`);
            })
            .catch((err) => {
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
                    // Recargar la página actual para rellenar el hueco
                    handleFetch({ page: pagination.currentPage, pageSize: pagination.pageSize }); 
                })
                .catch((err) => {
                    const errorMessage = err.message || err.error || 'No se pudo cancelar la cotización';
                    notify(`Error de permiso: ${errorMessage}`, 'error');
                });
        }
    };

    // 4. Handler para ver detalle (usa react-router-dom) - No necesita cambios
    const handleViewDetails = (id) => {
        navigate(`/cotizaciones/${id}`); 
    };

    // 5. Notificación de error - No necesita cambios
    useEffect(() => {
        if (error) {
            notify(`Error de carga: ${error.message || error}`, 'error');
        }
    }, [error, notify]);


    return (
        <QuotationsListPage
            quotations={quotations}
            isLoading={loading}
            // 💡 CAMBIO CLAVE 3: Pasar el objeto de paginación
            pagination={pagination} 
            // 💡 CAMBIO CLAVE 4: Pasar el handler memoizado
            onFetchData={handleFetch} 
            onCreate={handleCreate}
            onDelete={handleDelete}
            onViewDetails={handleViewDetails}
        />
    );
};

export default QuotationManager;