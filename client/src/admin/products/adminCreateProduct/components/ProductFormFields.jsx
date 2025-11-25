import React from 'react';
import { DollarSign, FileText, Tag, Package } from 'lucide-react';

// Imports de los Selects dinámicos (manteniendo la ruta del usuario)
import { MainCategorySelect } from "../../../../components/selects/productsSelects/MainCategorySelect";
import { SubCategorySelect } from "../../../../components/selects/productsSelects/SubCategorySelect";
import { LocationSelect } from "../../../../components/selects/productsSelects/LocationSelect";

// Componente simple para Inputs
const FormInput = ({ label, name, icon: Icon, type = 'text', placeholder, value, onChange, color = 'green' }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
      <Icon className={`w-4 h-4 text-${color}-600`} />
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-${color}-500`}
    />
  </div>
);

const ProductFormFields = ({ formData, handleChange, handleSelectChange }) => {
  return (
    <>
      {/* Nombre */}
      <FormInput
        label="Nombre del Producto"
        name="nombre"
        icon={FileText}
        placeholder="Ej: Producto Premium"
        value={formData.nombre}
        onChange={handleChange}
      />

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
            // Se usa pl-10 para compensar el signo de dólar
            className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Código */}
      <FormInput
        label="Código del Producto"
        name="codigo"
        icon={Tag}
        placeholder="Ej: ABC123"
        value={formData.codigo}
        onChange={handleChange}
      />
      
      {/* Existencias (Stock) */}
      <FormInput
        label="Existencias"
        name="existencias"
        icon={Package}
        type="number"
        placeholder="0"
        value={formData.existencias}
        onChange={handleChange}
      />

      {/* Marca (Brand) */}
      <FormInput
        label="Marca"
        name="marca"
        icon={Tag}
        placeholder="Ej: TechPro"
        value={formData.marca}
        onChange={handleChange}
      />
      
      {/* Ventas Anuales */}
      <FormInput
        label="Ventas Anuales Estimadas"
        name="ventas_anuales"
        icon={DollarSign}
        type="number"
        placeholder="0"
        value={formData.ventas_anuales}
        onChange={handleChange}
      />

      {/* Disponible (Checkbox) */}
      <div className="flex items-center space-x-2 pt-2">
        <input
          id="disponible"
          type="checkbox"
          name="disponible"
          checked={formData.disponible}
          onChange={handleChange}
          className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
        <label htmlFor="disponible" className="text-sm font-semibold text-gray-700">
          Disponible para Venta
        </label>
      </div>


      {/* Selects Dinámicos */}
      <h3 className="pt-4 text-lg font-bold text-gray-800 border-t mt-4">Clasificación y Ubicación</h3>
      
      <MainCategorySelect
        value={formData.categoria_principal_id}
        onChange={(value) => handleSelectChange("categoria_principal_id", value)}
      />

      <SubCategorySelect
        value={formData.subcategoria_id}
        onChange={(value) => handleSelectChange("subcategoria_id", value)}
        parentCategoryId={formData.categoria_principal_id}
      />

      <LocationSelect
        value={formData.ubicacion_id}
        onChange={(value) => handleSelectChange("ubicacion_id", value)}
      />
    </>
  );
};

export default ProductFormFields;