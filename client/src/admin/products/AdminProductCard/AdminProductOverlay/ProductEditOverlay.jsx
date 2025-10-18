// src/admin/products/ProductEditorOverlay.jsx
import React, { useState, useEffect } from "react";
import { X, Save, ImageIcon, DollarSign, FileText, Package, Upload, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateProduct, fetchAdminProductById } from "../../../../features/products/adminProductsSlice";
import api from "../../../../api/axios";

const ProductEditorOverlay = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.nombre || "",
        description: product.descripcion || "",
        price: product.precio || "",
        image: product.imagen || "",
      });
    }
  }, [product]);

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

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(selected) }));
    }
  };

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    setError(null);

    try {
      let imageUrl = formData.image;

      // Subir imagen si hay archivo nuevo
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("imagen", file);
        const response = await api.post("/products/upload-image", formDataImage);
        imageUrl = response.data.imageUrl;
      }

      const updates = {
        nombre: formData.name,
        descripcion: formData.description,
        precio: formData.price,
        imagen: imageUrl,
      };

      // Dispatch al thunk updateProduct
      await dispatch(updateProduct({ id: product.id, updates, file })).unwrap();

      // Refrescar producto actualizado desde backend
      await dispatch(fetchAdminProductById(product.id));

      onClose();
    } catch (err) {
      console.error("❌ Error al guardar producto:", err);
      const message = err.response?.data?.message || err.message || "Error al guardar producto";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (!product) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Editar Producto</h2>
                  <p className="text-red-100 text-sm">Actualiza la información</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group" aria-label="Cerrar">
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-5">
            {/* Imagen */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon className="w-4 h-4 text-red-600" />
                Imagen del Producto
              </label>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-red-400'}`}
              >
                <input
                  type="file"
                  name="imagen"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {formData.image ? (
                  <div className="space-y-2">
                    <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
                      <img src={formData.image} alt="preview" className="w-full h-32 object-contain rounded-lg" />
                    </div>
                    <p className="text-center text-xs text-gray-600 font-medium">Haz clic o arrastra para cambiar la imagen</p>
                  </div>
                ) : (
                  <div className="text-center space-y-2 py-3">
                    <div className="flex justify-center">
                      <div className="bg-red-50 p-3 rounded-full">
                        <Upload className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-700 font-semibold text-sm">Arrastra una imagen aquí</p>
                      <p className="text-gray-500 text-xs mt-1">o haz clic para seleccionar</p>
                    </div>
                    <p className="text-xs text-gray-400">PNG, JPG o WEBP (máx. 5MB)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Nombre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-purple-600" />
                Nombre del Producto
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ej: Producto Premium"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white hover:border-purple-300"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-blue-600" />
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe las características del producto..."
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-blue-300 resize-none"
              />
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DollarSign className="w-4 h-4 text-green-600" />
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">$</span>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white hover:border-green-300 font-semibold text-gray-700"
                />
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-sm mt-2 break-words">{error}</p>}
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 bg-white px-6 py-4 space-y-2.5">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-2.5 rounded-xl font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando cambios...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Cambios
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={saving}
              className="w-full py-2.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default ProductEditorOverlay;