// src/admin/products/ProductCreatorOverlay.jsx
import React, { useState } from "react";
import {
  X,
  Save,
  ImageIcon,
  DollarSign,
  FileText,
  Package,
  Upload,
  Loader2,
  Tag,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../features/products/adminProductsSlice";
import api from "../../../api/axios";

//  Imports de los Selects dinámicos
import { MainCategorySelect } from "../../../components/selects/productsSelects/MainCategorySelect";
import { SubCategorySelect } from "../../../components/selects/productsSelects/SubCategorySelect";
import { LocationSelect } from "../../../components/selects/productsSelects/LocationSelect";

const ProductCreatorOverlay = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria_principal_id: "",
    subcategoria_id: "",
    ubicacion_id: "",
    codigo: "",
    marca: "",
    existencias: "",
    disponible: true,
    ventas_anuales: "",
  });

  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);

  // 📌 Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 📌 Manejo para selects personalizados
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📌 File upload handlers
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFormData((prev) => ({
        ...prev,
        imagen: URL.createObjectURL(selected),
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setFormData((prev) => ({
        ...prev,
        imagen: URL.createObjectURL(selected),
      }));
    }
  };

  // 📌 Guardar producto
  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      let imageUrl = formData.imagen;

      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("imagen", file);
        const response = await api.post("/products/upload-image", formDataImage);
        imageUrl = response.data.imageUrl;
      }

      const newProduct = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        imagen: imageUrl,
        categoria_principal_id: formData.categoria_principal_id,
        subcategoria_id: formData.subcategoria_id,
        ubicacion_id: formData.ubicacion_id,
        codigo: formData.codigo,
        marca: formData.marca,
        existencias: parseInt(formData.existencias || "0", 10),
        disponible: Boolean(formData.disponible),
        ventas_anuales: parseInt(formData.ventas_anuales || "0", 10),
      };

      const resultAction = await dispatch(
        createProduct({ ...newProduct, file })
      ).unwrap();

      if (createProduct.fulfilled.match(resultAction)) {
        onClose();
      } else {
        setError(
          resultAction.payload?.message ||
            resultAction.error?.message ||
            "Error al crear producto"
        );
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error al crear producto";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 w-full sm:w-[480px] h-full bg-gradient-to-br from-white to-gray-50 shadow-2xl z-50 animate-slide-in">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Crear Producto
                  </h2>
                  <p className="text-green-100 text-sm">
                    Ingresa la información del producto
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 group"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Contenido */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-5">

            {/* Imagen */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ImageIcon className="w-4 h-4 text-green-600" />
                Imagen del Producto
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${
                  dragActive
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-white hover:border-green-400"
                }`}
              >
                <input
                  type="file"
                  name="imagen"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {formData.imagen ? (
                  <div className="space-y-2">
                    <div className="relative bg-gray-50 rounded-lg p-3 border-2 border-gray-200">
                      <img
                        src={formData.imagen}
                        alt="preview"
                        className="w-full h-32 object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-center text-xs text-gray-600 font-medium">
                      Haz clic o arrastra para cambiar la imagen
                    </p>
                  </div>
                ) : (
                  <div className="text-center space-y-2 py-3">
                    <div className="flex justify-center">
                      <div className="bg-green-50 p-3 rounded-full">
                        <Upload className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <p className="text-gray-700 font-semibold text-sm">
                      Arrastra una imagen aquí
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG o WEBP (máx. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Nombre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-green-600" />
                Nombre del Producto
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ej: Producto Premium"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 text-blue-600" />
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                placeholder="Describe las características del producto..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Precio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <DollarSign className="w-4 h-4 text-green-600" />
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600 font-bold text-lg">
                  $
                </span>
                <input
                  type="text"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Código */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4 text-green-600" />
                Código del Producto
              </label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                placeholder="Ej: ABC123"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          

            {/* Categoría Principal */}
            <MainCategorySelect
              value={formData.categoria_principal_id}
              onChange={(value) =>
                handleSelectChange("categoria_principal_id", value)
              }
            />

            {/* Subcategoría */}
            <SubCategorySelect
              value={formData.subcategoria_id}
              onChange={(value) =>
                handleSelectChange("subcategoria_id", value)
              }
              parentCategoryId={formData.categoria_principal_id}
            />

            {/* Ubicación */}
            <LocationSelect
              value={formData.ubicacion_id}
              onChange={(value) =>
                handleSelectChange("ubicacion_id", value)
              }
            />

            {error && (
              <p className="text-red-500 text-sm mt-2 break-words">{error}</p>
            )}
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 bg-white px-6 py-4 space-y-2.5">
            <button
              onClick={handleSave}
              disabled={saving}
              className={`w-full py-2.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
                saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-lg"
              }`}
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creando producto...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Crear Producto
                </>
              )}
            </button>

            <button
              onClick={onClose}
              disabled={saving}
              className="w-full py-2.5 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </>
  );
};

export default ProductCreatorOverlay;
