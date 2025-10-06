import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AdminProductCard from "./AdminProductCard/AdminProductCard";
import { fetchAdminProducts, updateAdminProduct } from "../../features/products/adminProductsSlice";
import api from "../../api/axios";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.adminProducts);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.nombre || "",
        description: selectedProduct.descripcion || "",
        price: selectedProduct.precio || "",
        image: selectedProduct.imagen || "",
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
    setFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(selected) }));
    }
  };

  const handleSave = async () => {
    if (!selectedProduct) return;
    setSaving(true);

    try {
      let imageUrl = formData.image; // Mantener URL existente por defecto

      // Subir imagen si hay archivo nuevo
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("imagen", file);

        const response = await api.post("/products/upload-image", formDataImage);
        imageUrl = response.data.imageUrl;
      }

      // Payload de actualización
      const payload = {
        id: selectedProduct.id,
        updates: {
          nombre: formData.name,
          descripcion: formData.description,
          precio: formData.price,
          imagen: imageUrl,
        },
        file: file, // opcional, usado por slice si quieres enviar
      };

      await dispatch(updateAdminProduct(payload)).unwrap();

      alert("✅ Producto actualizado correctamente");
      handleCloseOverlay();
      dispatch(fetchAdminProducts());
    } catch (err) {
      console.error("❌ Error al actualizar producto:", err);
      alert("Error al actualizar producto");
    }

    setSaving(false);
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
              onClick={() => handleEditClick(product)}
              className="cursor-pointer"
            >
              <AdminProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {overlayOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-2xl z-50">
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Editar Producto</h2>
              <button
                onClick={handleCloseOverlay}
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imagen
                </label>
                <input type="file" name="imagen" onChange={handleFileChange} />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="mt-2 w-full h-40 object-contain rounded-md"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className={`mt-4 w-full py-3 rounded-lg font-bold text-white ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
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
