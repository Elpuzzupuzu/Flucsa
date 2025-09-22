
import React from 'react';
import { ChevronLeft, Menu, Sliders, Package, DollarSign } from 'lucide-react';

const FilterSidebar = ({ filters, onFilterChange, isCollapsed, onToggleCollapsed }) => {
  const categories = ['Válvulas', 'Tuberías', 'Bombas', 'Filtros', 'Medidores', 'Acoples'];
  const priceRanges = [
    { label: 'Menos de $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $300', value: '100-300' },
    { label: 'Más de $300', value: '300+' }
  ];

  const handleCategoryChange = (category, isChecked) => {
    const newCategories = isChecked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handlePriceRangeChange = (priceRange) => {
    onFilterChange({ ...filters, priceRange });
  };

  const clearAllFilters = () => {
    onFilterChange({ categories: [], priceRange: '' });
  };

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'} flex-shrink-0 h-full`}>
      <div className="p-4 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Filtros
            </h3>
          )}
          <button 
            onClick={onToggleCollapsed}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6">
              {/* Categories Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Categorías
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label 
                      key={category} 
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Rango de Precio
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label 
                      key={range.value} 
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handlePriceRangeChange(e.target.value)}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              <button 
                onClick={clearAllFilters}
                className="w-full py-2 px-4 border bg-red-500 border-gray-200 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
              >
                Limpiar Filtros
              </button>

              {/* Filter Summary */}
              {(filters.categories.length > 0 || filters.priceRange) && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="text-sm font-medium text-blue-900 mb-2">Filtros Aplicados:</h5>
                  <div className="space-y-1">
                    {filters.categories.length > 0 && (
                      <div className="text-xs text-blue-700">
                        Categorías: {filters.categories.join(', ')}
                      </div>
                    )}
                    {filters.priceRange && (
                      <div className="text-xs text-blue-700">
                        Precio: {priceRanges.find(r => r.value === filters.priceRange)?.label}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;