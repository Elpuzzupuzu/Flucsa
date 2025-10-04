// src/admin/AdminProducts.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ShoppingCart, Star } from "lucide-react";
import { supabase } from "../../../../server/src/config/supabaseClient";
import uploadImageToCloudinary from "../../../../server/src/helpers/uploadImageToCloudinary"; // Helper que crearemos
import ProductCard from "../../pages/Products/ProductCard/ProductCard"; // Reutilizamos el card

const AdminProducts = () => {
  const products = useSelector((state) => state.products.items);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    badge: "",
    image: "",
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        badge: selectedProduct.badge || "",
        image: selectedProduct.image || "",
      });
      setOverlayOpen(true);
    }
  }, [selectedProduct]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseOverlay = () => {
    setOverlayOpen(false);
    setSelectedProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!selectedProduct) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("productos")
        .update({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          badge: formData.badge,
          image: formData.image,
        })
        .eq("id", selectedProduct.id)
        .select();

      if (error) throw error;
      alert("Producto actualizado correctamente");
      setOverlayOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el producto");
    }
    setSaving(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Panel de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleEditClick(product)}
            className="cursor-pointer"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Overlay lateral */}
      {overlayOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50 transition-transform transform translate-x-0">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Editar Producto</h2>
              <button onClick={handleCloseOverlay} className="text-gray-600 hover:text-gray-900">
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Imagen</label>
                <input type="file" onChange={handleImageChange} />
                {uploading && <p className="text-sm text-gray-500 mt-1">Subiendo imagen...</p>}
                {formData.image && (
                  <img src={formData.image} alt="preview" className="mt-2 w-full h-40 object-contain rounded-md" />
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`mt-4 w-full py-3 rounded-lg font-bold text-white ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
