import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Grid3X3, List, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";

// Componentes
import FilterSidebar, { FilterToggleButton } from './ProductFilter/ProductFilter';
import ProductCard from './ProductCard/ProductCard';

const ProductsPage = ({ addToCart }) => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: ''
  });

  // 🔹 Cargar productos
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Obtener categorías dinámicamente de los productos
  const availableCategories = useMemo(() => {
    const cats = products.map(p => p.categoria_principal_nombre || p.categoria || '');
    return Array.from(new Set(cats)).filter(Boolean);
  }, [products]);

  // 🔹 Filtrado
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some(cat =>
          (product.categoria_principal_nombre || product.categoria || '')
            .toLowerCase()
            .includes(cat.toLowerCase())
        );

      let matchesPrice = true;
      if (filters.priceRange) {
        const price = parseFloat(product.precio) || 0;
        switch (filters.priceRange) {
          case '0-50': matchesPrice = price < 50; break;
          case '50-100': matchesPrice = price >= 50 && price <= 100; break;
          case '100-300': matchesPrice = price > 100 && price <= 300; break;
          case '300+': matchesPrice = price > 300; break;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, filters]);

  // 🔹 Ordenamiento
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.nombre.localeCompare(b.nombre);
        case 'price': return (a.precio || 0) - (b.precio || 0);
        default: return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  useEffect(() => { setCurrentPage(1); }, [sortedProducts]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [currentPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const getFilterCount = () => filters.categories.length + (filters.priceRange ? 1 : 0);

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) range.push(i);
    if (currentPage - delta > 2) rangeWithDots.push(1, '...');
    else rangeWithDots.push(1);
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) rangeWithDots.push('...', totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);
    return rangeWithDots;
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-xl text-gray-600 font-medium">Cargando productos...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-xl text-red-600 font-semibold">Error al cargar productos</p>
        <p className="text-gray-500 mt-2">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado mejorado */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors duration-200 font-medium">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-semibold">Productos</span>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-xl shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Nuestros Productos</h1>
              <p className="text-gray-600 mt-1">Descubre nuestra colección exclusiva</p>
            </div>
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>

        {/* Barra de herramientas mejorada */}
        <div className="mb-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-5 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center gap-3 flex-1 max-w-2xl">
              <FilterToggleButton
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(prev => !prev)}
                filterCount={getFilterCount()}
              />
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-gray-50 hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="price">Ordenar por precio</option>
              </select>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-gray-50 hover:bg-white transition-all duration-200 cursor-pointer"
              >
                <option value={8}>8 por página</option>
                <option value={16}>16 por página</option>
                <option value={24}>24 por página</option>
              </select>
              <div className="flex bg-gray-100 border-2 border-gray-200 rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('grid')} 
                  className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode==='grid'?'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md':'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')} 
                  className={`p-2.5 rounded-lg transition-all duration-200 ${viewMode==='list'?'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md':'text-gray-600 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados mejorados */}
        <div className="mb-6 flex items-center justify-between bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm text-gray-600 font-medium">
            Mostrando <span className="text-blue-600 font-bold">{indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)}</span> de <span className="text-blue-600 font-bold">{sortedProducts.length}</span> productos
          </span>
          {getFilterCount() > 0 && (
            <button 
              onClick={() => setFilters({ categories: [], priceRange: '' })} 
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-all duration-200"
            >
              Limpiar filtros ({getFilterCount()})
            </button>
          )}
        </div>

        {/* Grid mejorado con 4 columnas (8 productos = 2 filas) */}
        {currentProducts.length > 0 ? (
          <div className={viewMode==='grid'?"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12":"space-y-4 mb-12"}>
            {currentProducts.map(product => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  name: product.nombre,
                  price: product.precio ? `$${product.precio}` : "N/A",
                  description: product.descripcion || "Sin descripción",
                  image: product.imagen || "https://via.placeholder.com/200"
                }}
                viewMode={viewMode}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-8xl mb-6 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No se encontraron productos</h3>
            <p className="text-gray-500 text-lg">Intenta con otros términos de búsqueda o ajusta los filtros</p>
          </div>
        )}

        {/* Paginación mejorada */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap bg-white p-4 rounded-2xl shadow-md border border-gray-100">
            <button 
              onClick={() => handlePageChange(currentPage-1)} 
              disabled={currentPage===1} 
              className="flex items-center gap-2 px-5 py-2.5 text-gray-700 font-medium bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gray-50 disabled:hover:to-gray-100 disabled:hover:border-gray-200 transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>
            <div className="flex gap-1 flex-wrap justify-center">
              {getPageNumbers().map((page, idx) => (
                <button 
                  key={idx} 
                  onClick={() => typeof page==='number' && handlePageChange(page)} 
                  disabled={page==='...'} 
                  className={`min-w-[44px] px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm ${
                    page===currentPage
                      ?'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-md scale-105'
                      :page==='...'
                        ?'text-gray-400 cursor-not-allowed bg-transparent'
                        :'text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:scale-105'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => handlePageChange(currentPage+1)} 
              disabled={currentPage===totalPages} 
              className="flex items-center gap-2 px-5 py-2.5 text-gray-700 font-medium bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gray-50 disabled:hover:to-gray-100 disabled:hover:border-gray-200 transition-all duration-200 shadow-sm"
            >
              Siguiente <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Sidebar de filtros */}
      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        categories={availableCategories}
      />
    </div>
  );
};

export default ProductsPage;