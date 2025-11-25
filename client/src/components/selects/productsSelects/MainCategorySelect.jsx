import React from "react";
import { useMainCategories } from "../../../hooks/mainCategory/useMainCategories";

export const MainCategorySelect = ({
  value,
  onChange,
  label = "Categoría principal",
}) => {
  const { categories, loading } = useMainCategories();

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="
          w-full px-3 py-2
          border border-gray-300 rounded-lg
          bg-white text-gray-800
          shadow-sm
          focus:outline-none focus:ring-2
          focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
        "
      >
        <option value="">Seleccione una categoría</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};
