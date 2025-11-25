import React from 'react';
import { Save, Loader2 } from 'lucide-react';

const ProductOverlayFooter = ({ handleSave, saving, onClose, error }) => {
  return (
    // Reducido de py-4 a py-3 y de space-y-2.5 a space-y-2
    <div className="border-t-2 border-gray-200 bg-white px-6 py-3 space-y-2">
      {error && (
        <p className="text-red-500 text-sm mb-2 break-words text-center font-medium p-2 bg-red-50 border border-red-200 rounded-lg">{error}</p>
      )}
      
      <button
        onClick={handleSave}
        disabled={saving}
        // Reducido de py-2.5 a py-2
        className={`w-full py-2 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-lg hover:shadow-green-300"
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
        // Reducido de py-2.5 a py-2
        className="w-full py-2 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all"
      >
        Cancelar
      </button>
    </div>
  );
};

export default ProductOverlayFooter;