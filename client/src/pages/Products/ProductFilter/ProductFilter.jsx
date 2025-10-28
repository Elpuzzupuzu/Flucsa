import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sliders, Package, DollarSign, X, Filter, Droplets, Link, CircleDot } from 'lucide-react';
import { fetchProducts } from '../../../features/products/productsSlice'; // Asegúrate que esta ruta es correcta

const FilterSidebar = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const dispatch = useDispatch();
  const [isAnimating, setIsAnimating] = useState(false);

  // NOTA: Estas categorías DEBERÍAN cargarse desde la API y contener el UUID real.
  // Utiliza IDs reales de tu base de datos aquí para las pruebas.
  const categories = [
    { name: 'Ferreteria', id: '2ded7b39-d779-476d-93fb-3f83fe981b4e', icon: Droplets },
    { name: 'Industriales', id: '381dd166-bbc5-43ac-96d1-96116fe4f355', icon: Link },
    { name: 'Domesticos', id: 'b05d6896-6aee-4461-9385-b46d32ec7c0a', icon: CircleDot },
    { name: 'Piscinas', id: 'c33a2429-2647-43b7-aa52-c307b38f2274', icon: Filter },
  ];

  const priceRanges = [
    { label: 'Menos de $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $300', value: '100-300' },
    { label: 'Más de $300', value: '300+' }
  ];

  const handleCategoryChange = (categoryId) => {
    // Si la categoría ya está seleccionada, la deseleccionamos (null).
    const newCategoryId = filters.mainCategoryId === categoryId ? null : categoryId;
    
    // 1. Actualizar el estado local
    onFilterChange({ ...filters, mainCategoryId: newCategoryId });

    // 2. Preparar los parámetros para el backend
    const paramsToSend = { 
        page: 1, // Resetear a la página 1
        limit: 14, 
        // 🎯 Usamos el nombre del parámetro del backend: mainCategoryId
        mainCategoryId: newCategoryId, 
        // Conservar otros filtros si existen, como la búsqueda de texto:
        searchQuery: filters.searchQuery || undefined
    };

    // 3. Llamar al backend
    dispatch(fetchProducts(paramsToSend));
  };

  const handlePriceRangeChange = (priceRange) => {
    // Si el rango ya está seleccionado, lo deseleccionamos ('').
    const newPriceRange = filters.priceRange === priceRange ? '' : priceRange;
    
    // 1. Actualizar el estado local
    onFilterChange({ ...filters, priceRange: newPriceRange });
    
    // 2. Descomponer el rango para los parámetros del backend (minPrice, maxPrice)
    const [minStr, maxStr] = newPriceRange.split('-');
    
    // Nota: Aunque el backend aún no procesa minPrice/maxPrice, preparamos la llamada.
    const minPrice = minStr ? parseFloat(minStr) : undefined;
    // Si es '300+', maxStr es '+', por lo que maxPrice es undefined.
    const maxPrice = maxStr && maxStr !== '+' ? parseFloat(maxStr) : undefined;
    
    // 3. Preparar los parámetros para el backend
    const paramsToSend = { 
        page: 1, 
        limit: 14, 
        mainCategoryId: filters.mainCategoryId, // Conservar filtro de categoría
        searchQuery: filters.searchQuery || undefined,
        // 🎯 Campos para la implementación futura de rango de precio en el backend
        minPrice: minPrice, 
        maxPrice: maxPrice, 
    };

    // 4. Llamar al backend
    dispatch(fetchProducts(paramsToSend));
  };

  const clearAllFilters = () => {
    // 1. Limpiar el estado local de filtros
    onFilterChange({ 
        categories: [], 
        priceRange: '', 
        mainCategoryId: null, 
        searchQuery: filters.searchQuery // Conservar la búsqueda si es relevante
    });
    
    // 2. Llamar al backend con solo la paginación y la búsqueda de texto
    dispatch(fetchProducts({ 
        page: 1, 
        limit: 14,
        searchQuery: filters.searchQuery || undefined
    }));
  };

  // Cuenta los filtros aplicados (categoría y rango de precio)
  const getFilterCount = () => (filters.mainCategoryId ? 1 : 0) + (filters.priceRange ? 1 : 0);

  useEffect(() => {
    if (isOpen) setIsAnimating(true);
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onToggle}
        onTransitionEnd={() => { if (!isOpen) setIsAnimating(false); }}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] will-change-transform will-change-opacity ${
          isOpen ? 'translate-x-0 opacity-100 scale-100' : '-translate-x-full opacity-0 scale-95'
        }`}
        onTransitionEnd={() => { if (!isOpen) setIsAnimating(false); }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 transition-all duration-500 delay-100 ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Filtros
              {getFilterCount() > 0 && (
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full animate-pulse">
                  {getFilterCount()}
                </span>
              )}
            </h3>
            <button 
              onClick={onToggle}
              className="p-2 hover:bg-gray-200 rounded-lg transition-all duration-200 hover:scale-110"
              title="Cerrar filtros"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Categorías */}
              <div className={`transition-all duration-500 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Categorías
                </h4>
                <div className="space-y-2">
                  {categories.map(({ name, id, icon: Icon }, index) => (
                    <label 
                      key={id} 
                      className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-sm ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: isOpen ? `${300 + index * 70}ms` : '0ms' }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.mainCategoryId === id}
                        onChange={() => handleCategoryChange(id)} 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                      />
                      <Icon className={`w-4 h-4 transition-all duration-200 ${filters.mainCategoryId === id ? 'text-blue-600 scale-110' : 'text-gray-500'}`} />
                      <span className="text-sm text-gray-700">{name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rango de Precio */}
              <div className={`transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Rango de Precio
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label 
                      key={range.value} 
                      className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-sm ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                      style={{ transitionDelay: isOpen ? `${600 + index * 70}ms` : '0ms' }}
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handlePriceRangeChange(e.target.value)}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500 transition-all duration-200"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Botón limpiar filtros */}
              <button 
                onClick={clearAllFilters}
                className={`w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: isOpen ? '900ms' : '0ms' }}
                disabled={getFilterCount() === 0}
              >
                Limpiar Filtros
              </button>

              {/* Resumen */}
              {getFilterCount() > 0 && (
                <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200 shadow-sm transition-all duration-500 ${isOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
                  style={{ transitionDelay: isOpen ? '1000ms' : '0ms' }}
                >
                  <h5 className="text-sm font-medium text-blue-900 mb-2">Filtros Aplicados:</h5>
                  <div className="space-y-1">
                    {filters.mainCategoryId && (
                      <div className="text-xs text-blue-700">
                        <strong>Categoría:</strong> {categories.find(c => c.id === filters.mainCategoryId)?.name || filters.mainCategoryId}
                      </div>
                    )}
                    {filters.priceRange && (
                      <div className="text-xs text-blue-700">
                        <strong>Precio:</strong> {priceRanges.find(r => r.value === filters.priceRange)?.label}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Botón toggle
export const FilterToggleButton = ({ isOpen, onToggle, filterCount = 0 }) => {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 hover:shadow-md ${
        isOpen ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
      title={isOpen ? "Ocultar filtros" : "Mostrar filtros"}
    >
      <Sliders className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      <span className="font-medium">Filtros</span>
      {filterCount > 0 && (
        <span className={`text-xs px-2 py-1 rounded-full font-medium transition-all duration-300 animate-bounce ${isOpen ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}`}>
          {filterCount}
        </span>
      )}
    </button>
  );
};

export default FilterSidebar;