import React, { useRef, useState } from "react";
import { useProductsLogic } from "../../pages/Products/hooks/useProductsLogic";
import ProductsToolbar from "../adminToolbar/adminToolbar";
import ProductsGrid from "../adminProductsGrid/adminProductsGrid";
import ProductsPagination from "../../pages/Products/components/ProductsPagination";
import NoResults from "../../pages/Products/components/NoResult";
import FilterSidebar from "../../pages/Products/ProductFilter/ProductFilter";
import ProductEditorOverlay from "./AdminProductCard/AdminProductOverlay/ProductEditOverlay";

const ProductsPage = ({ addToCart }) => {
  const logic = useProductsLogic();
  const {
    loading,
    error,
    currentProducts,
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

  const toolbarRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el overlay

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseOverlay = () => {
    setSelectedProduct(null);
  };

  // Función que actualizará los productos después de editar
  const handleSaveProduct = async (id, updates) => {
    console.log("Guardando producto:", id, updates);
    // Aquí podrías hacer un dispatch a redux o volver a cargar los productos desde la API
  };

  if (loading) return <div className="flex justify-center p-20">Cargando...</div>;
  if (error) return <div className="text-center text-red-600 p-20">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsToolbar
          ref={toolbarRef} 
          onAdminProductSelect={handleProductClick} // <-- ¡Correcto! Pasa el callback
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
              onProductClick={handleProductClick} 
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

      {/* Overlay de edición */}
      {selectedProduct && (
        <ProductEditorOverlay
          product={selectedProduct}
          onClose={handleCloseOverlay}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;