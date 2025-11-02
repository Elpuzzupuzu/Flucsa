import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchQuotations, updateQuotationStatus } from '../../features/quotations/quotationSlice';
import useNotification from '../../hooks/Notify/useNotification';
import QuotationTable from './components/QuotationTable'; // Componente presentacional para la tabla

/**
 * Contenedor para la gestión administrativa de todas las cotizaciones.
 * Solo accesible para usuarios con rol 'admin'.
 */
const AdminQuotationManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notify } = useNotification();
    
    // Obtener la lista COMPLETA de cotizaciones
    const { list: allQuotations, loading, error } = useSelector(state => state.quotations);
    
    // Estado para filtros
    const [filterStatus, setFilterStatus] = useState('ALL');

    // 1. Cargar todas las cotizaciones al montar
    useEffect(() => {
        // La función fetchQuotations en el backend debería devolver TODAS las cotizaciones
        // si detecta que el usuario es administrador.
        dispatch(fetchQuotations());
    }, [dispatch]);
    
    // 2. Lógica de Filtrado
    const filteredQuotations = useMemo(() => {
        if (filterStatus === 'ALL') {
            return allQuotations;
        }
        return allQuotations.filter(q => q.estado_cotizacion === filterStatus);
    }, [allQuotations, filterStatus]);


    // 3. Handler para actualizar el estado
    const handleUpdateStatus = (id, newStatus) => {
        // Confirmación
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
    };

    // 4. Handler para ver detalle (navega a la misma ruta de detalle de usuario)
    const handleViewDetails = (id) => {
        navigate(`/cotizaciones/${id}`);
    };

    if (error) {
        return <div className="p-4 text-center text-red-600 bg-red-100 mt-5">Error al cargar cotizaciones: {error}</div>;
    }
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Administración de Cotizaciones</h1>
            
            {/* Componente de Filtro */}
            <div className="mb-4">
                <label className="mr-2 font-medium">Filtrar por Estado:</label>
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 border rounded shadow"
                >
                    <option value="ALL">Todas</option>
                    <option value="GENERADA">Generada</option>
                    <option value="ACEPTADA">Aceptada</option>
                    <option value="RECHAZADA">Rechazada</option>
                    <option value="COMPLETADA">Completada</option>
                    <option value="CANCELADA">Cancelada</option>
                </select>
            </div>
            
            {/* Componente de la Tabla Presentacional */}
            <QuotationTable 
                quotations={filteredQuotations}
                isLoading={loading}
                onUpdateStatus={handleUpdateStatus}
                onViewDetails={handleViewDetails}
                isAdmin={true} // Se pasa la prop para habilitar acciones administrativas en la tabla
            />
        </div>
    );
};

export default AdminQuotationManager;