import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Grid3X3, List } from 'lucide-react';
import { Link } from 'react-router-dom';

// Importa los componentes actualizados
import FilterSidebar, { FilterToggleButton } from './ProductFilter/ProductFilter';
import ProductCard from './ProductCard/ProductCard';

// Mock data
const productsData = [
  {
    id: 1,
    name: 'Acople universal',
    price: '$35.00',
    image: 'https://tuvalrep.com.co/wp-content/uploads/2023/07/Acople-Universal-Apolo.jpg',
    description: 'Conexión versátil para diferentes tipos de tubería.',
    badge: ''
  },
  {
    id: 2,
    name: 'Bomba centrífuga',
    price: '$320.00',
    image: 'https://cms.grupoferrepat.net/assets/img/productos/619697.webp',
    description: 'Bomba de alto rendimiento para sistemas de agua.',
    badge: 'Oferta'
  },
  {
    id: 3,
    name: 'Filtro de sedimentos',
    price: '$45.00',
    image: 'https://www.toolferreterias.com/cdn/shop/files/273000016.jpg?v=1729035010',
    description: 'Filtro eficiente para eliminar impurezas en el agua.',
    badge: ''
  },
  {
    id: 4,
    name: 'Válvula de bola de PVC',
    price: '$50.00',
    image: 'https://bedon.mx/wp-content/uploads/2023/12/MUELLER-VALVULA-ESFERA-CEMENTAR-PVC-H.jpg',
    description: 'Válvula de alta resistencia para control de flujo de agua.',
    badge: 'Más Vendido'
  },
  {
    id: 5,
    name: 'Tubería de cobre',
    price: '$20.00',
    image: 'https://www.surtidor.com/2203683-large_default/tubo-nacobre-l-01000601160.jpg',
    description: 'Tubería duradera y confiable para instalaciones de plomería.',
    badge: ''
  },
  {
    id: 6,
    name: 'Medidor de presión',
    price: '$85.00',
    image: 'https://http2.mlstatic.com/D_NQ_NP_845953-MPE74251680391_012024-O-manometro-de-presion-de-agua-de-14-npt-manometro-.webp',
    description: 'Herramienta de precisión para medir la presión de fluidos.',
    badge: 'Nuevo'
  },
  {
    id: 7,
    name: 'Válvula de retención',
    price: '$75.00',
    image: 'https://valvulasarco.com/wp-content/uploads/2024/03/valvula-retencion-arco.png',
    description: 'Previene el retroceso de fluidos en tuberías.',
    badge: ''
  },
  {
    id: 8,
    name: 'Manómetro digital',
    price: '$120.00',
    image: 'https://static.grainger.com/rp/s/is/image/Grainger/19YM06_AS01?$zmmain$',
    description: 'Medición precisa con pantalla digital.',
    badge: 'Nuevo'
  }
];

const ProductsPage = ({ addToCart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: ''
  });

  // 🎯 FUNCIONES CORREGIDAS PARA MANEJAR EL SIDEBAR
  const handleSidebarToggle = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return productsData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filters.categories.length === 0 ||
        filters.categories.some(cat => product.name.toLowerCase().includes(cat.toLowerCase()));
      let matchesPrice = true;
      if (filters.priceRange) {
        const price = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
        switch (filters.priceRange) {
          case '0-50':
            matchesPrice = price < 50;
            break;
          case '50-100':
            matchesPrice = price >= 50 && price <= 100;
            break;
          case '100-300':
            matchesPrice = price > 100 && price <= 300;
            break;
          case '300+':
            matchesPrice = price > 300;
            break;
        }
      }
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          const priceA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
          const priceB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
          return priceA - priceB;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortedProducts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const getFilterCount = () => {
    return filters.categories.length + (filters.priceRange ? 1 : 0);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }
    return rangeWithDots;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contenido principal */}
      <div className="px-6 py-8">
        {/* Encabezado */}
        <div className="mb-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">Productos</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Nuestros Productos</h1>
          <p className="text-gray-600 mt-2">Descubre nuestra amplia gama de productos de plomería y equipos industriales</p>
        </div>

        {/* Barra de herramientas */}
        <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between bg-white p-4 rounded-lg shadow-sm">
          {/* Botón de filtros y búsqueda */}
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            {/* ✅ BOTÓN DE FILTROS CORREGIDO */}
            <FilterToggleButton
              isOpen={sidebarOpen}
              onToggle={handleSidebarToggle}
              filterCount={getFilterCount()}
            />
            
            {/* Barra de búsqueda */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Controles de vista y ordenamiento */}
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price">Ordenar por precio</option>
            </select>
            
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={6}>6 por página</option>
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
            </select>
            
            <div className="flex bg-gray-100 border border-gray-200 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Información de resultados */}
        <div className="mb-6 text-sm text-gray-600 flex items-center justify-between">
          <span>
            Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)} de {sortedProducts.length} productos
          </span>
          {getFilterCount() > 0 && (
            <button
              onClick={() => setFilters({ categories: [], priceRange: '' })}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Limpiar filtros ({getFilterCount()})
            </button>
          )}
        </div>

        {/* Grid de productos */}
        {currentProducts.length > 0 ? (
          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            : "space-y-4 mb-12"
          }>
            {currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda o ajusta los filtros</p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </button>
            
            <div className="flex space-x-1 flex-wrap justify-center">
              {getPageNumbers().map((pageNumber, index) => (
                <button
                  key={index}
                  onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                  disabled={pageNumber === '...'}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    pageNumber === currentPage
                      ? 'bg-blue-600 text-white'
                      : pageNumber === '...'
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* ✅ SIDEBAR CORREGIDO */}
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        isOpen={sidebarOpen}
        onToggle={handleSidebarClose}
      />
    </div>
  );
};

export default ProductsPage;