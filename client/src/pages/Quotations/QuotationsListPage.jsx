import React, { useState, useEffect } from 'react';
import { Plus, FileText, Search } from 'lucide-react';
import QuotationList from './components/QuotationList';
// Asumiremos que tienes un componente Paginator para manejar la UI de paginación
// import Paginator from './components/Paginator'; 

/**
 * Componente de la página que organiza el listado de cotizaciones.
 * Recibe handlers de paginación y filtro del Manager/Contenedor.
 */
const QuotationsListPage = ({ 
    quotations, 
    isLoading, 
    onCreate, 
    onDelete, 
    onViewDetails, 
    // 💡 NUEVAS PROPS DE PAGINACIÓN/FILTRO
    pagination, 
    onFetchData 
}) => {
    // Estado local para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Efecto para ejecutar la búsqueda cada vez que el término local cambia (debounce implícito)
    // NOTA: Para producción, se recomienda usar un hook de debounce aquí.
    useEffect(() => {
        // Ejecutar la búsqueda cuando el componente se monta o cuando el término cambia.
        // Mantiene la página actual al filtrar si es posible.
        const delaySearch = setTimeout(() => {
            onFetchData({ 
                page: 1, // Resetear a la primera página al aplicar un nuevo filtro
                pageSize: pagination.pageSize,
                search: searchTerm,
            });
        }, 300); // Pequeño retraso para evitar llamadas excesivas a la API

        return () => clearTimeout(delaySearch);
    }, [searchTerm, onFetchData, pagination.pageSize]); // Dependencias: término, handler, y tamaño de página.
    
    // Handler para el cambio de página
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            onFetchData({ 
                page: newPage, 
                pageSize: pagination.pageSize, 
                search: searchTerm 
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Título */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-800">Mis Cotizaciones</h1>
                                <p className="text-slate-600 text-sm mt-1">
                                    Gestiona y visualiza todas tus cotizaciones
                                </p>
                            </div>
                        </div>
                        
                        {/* Botón Crear (Mantener la función original) */}
                     
                    </div>
                </header>

                {/* Filtro y Búsqueda */}
                <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Buscar por estado,o valor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                    {/* Aquí se pueden añadir filtros de estado si es necesario */}
                </div>
                
                {/* Main Content Card */}
                <section className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <QuotationList
                            quotations={quotations}
                            isLoading={isLoading}
                            onDelete={onDelete}
                            onViewDetails={onViewDetails}
                            // Pasar los datos de paginación para que la lista muestre el estado
                            pagination={pagination} 
                        />
                    </div>
                </section>

                {/* Footer Info y Paginador */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-slate-500 text-sm order-2 sm:order-1">
                        {/* Mostrar información de paginación */}
                        {pagination.totalItems > 0 && (
                            <p>Mostrando **{pagination.currentPage}** de **{pagination.totalPages}** páginas ({pagination.totalItems} resultados en total)</p>
                        )}
                        {pagination.totalItems === 0 && !isLoading && (
                            <p>No hay cotizaciones para mostrar.</p>
                        )}
                    </div>
                    
                    {/* 💡 Integración del Paginador (Asumiendo que existe un componente) */}
                    <nav className="flex items-center gap-2 order-1 sm:order-2">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1 || isLoading}
                            className="px-3 py-1 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-50 transition-colors"
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-slate-700">
                             {pagination.currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages || isLoading}
                            className="px-3 py-1 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-50 transition-colors"
                        >
                            Siguiente
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default QuotationsListPage;