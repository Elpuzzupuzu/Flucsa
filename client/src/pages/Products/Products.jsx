import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Grid3X3, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice"; // thunk

// Componentes
import FilterSidebar, { FilterToggleButton } from './ProductFilter/ProductFilter';
import ProductCard from './ProductCard/ProductCard';

const ProductsPage = ({ addToCart }) => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

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

  // 🔹 Cargar productos
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // 🔹 Obtener categorías dinámicamente de los productos
  const availableCategories = useMemo(() => {
    const cats = products.map(p => p.categoria_principal_nombre || p.categoria || '');
    return Array.from(new Set(cats)).filter(Boolean); // único y no vacío
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

  if (loading) return <p className="text-center py-20 text-gray-600">⏳ Cargando productos...</p>;
  if (error) return <p className="text-center py-20 text-red-600">❌ Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        {/* Encabezado */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600">Productos</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Nuestros Productos</h1>
          <p className="text-gray-600 mt-2">Descubre nuestra amplia gama de productos</p>
        </div>

        {/* Barra de herramientas */}
        <div className="mb-6 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <FilterToggleButton
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(prev => !prev)}
              filterCount={getFilterCount()}
            />
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
              onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value={6}>6 por página</option>
              <option value={12}>12 por página</option>
              <option value={24}>24 por página</option>
            </select>
            <div className="flex bg-gray-100 border border-gray-200 rounded-lg p-0.5">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-md transition-colors ${viewMode==='grid'?'bg-blue-600 text-white':'text-gray-600 hover:text-blue-600'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-md transition-colors ${viewMode==='list'?'bg-blue-600 text-white':'text-gray-600 hover:text-blue-600'}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="mb-6 text-sm text-gray-600 flex items-center justify-between">
          <span>Mostrando {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, sortedProducts.length)} de {sortedProducts.length} productos</span>
          {getFilterCount() > 0 && (
            <button onClick={() => setFilters({ categories: [], priceRange: '' })} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Limpiar filtros ({getFilterCount()})
            </button>
          )}
        </div>

        {/* Grid/List */}
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
          <div className="text-center py-16">
            <div className="text-gray-300 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda o ajusta los filtros</p>
          </div>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 flex-wrap">
            <button onClick={() => handlePageChange(currentPage-1)} disabled={currentPage===1} className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
            </button>
            <div className="flex space-x-1 flex-wrap justify-center">
              {getPageNumbers().map((page, idx) => (
                <button key={idx} onClick={() => typeof page==='number' && handlePageChange(page)} disabled={page==='...'} className={`px-4 py-2 rounded-lg font-medium transition-all ${page===currentPage?'bg-blue-600 text-white':page==='...'?'text-gray-400 cursor-not-allowed':'text-gray-600 bg-white border border-gray-200 hover:bg-gray-50'}`}>
                  {page}
                </button>
              ))}
            </div>
            <button onClick={() => handlePageChange(currentPage+1)} disabled={currentPage===totalPages} className="flex items-center px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
              Siguiente <ChevronRight className="w-4 h-4 ml-1" />
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
        categories={availableCategories} // categorías dinámicas
      />
    </div>
  );
};

export default ProductsPage;
