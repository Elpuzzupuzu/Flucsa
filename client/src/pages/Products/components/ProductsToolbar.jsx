import React from "react";
import { Grid3x3, List, SlidersHorizontal, Filter, TrendingUp } from "lucide-react";
import Search from "../../../components/Header/Search/Search";

// Botón de filtro adaptativo
const FilterToggleButton = ({ isOpen, onToggle, filterCount }) => (
  <>
    {/* Versión escritorio */}
    <button
      onClick={onToggle}
      className="hidden sm:flex relative flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold group overflow-hidden"
    >
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300 relative z-10" />
      <span className="relative z-10">Filtros</span>
      {filterCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg ring-4 ring-white animate-pulse">
          {filterCount}
        </span>
      )}
    </button>

    {/* Versión móvil: solo icono */}
    <button
      onClick={onToggle}
      className="sm:hidden relative p-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
      aria-label="Filtros"
    >
      <SlidersHorizontal className="w-5 h-5" />
      {filterCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white animate-pulse">
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
}) => (
  <div className="mb-8 bg-white rounded-2xl shadow-xl border border-gray-100 backdrop-blur-sm relative z-40">
    {/* Barra de color superior */}
    <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600 rounded-t-2xl"></div>

    <div className="p-6 space-y-5 lg:space-y-0 lg:flex lg:items-center lg:justify-between lg:gap-6">
      {/* Sección de búsqueda */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <FilterToggleButton
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
          filterCount={getFilterCount()}
        />
        <div className="relative flex-1 group">
          <Search />
        </div>
      </div>

      {/* Sección de controles */}
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {/* Sort Dropdown */}
        <div className="hidden sm:flex relative group">
          <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-red-500 w-4 h-4 pointer-events-none transition-colors duration-300 z-10" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 hover:border-red-300 hover:shadow-md focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 cursor-pointer outline-none appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="price-asc">💰 Precio: Menor a Mayor</option>
            <option value="price-desc">💎 Precio: Mayor a Menor</option>
          </select>
        </div>

        {/* Items per page Dropdown */}
        <div className="hidden sm:flex relative group">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 w-4 h-4 pointer-events-none transition-colors duration-300 z-10" />
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Math.max(14, Number(e.target.value)))}
            className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 hover:border-blue-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 cursor-pointer outline-none appearance-none bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value={14}>14 productos</option>
            <option value={21}>21 productos</option>
            <option value={42}>42 productos</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 rounded-xl p-1.5 shadow-md">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm"
            }`}
            aria-label="Vista de cuadrícula"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2.5 rounded-lg transition-all duration-300 ${
              viewMode === "list"
                ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transform scale-105"
                : "text-gray-500 hover:text-gray-700 hover:bg-white hover:shadow-sm"
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