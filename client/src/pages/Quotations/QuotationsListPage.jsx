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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-6 px-4 sm:px-6 md:py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <header className="mb-6 md:mb-8">
                    {/* El título y el botón ahora están siempre uno al lado del otro en móvil */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        
                        {/* Título y Descripción */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                                <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Mis Cotizaciones</h1>
                                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                                    Gestiona y visualiza todas tus cotizaciones
                                </p>
                            </div>
                        </div>
                        
                        {/* Botón Crear (Ajuste para móvil: solo icono y texto) */}
                        <button
                            onClick={onCreate}
                            className="w-full md:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-0 md:mr-2" />
                            {/* Ocultar el texto en móvil para ahorrar espacio si se desea, 
                                o usar un texto más corto (Ajustado a w-full en móvil) */}
                            <span className="md:inline">Crear Cotización</span>
                        </button>
                    </div>
                </header>

                {/* Filtro y Búsqueda */}
                {/* Hemos quitado la clase md:flex-row para que ocupe todo el ancho en móvil */}
                <div className="mb-6 flex flex-col items-stretch gap-4"> 
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Buscar por estado, o valor..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            // El padding horizontal ha sido ligeramente reducido en móvil (px-4)
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                    {/* Aquí se pueden añadir filtros de estado si es necesario */}
                </div>
                
                {/* Main Content Card */}
                {/* Reducimos el padding de la tarjeta en móvil de md:p-8 a p-6 */}
                <section className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                    <div className="p-4 sm:p-6 md:p-8">
                        <QuotationList
                            quotations={quotations}
                            isLoading={isLoading}
                            onDelete={onDelete}
                            onViewDetails={onViewDetails}
                            pagination={pagination} 
                        />
                    </div>
                </section>

                {/* Footer Info y Paginador */}
                {/* Aseguramos que el paginador se muestre encima de la información en móvil */}
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Paginador (order-1 en móvil, order-2 en sm: en adelante) */}
                    <nav className="flex items-center gap-2 order-1 sm:order-2 w-full justify-center sm:w-auto sm:justify-start">
                        <button
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                            disabled={pagination.currentPage === 1 || isLoading}
                            className="px-3 py-1 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-50 transition-colors text-sm"
                        >
                            Anterior
                        </button>
                        {/* Se puede ocultar el número de página actual en móvil si es muy restrictivo, pero lo mantendremos */}
                        <span className="px-3 py-1 text-slate-700 text-sm">
                            {pagination.currentPage}
                        </span>
                        <button
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages || isLoading}
                            className="px-3 py-1 border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-100 disabled:opacity-50 transition-colors text-sm"
                        >
                            Siguiente
                        </button>
                    </nav>

                    {/* Información de paginación (order-2 en móvil, order-1 en sm: en adelante) */}
                    <div className="text-slate-500 text-xs sm:text-sm order-2 sm:order-1 text-center sm:text-left">
                        {pagination.totalItems > 0 && (
                            <p>Mostrando **{pagination.currentPage}** de **{pagination.totalPages}** páginas ({pagination.totalItems} resultados en total)</p>
                        )}
                        {pagination.totalItems === 0 && !isLoading && (
                            <p>No hay cotizaciones para mostrar.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationsListPage;