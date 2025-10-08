import { Search, Grid3x3, List, SlidersHorizontal, Filter, TrendingUp } from "lucide-react";

// Componente de botón de filtro simulado para el ejemplo
const FilterToggleButton = ({ isOpen, onToggle, filterCount }) => (
  <button
    onClick={onToggle}
    className="relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium group"
  >
    <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
    <span className="hidden sm:inline">Filtros</span>
    {filterCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
        {filterCount}
      </span>
    )}
  </button>
);

const ProductsToolbar = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode,
  sidebarOpen,
  setSidebarOpen,
  getFilterCount
}) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm">
    {/* Accent Bar */}
    <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
    
    <div className="p-6 space-y-5 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-6">
      {/* Search Section */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <FilterToggleButton
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
          filterCount={getFilterCount()}
        />
        
        <div className="relative flex-1 group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-red-600 w-5 h-5 transition-colors duration-300" />
          <input
            type="text"
            placeholder="Buscar productos por nombre, categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 bg-gray-50 hover:bg-white transition-all duration-300 text-gray-900 placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {/* Sort Dropdown */}
        <div className="relative group">
          <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium bg-gray-50 hover:bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer outline-none appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="name">Por nombre</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>

        {/* Items Per Page Dropdown */}
        <div className="relative group">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium bg-gray-50 hover:bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer outline-none appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value={8}>8 productos</option>
            <option value={16}>16 productos</option>
            <option value={24}>24 productos</option>
            <option value={32}>32 productos</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 border-2 border-gray-200 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-md transform scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Vista de cuadrícula"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md transform scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
            }`}
            aria-label="Vista de lista"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProductsToolbar;