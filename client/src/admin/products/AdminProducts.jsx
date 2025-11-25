// import React, { useRef, useState } from "react";
// import { useProductsLogic } from "../../pages/Products/hooks/useProductsLogic";
// import ProductsToolbar from "../adminToolbar/adminToolbar";
// import ProductsGrid from "../adminProductsGrid/adminProductsGrid";
// import ProductsPagination from "../../pages/Products/components/ProductsPagination";
// import NoResults from "../../pages/Products/components/NoResult";
// import FilterSidebar from "../../pages/Products/ProductFilter/ProductFilter";
// import ProductEditorOverlay from "./AdminProductCard/AdminProductOverlay/ProductEditOverlay";
// import CreateProduct from "../../admin/products/adminCreateProduct/adminProductCreate"; 

// const ProductsPage = ({ addToCart }) => {
//   const logic = useProductsLogic();
//   const {
//     loading,
//     error,
//     currentProducts,
//     totalPages,
//     currentPage,
//     setCurrentPage,
//     viewMode,
//     setViewMode,
//     searchTerm,
//     setSearchTerm,
//     sortBy,
//     setSortBy,
//     itemsPerPage,
//     setItemsPerPage,
//     sidebarOpen,
//     setSidebarOpen,
//     filters,
//     setFilters,
//     availableCategories,
//     getFilterCount,
//   } = logic;

//   const toolbarRef = useRef(null);
  
//   // 1. Estado para el Modal de Edición (Overlay existente)
//   const [selectedProduct, setSelectedProduct] = useState(null); 
  
//   // 2. Estado para el Modal de CREACIÓN (Nuevo)
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // ¡NUEVO ESTADO!

//   // Lógica para el modal de edición
//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };

//   const handleCloseOverlay = () => {
//     setSelectedProduct(null);
//   };

//   // 3. Lógica para el modal de creación (NUEVAS FUNCIONES)
//   const handleOpenCreateModal = () => {
//     setIsCreateModalOpen(true);
//   };

//   const handleCloseCreateModal = () => {
//     setIsCreateModalOpen(false);
//   };
//   // --------------------------------------------------------

//   // Función que actualizará los productos después de editar/crear
//   const handleSaveProduct = async (id, updates) => {
//     console.log("Guardando producto:", id, updates);
//     // Nota: La lógica de actualización del estado y recarga de productos
//     // se manejará dentro de Redux después del dispatch en CreateProduct.
//   };

//   if (loading) return <div className="flex justify-center p-20">Cargando...</div>;
//   if (error) return <div className="text-center text-red-600 p-20">Error: {error}</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-x-hidden">
//       <div className="max-w-7xl mx-auto px-4 py-8">
        
//         {/* Barra de herramientas */}
//         <ProductsToolbar
//           ref={toolbarRef} 
//           onAdminProductSelect={handleProductClick} 
//           onOpenCreateModal={handleOpenCreateModal} // <-- ¡PASAR LA FUNCIÓN DE APERTURA!
//           {...{
//             searchTerm,
//             setSearchTerm,
//             sortBy,
//             setSortBy,
//             itemsPerPage,
//             setItemsPerPage,
//             viewMode,
//             setViewMode,
//             sidebarOpen,
//             setSidebarOpen,
//             getFilterCount,
//           }}
//         />
        
//         {/* Grid de Productos */}
//         {currentProducts.length > 0 ? (
//           <>
//             <ProductsGrid
//               products={currentProducts}
//               viewMode={viewMode}
//               addToCart={addToCart}
//               onProductClick={handleProductClick} 
//             />
//             <ProductsPagination
//               totalPages={totalPages}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               scrollToRef={toolbarRef}
//             />
//           </>
//         ) : (
//           <NoResults />
//         )}
//       </div>

//       <FilterSidebar
//         filters={filters}
//         onFilterChange={setFilters}
//         isOpen={sidebarOpen}
//         onToggle={() => setSidebarOpen(false)}
//         categories={availableCategories}
//       />

//       {/* 4. Renderizado del Modal de CREACIÓN (NUEVO) */}
//       <CreateProduct
//         isOpen={isCreateModalOpen}
//         onClose={handleCloseCreateModal}
//       />

//       {/* Overlay de edición (Existente) */}
//       {selectedProduct && (
//         <ProductEditorOverlay
//           product={selectedProduct}
//           onClose={handleCloseOverlay}
//           onSave={handleSaveProduct}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductsPage;


import React, { useRef, useState } from "react";
import { useProductsLogic } from "../../pages/Products/hooks/useProductsLogic";
import ProductsToolbar from "../adminToolbar/adminToolbar";
import ProductsGrid from "../adminProductsGrid/adminProductsGrid";
import ProductsPagination from "../../pages/Products/components/ProductsPagination";
import NoResults from "../../pages/Products/components/NoResult";
import FilterSidebar from "../../pages/Products/ProductFilter/ProductFilter";
import ProductEditorOverlay from "./AdminProductCard/AdminProductOverlay/ProductEditOverlay";
import ProductCreatorOverlay from "../../admin/products/adminCreateProduct/adminProductCreate"; // <-- Nuevo componente
import Footer from "../../components/Footer/Footer"
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

  // Estado para el modal de edición
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estado para el modal de creación
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Funciones para abrir/cerrar modales
  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseOverlay = () => setSelectedProduct(null);
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);

  // Función para manejar guardado (opcional, puede usarse con Redux)
  const handleSaveProduct = async (id, updates) => {
    console.log("Guardando producto:", id, updates);
    // Lógica de actualización se maneja dentro del thunk/redux
  };

  if (loading) return <div className="flex justify-center p-20">Cargando...</div>;
  if (error) return <div className="text-center text-red-600 p-20">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Barra de herramientas */}
        <ProductsToolbar
          ref={toolbarRef}
          onAdminProductSelect={handleProductClick}
          onOpenCreateModal={handleOpenCreateModal} // PASAMOS LA FUNCIÓN
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

        {/* Grid de Productos */}
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

      {/* Overlay de creación */}
      {isCreateModalOpen && (
        <ProductCreatorOverlay
          onClose={handleCloseCreateModal}
        />
      )}

      {/* Overlay de edición */}
      {selectedProduct && (
        <ProductEditorOverlay
          product={selectedProduct}
          onClose={handleCloseOverlay}
          onSave={handleSaveProduct}
        />
      )}
      {/* <Footer/> */}
    </div>
  );
};

export default ProductsPage;
