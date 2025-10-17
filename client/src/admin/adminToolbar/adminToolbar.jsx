import { Grid3x3, List, SlidersHorizontal, Filter, TrendingUp } from "lucide-react";
import Search from '../adminToolbar/adminSearch'; 

// Botón de filtro adaptativo (Se mantiene sin cambios)
const FilterToggleButton = ({ isOpen, onToggle, filterCount }) => (
  <>
    {/* Versión escritorio */}
    <button
      onClick={onToggle}
      className="hidden sm:flex relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium group"
    >
      <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
      <span>Filtros</span>
      {filterCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
          {filterCount}
        </span>
      )}
    </button>

    {/* Versión móvil: solo icono */}
    <button
      onClick={onToggle}
      className="sm:hidden relative p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      aria-label="Filtros"
    >
      <SlidersHorizontal className="w-5 h-5" />
      {filterCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {filterCount}
        </span>
      )}
    </button>
  </>
);

const ProductsToolbar = ({
  sortBy,
  setSortBy,
  itemsPerPage,
  setItemsPerPage,
  viewMode,
  setViewMode,
  sidebarOpen,
  setSidebarOpen,
  getFilterCount,
  onAdminProductSelect, // ✅ CAMBIO 1: Recibir la prop del padre
}) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-200 backdrop-blur-sm relative z-40">

    {/* AJUSTE VISUAL: Se añadió 'rounded-t-2xl' a la barra de color */}
    <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600 rounded-t-2xl"></div>

    <div className="p-6 space-y-5 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-6">

      {/* Sección de búsqueda */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <FilterToggleButton
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(prev => !prev)}
          filterCount={getFilterCount()}
        />

        {/* CONTENEDOR DE BÚSQUEDA - Contiene el componente Search */}
        <div className="relative flex-1 group">
          <Search onAdminProductSelect={onAdminProductSelect} /> {/* ✅ CAMBIO 2: Pasar la prop a Search */}
        </div>
      </div>

      {/* Sección de controles */}
      <div className="flex items-center gap-3 flex-wrap justify-end">

        {/* Sort Dropdown */}
        <div className="hidden sm:flex relative group">
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
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>

        {/* Items per page Dropdown */}
        <div className="hidden sm:flex relative group">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Math.max(14, Number(e.target.value)))}
            className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium bg-gray-50 hover:bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer outline-none appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value={14}>14 productos</option>
            <option value={21}>21 productos</option>
            <option value={42}>42 productos</option>
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