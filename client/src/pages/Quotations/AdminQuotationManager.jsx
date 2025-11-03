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
 * Se encarga de la lógica (data fetching, filtros, Redux, manejo de eventos).
 */
const AdminQuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify } = useNotification();
    
    // 1. Estado de Redux
    const { list: allQuotations, loading, error } = useSelector(state => state.quotations);

    // **********************************************
    // Agrega el console.log aquí:
    useEffect(() => {
        console.log('Datos de Redux - Cotizaciones:', { allQuotations, loading, error });
    }, [allQuotations, loading, error]); // Se ejecutará cada vez que estos valores cambien
    // **********************************************

    // 2. Estado Local (Filtros)
    const [filterStatus, setFilterStatus] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');

    // 3. Efecto de Carga Inicial
    useEffect(() => {
        dispatch(fetchQuotations());
    }, [dispatch]);

    // 4. Estadísticas Calculadas (useMemo)
    const stats = useMemo(() => {
        return {
            total: allQuotations.length,
            generadas: allQuotations.filter(q => q.estado_cotizacion === 'GENERADA').length,
            aceptadas: allQuotations.filter(q => q.estado_cotizacion === 'ACEPTADA').length,
            completadas: allQuotations.filter(q => q.estado_cotizacion === 'COMPLETADA').length,
        };
    }, [allQuotations]);

    // 5. Filtrado Combinado (useMemo)
    // const filteredQuotations = useMemo(() => {
    //     let result = allQuotations;
        
    //     if (filterStatus !== 'ALL') {
    //         result = result.filter(q => q.estado_cotizacion === filterStatus);
    //     }
        
    //     if (searchTerm.trim()) {
    //         const search = searchTerm.toLowerCase();
    //         result = result.filter(q => 
    //             q.id?.toLowerCase().includes(search) ||
    //             q.usuario_nombre?.toLowerCase().includes(search) ||
    //             q.usuario_email?.toLowerCase().includes(search)
    //         );
    //     }
        
    //     return result;
    // }, [allQuotations, filterStatus, searchTerm]);

// 5. Filtrado Combinado (useMemo)
const filteredQuotations = useMemo(() => {
    let result = allQuotations;
    
    if (filterStatus !== 'ALL') {
        result = result.filter(q => q.estado_cotizacion === filterStatus);
    }
    
    if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase();
        
        result = result.filter(q => {
            // Asegúrate de que q.usuario_id exista y no sea nulo antes de acceder a sus propiedades
            const usuario = q.usuario_id;
            
            // Si la cotización no tiene usuario asociado (raro, pero posible si la FK es nullable)
            if (!usuario) {
                return false; 
            }
            
            // Combinar nombre y apellido para una búsqueda más robusta
            const fullName = `${usuario.nombre || ''} ${usuario.apellido || ''}`.toLowerCase();
            
            return (
                q.id?.toLowerCase().includes(search) ||
                fullName.includes(search) || // Busca en Nombre Completo
                usuario.correo?.toLowerCase().includes(search) // Busca en Correo
            );
        });
    }
    
    return result;
}, [allQuotations, filterStatus, searchTerm]); // Fin del useMemo

    // 6. Handlers de Eventos
    const handleUpdateStatus = useCallback((id, newStatus) => {
        if (!window.confirm(`¿Seguro que deseas cambiar el estado de la cotización ${id.substring(0, 8)} a ${newStatus}?`)) {
            return;
        }
        
        dispatch(updateQuotationStatus({ id, estado: newStatus }))
            .unwrap()
            .then(() => {
                notify(`Estado de cotización ${id.substring(0, 8)} actualizado a ${newStatus}.`, 'success');
            })
            .catch((err) => {
                notify(`Fallo al actualizar estado: ${err.message || 'Error de API'}`, 'error');
            });
    }, [dispatch, notify]);

    const handleViewDetails = useCallback((id) => {
        navigate(`/cotizaciones/${id}`);
    }, [navigate]);

    const handleClearFilters = useCallback(() => {
        setFilterStatus('ALL');
        setSearchTerm('');
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
                    allQuotationsCount={allQuotations.length}
                    filteredQuotations={filteredQuotations}
                    onViewDetails={handleViewDetails}
                    onUpdateStatus={handleUpdateStatus}
                />

            </div>
        </div>
    );
};

export default AdminQuotationManager;