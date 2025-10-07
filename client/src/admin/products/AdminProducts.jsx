import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProductCard from "./AdminProductCard/AdminProductCard";
import { fetchAdminProducts, updateAdminProduct } from "../../features/products/adminProductsSlice";
import ProductEditorOverlay from "./AdminProductCard/AdminProductOverlay/ProductEditOverlay";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.adminProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleSave = async (id, updates) => {
    await dispatch(updateAdminProduct({ id, updates })).unwrap();
    dispatch(fetchAdminProducts());
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Panel de Productos</h1>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="cursor-pointer"
            >
              <AdminProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <ProductEditorOverlay
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AdminProducts;
