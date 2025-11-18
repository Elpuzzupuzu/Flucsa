import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchQuotations, updateQuotationStatus } from '../../features/quotations/quotationSlice';
import useNotification from '../../hooks/Notify/useNotification';
import { FileText } from 'lucide-react';

// Importar los nuevos subcomponentes
import QuotationStats from './adminComponents/QuotationStats';
import QuotationFilters from './adminComponents/QuotationFilters';
import QuotationTable from './adminComponents/QuotationTable';
import ErrorDisplay from './adminComponents/ErrorDisplay';

/**
 * Componente Contenedor de Administración de Cotizaciones
 * Se encarga de la lógica (data fetching, filtros, Redux, manejo de eventos y paginación).
 */
const AdminQuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify } = useNotification();
    
    // 1. Estado de Redux
    const { 
        list: quotations, 
        loading, 
        error, 
        pagination
    } = useSelector(state => state.quotations);

    // **********************************************
    // Mantenemos este log para debug
    useEffect(() => {
        // console.log('Datos de Redux - Cotizaciones:', { quotations, loading, error, pagination });
    }, [quotations, loading, error, pagination]); 
    // **********************************************

    // 2. Estado Local (Filtros y Paginación)
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Control local de la página activa

    // 💡 NUEVO HANDLER CORREGIDO: Construye `params` condicionalmente
    const handleFetch = useCallback(({ page, status, search }) => {
        // 1. Definir los parámetros base
        const params = {
            page: page || 1,
            pageSize: pagination.pageSize || 10,
        };
        
        // 2. Añadir 'status' solo si NO es 'ALL' y tiene un valor
        if (status && status !== 'ALL') {
            params.status = status;
        }

        // 3. Añadir 'search' solo si tiene un valor real (no vacío o undefined)
        if (search && search.trim() !== '') {
            params.search = search;
        }

        // console.log(`🔄 [Manager] Cargando cotizaciones con parámetros:`, params);
        dispatch(fetchQuotations(params));
    }, [dispatch, pagination.pageSize]); 

        // useEffect(() => {
        //     console.log("pruebas de la cotizacion:", quotations);
        // }, [quotations]);

                

    // 3. Efecto de Carga Inicial
    useEffect(() => {
        // Carga inicial usando los estados locales (ALL, '', Página 1)
        handleFetch({ page: currentPage, status: filterStatus, search: searchTerm });
    }, [handleFetch]); 

    // 💡 EFECTO: Sincronizar la llamada a fetch cuando cambian los filtros
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            // Resetear a la página 1 cuando se cambia el filtro o el término de búsqueda
            setCurrentPage(1); 
            // handleFetch limpiará los valores no deseados (ej. search vacío)
            handleFetch({ page: 1, status: filterStatus, search: searchTerm });
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [filterStatus, searchTerm, handleFetch]); 
    
    // 4. Estadísticas Calculadas
    const stats = useMemo(() => {
        return {
            total: pagination.totalItems, // Usamos el total global del backend
            // Los siguientes subtotales se calculan sobre la página actual, lo cual es menos preciso pero mantiene la estructura.
            generadas: quotations.filter(q => q.estado_cotizacion === 'GENERADA').length,
            aceptadas: quotations.filter(q => q.estado_cotizacion === 'ACEPTADA').length,
            completadas: quotations.filter(q => q.estado_cotizacion === 'COMPLETADA').length,
        };
    }, [quotations, pagination.totalItems]);


    // 5. Lógica de Cambio de Página
    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
        handleFetch({ page: newPage, status: filterStatus, search: searchTerm });
    }, [handleFetch, filterStatus, searchTerm]);


    // 6. Handlers de Eventos
    const handleUpdateStatus = useCallback((id, newStatus) => {
        if (!window.confirm(`¿Seguro que deseas cambiar el estado de la cotización ${id.substring(0, 8)} a ${newStatus}?`)) {
            return;
        }
        
        dispatch(updateQuotationStatus({ id, estado: newStatus }))
            .unwrap()
            .then(() => {
                notify(`Estado de cotización ${id.substring(0, 8)} actualizado a ${newStatus}.`, 'success');
                // Forzar recarga de la página actual 
                handleFetch({ page: currentPage, status: filterStatus, search: searchTerm });
            })
            .catch((err) => {
                notify(`Fallo al actualizar estado: ${err.message || 'Error de API'}`, 'error');
            });
    }, [dispatch, notify, handleFetch, currentPage, filterStatus, searchTerm]);

    const handleViewDetails = useCallback((id) => {
        navigate(`/cotizaciones/${id}`);
    }, [navigate]);

    const handleClearFilters = useCallback(() => {
        setFilterStatus('ALL');
        setSearchTerm('');
        setCurrentPage(1); // Resetear página al limpiar filtros
    }, []);

    // 7. Manejo de Errores (Renderiza el componente de error si falla)
    if (error) {
        return <ErrorDisplay error={error} />;
    }
    
    // 8. Renderizado del Layout y Subcomponentes Presentacionales
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Administración de Cotizaciones</h1>
                                <p className="text-sm text-gray-500 mt-1">Gestiona y monitorea todas las cotizaciones del sistema</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* 📊 Tarjetas de Estadísticas */}
                <QuotationStats stats={stats} />

                {/* 🔍 Controles de Filtrado */}
                <QuotationFilters 
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onClearFilters={handleClearFilters}
                />
                
                {/* 📋 Tabla de Cotizaciones */}
                <QuotationTable
                    loading={loading}
                    quotations={quotations} 
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onViewDetails={handleViewDetails}
                    onUpdateStatus={handleUpdateStatus}
                />

            </div>
        </div>
    );
};

export default AdminQuotationManager;