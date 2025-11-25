import React from "react";
import { X, Package } from "lucide-react";

// Importar el custom hook con toda la lógica (Ruta corregida con extensión .js)
import { useProductCreatorForm } from "./components/useProductCreateForm.jsx";

// Importar los componentes de presentación (Rutas corregidas con extensión .jsx)
import ImageUploadField from "./components/ImageUploadField.jsx";
import ProductFormFields from "./components/ProductFormFields.jsx";
import ProductOverlayFooter from "./components/ProductOverlayFooter.jsx";

// Nota: El original importaba Redux/API/Selects,
// pero esos ahora son manejados por el hook o los subcomponentes.

const ProductCreatorOverlay = ({ onClose }) => {
  // 1. Uso del Custom Hook: toda la lógica de estado y handlers
  const {
    formData,
    saving,
    dragActive,
    error,
    handleChange,
    handleSelectChange,
    handleFileChange,
    handleDrag,
    handleDrop,
    handleSave,
  } = useProductCreatorForm(onClose);

  return (
    <>
      {/* Fondo de oscurecimiento */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Overlay principal */}
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

          {/* Contenido (Scrollable) */}
          <div className="flex-grow overflow-y-auto px-6 py-6 space-y-5">
            {/* Imagen Modularizada */}
            <ImageUploadField
              formData={formData}
              handleFileChange={handleFileChange}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              dragActive={dragActive}
            />

            {/* Campos de Formulario Modularizados */}
            <ProductFormFields
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
          </div>

          {/* Footer Modularizado */}
          <ProductOverlayFooter 
            handleSave={handleSave}
            saving={saving}
            onClose={onClose}
            error={error}
          />
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