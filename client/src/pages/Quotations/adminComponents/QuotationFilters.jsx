import React from 'react';
import { Search, Filter } from 'lucide-react';

/**
 * Componente Presentacional: Formulario de búsqueda y filtro.
 * Recibe los valores y setters como props.
 */
const QuotationFilters = ({ filterStatus, setFilterStatus, searchTerm, setSearchTerm, onClearFilters }) => {
    const hasActiveFilters = filterStatus !== 'ALL' || searchTerm;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Search Input */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>

                        <input
                            type="text"
                            placeholder="Nombre, apellido, estado o ID…"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="md:w-64">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Filter className="inline w-4 h-4 mr-1" />
                        Filtrar por Estado
                    </label>

                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                    >
                        <option value="ALL">Todas las cotizaciones</option>
                        <option value="GENERADA">Generada</option>
                        <option value="ACEPTADA">Aceptada</option>
                        <option value="RECHAZADA">Rechazada</option>
                        <option value="COMPLETADA">Completada</option>
                        <option value="CANCELADA">Cancelada</option>
                    </select>
                </div>
            </div>

            {/* Active Filters Indicator */}
            {hasActiveFilters && (
                <div className="mt-4 flex items-center flex-wrap gap-2 text-sm text-gray-600">

                    <span className="font-medium">Filtros activos:</span>

                    {filterStatus !== 'ALL' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            Estado: {filterStatus}
                        </span>
                    )}

                    {searchTerm && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            Búsqueda: "{searchTerm}"
                        </span>
                    )}

                    <button
                        onClick={onClearFilters}
                        className="ml-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuotationFilters;
