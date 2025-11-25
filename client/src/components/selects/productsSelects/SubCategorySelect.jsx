import React from "react";
import { Tag } from "lucide-react";
import { useSubCategories } from "../../../hooks/subCategory/useSubCategories";

export const SubCategorySelect = ({
  value,
  onChange,
  parentCategoryId,
}) => {

  // ⬅️ Muy importante: cargar solo subcategorías de la categoría seleccionada
  const { subcategories, loading } = useSubCategories(parentCategoryId);

  const disabled = !parentCategoryId || loading;

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Tag className="w-4 h-4 text-purple-600" />
        Subcategoría
      </label>

      <select
        disabled={disabled}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border-2 rounded-xl px-4 py-3 transition-all
          ${disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          }`}
      >
        {!parentCategoryId ? (
          <option value="">Seleccione primero una categoría</option>
        ) : loading ? (
          <option value="">Cargando subcategorías...</option>
        ) : (
          <>
            <option value="">Seleccione una subcategoría</option>
            {subcategories.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.nombre}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};
