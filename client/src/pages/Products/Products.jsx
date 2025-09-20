import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Grid3X3, List, Menu, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import ProductCard from '../Products/ProductCard/ProductCard';
import FilterSidebar from '../Products/ProductFilter/ProductFilter';
import ShoppingCart from '../Products/ShoppingCart/ShoppingCart';
import Footer from '../../components/Footer/Footer';


const ProductsPage = () => {
  // State for products and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // State for sidebars
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: ''
  });

  // State for cart
  const [cartItems, setCartItems] = useState([]);

  // Mock products data
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

  // Filter and search logic
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

  // Sort products
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

  // Reset page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedProducts]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Cart functions
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    alert('Redirigiendo al checkout...');
    // Here you would typically navigate to checkout page
  };

  // Filter functions
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Pagination functions
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

  // Get cart total items for mobile button
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7]"></div>
      
      <div className="flex">
        {/* Filter Sidebar */}
        <FilterSidebar 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isFilterOpen && isCartOpen 
            ? 'max-w-none lg:max-w-[calc(100%-40rem)]' 
            : isFilterOpen || isCartOpen 
            ? 'max-w-none lg:max-w-[calc(100%-20rem)]' 
            : 'max-w-none'
        } mx-auto`}>
          <div className="px-6 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span>Inicio</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-blue-600">Productos</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Nuestros Productos</h1>
              <p className="text-gray-600 mt-2">Descubre nuestra amplia gama de productos de plomería y equipos industriales</p>
            </div>

            {/* Toolbar */}
            <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between bg-gray-50 p-4 rounded-lg">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Menu className="w-4 h-4" />
                Filtros
              </button>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-end">
                {/* Sort Select */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price">Ordenar por precio</option>
                </select>

                {/* Items per page */}
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                >
                  <option value={6}>6 por página</option>
                  <option value={12}>12 por página</option>
                  <option value={24}>24 por página</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white border border-gray-200 rounded-lg p-0.5">
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

                {/* Mobile Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="lg:hidden relative p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Results Info */}
            <div className="mb-6 text-sm text-gray-600 flex items-center justify-between">
              <span>
                Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)} de {sortedProducts.length} productos
              </span>
              {(filters.categories.length > 0 || filters.priceRange) && (
                <button 
                  onClick={() => setFilters({ categories: [], priceRange: '' })}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Product Grid/List */}
            {currentProducts.length > 0 ? (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
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

            {/* Pagination */}
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
        </div>

        {/* Shopping Cart Sidebar */}
        <ShoppingCart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onProceedToCheckout={handleProceedToCheckout}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default ProductsPage;