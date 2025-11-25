import React from 'react';
import { ImageIcon, Upload } from 'lucide-react';

const ImageUploadField = ({
  formData,
  handleFileChange,
  handleDrag,
  handleDrop,
  dragActive,
}) => {
  return (
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
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 bg-white hover:border-green-400'
        }`}
      >
        {/* Input de archivo invisible para el click */}
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
  );
};

export default ImageUploadField;