import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchQuotations, updateQuotationStatus } from '../../features/quotations/quotationSlice';
import useNotification from '../../hooks/Notify/useNotification';
import { FileText } from 'lucide-react';

// Subcomponentes presentacionales
import QuotationStats from './adminComponents/QuotationStats';
import QuotationFilters from './adminComponents/QuotationFilters';
import QuotationTable from './adminComponents/QuotationTable';
import ErrorDisplay from './adminComponents/ErrorDisplay';

/**
 * Componente padre encargado de:
 * - Data fetching
 * - Filtros
 * - Paginación
 * - Eventos
 * - Lógica empresarial
 */
const AdminQuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify } = useNotification();
    
    // Estado desde Redux
    const { 
        list: quotations, 
        loading, 
        error, 
        pagination
    } = useSelector(state => state.quotations);

    // Estados locales
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * Handler principal para cargar cotizaciones
     */
    const handleFetch = useCallback(({ page, status, search }) => {
        const params = {
            page: page || 1,
            pageSize: pagination.pageSize || 10,
        };
        
        if (status && status !== 'ALL') params.status = status;
        if (search && search.trim() !== '') params.search = search;

        dispatch(fetchQuotations(params));
    }, [dispatch, pagination.pageSize]);

    /**
     * Efecto inicial
     */
    useEffect(() => {
        handleFetch({ page: currentPage, status: filterStatus, search: searchTerm });
    }, [handleFetch]);

    /**
     * Efecto: filtros + search
     */
    useEffect(() => {
        const delay = setTimeout(() => {
            setCurrentPage(1);
            handleFetch({ page: 1, status: filterStatus, search: searchTerm });
        }, 300);

        return () => clearTimeout(delay);
    }, [filterStatus, searchTerm, handleFetch]);

    /**
     * Cálculo de estadísticas
     */
    const stats = useMemo(() => ({
        total: pagination.totalItems,
        generadas: quotations.filter(q => q.estado_cotizacion === 'GENERADA').length,
        aceptadas: quotations.filter(q => q.estado_cotizacion === 'ACEPTADA').length,
        completadas: quotations.filter(q => q.estado_cotizacion === 'COMPLETADA').length,
    }), [quotations, pagination.totalItems]);

    /**
     * Cambio de página
     */
    const handlePageChange = useCallback((newPage) => {
        setCurrentPage(newPage);
        handleFetch({ page: newPage, status: filterStatus, search: searchTerm });
    }, [handleFetch, filterStatus, searchTerm]);

    /**
     * Actualizar estado de cotización
     */
    const handleUpdateStatus = useCallback((id, newStatus) => {
        if (!window.confirm(`¿Seguro que deseas cambiar el estado de la cotización ${id.substring(0, 8)} a ${newStatus}?`)) {
            return;
        }

        dispatch(updateQuotationStatus({ id, estado: newStatus }))
            .unwrap()
            .then(() => {
                notify(`Estado de cotización ${id.substring(0, 8)} actualizado a ${newStatus}.`, 'success');
                handleFetch({ page: currentPage, status: filterStatus, search: searchTerm });
            })
            .catch((err) => {
                notify(`Fallo al actualizar estado: ${err.message || 'Error de API'}`, 'error');
            });
    }, [dispatch, notify, handleFetch, currentPage, filterStatus, searchTerm]);

    /**
     * Limpiar filtros
     */
    const handleClearFilters = useCallback(() => {
        setFilterStatus('ALL');
        setSearchTerm('');
        setCurrentPage(1);
    }, []);

    /**
     * Manejo de errores globales
     */
    if (error) {
        return <ErrorDisplay error={error} />;
    }

    /**
     * Render principal
     */
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Administración de Cotizaciones</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Gestiona y monitorea todas las cotizaciones del sistema
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                {/* Estadísticas */}
                <QuotationStats stats={stats} />

                {/* Filtros */}
                <QuotationFilters 
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onClearFilters={handleClearFilters}
                />
                
                {/* Tabla */}
                <QuotationTable
                    loading={loading}
                    quotations={quotations}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onUpdateStatus={handleUpdateStatus}
                />
            </div>
        </div>
    );
};

export default AdminQuotationManager;
