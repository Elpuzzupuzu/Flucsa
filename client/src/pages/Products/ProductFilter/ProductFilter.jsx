import React from 'react';
import { X, Sliders, Package, DollarSign } from 'lucide-react';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange,
  categories = ['Válvulas', 'Tuberías', 'Bombas', 'Filtros', 'Medidores', 'Acoples'],
  priceRanges = [
    { label: 'Menos de $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $300', value: '100-300' },
    { label: 'Más de $300', value: '300+' }
  ]
}) => {
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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" 
          onClick={onClose} 
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:sticky lg:top-24 left-0 h-full lg:h-[calc(100vh-6rem)] w-80 
        bg-white border-r border-gray-100 shadow-lg lg:shadow-none 
        transform transition-transform duration-300 z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              Filtros
            </h3>
            <button 
              onClick={onClose} 
              className="p-1 rounded-md hover:bg-gray-100 lg:hidden transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

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
              className="w-full py-2 px-4 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
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
      </div>
    </>
  );
};

export default FilterSidebar;