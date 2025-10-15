// components/ProductsPage.jsx

import React, { useRef } from "react";
import { useProductsLogic } from "./hooks/useProductsLogic";
import ProductsHeader from "./components/ProductsHeader";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsGrid from "./components/ProductsGrid";
import ProductsPagination from "./components/ProductsPagination";
import NoResults from "./components/NoResult";
import FilterSidebar from "./ProductFilter/ProductFilter";
import HeroSlider from "../../components/BannerSlider/HeroSlider";

const ProductsPage = ({ addToCart }) => {
  const logic = useProductsLogic();
  const {
    loading,
    error,
    currentProducts,
    sortedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    itemsPerPage,
    setItemsPerPage,
    sidebarOpen,
    setSidebarOpen,
    filters,
    setFilters,
    availableCategories,
    getFilterCount,
  } = logic;

  // Ref para la barra de filtros
  const toolbarRef = useRef(null);

  if (loading) return <div className="flex justify-center p-20">Cargando...</div>;
  if (error) return <div className="text-center text-red-600 p-20">Error: {error}</div>;

  return (
    // Se agregó 'overflow-x-hidden' para recortar cualquier contenido
    // que se desborde horizontalmente y evitar el scroll lateral.
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <ProductsHeader /> */}
      
        <ProductsToolbar
          ref={toolbarRef} 
          {...{
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
            getFilterCount,
          }}
        />

        {currentProducts.length > 0 ? (
          <>
            <ProductsGrid
              products={currentProducts}
              viewMode={viewMode}
              addToCart={addToCart}
            />
            <ProductsPagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              scrollToRef={toolbarRef}
            />
          </>
        ) : (
          <NoResults />
        )}
      </div>

      <FilterSidebar
        filters={filters}
        onFilterChange={setFilters}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(false)}
        categories={availableCategories}
      />
          {/* <HeroSlider/> */}  

    </div>
  );
};

export default ProductsPage;