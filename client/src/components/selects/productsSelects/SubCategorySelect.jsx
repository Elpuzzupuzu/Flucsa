import React, { useState, useRef, useEffect } from "react";
import { Tag, ChevronDown } from "lucide-react";
import { useSubCategories } from "../../../hooks/subCategory/useSubCategories";

// ----------------------------------------------------
// Componente de Select Personalizado (sin búsqueda)
// ----------------------------------------------------
export const SubCategorySelect = ({
  value,
  onChange,
  parentCategoryId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // ⬅️ Muy importante: cargar solo subcategorías de la categoría seleccionada
  const { subcategories, loading } = useSubCategories(parentCategoryId);

  const disabled = !parentCategoryId || loading;

  // Valor actualmente seleccionado
  const selectedSubcategory = subcategories.find(sc => sc.id === value);
  const displayValue = selectedSubcategory ? selectedSubcategory.nombre : "Seleccione una subcategoría";

  // Manejar clics fuera del componente para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (scId) => {
    onChange(scId);
    setIsOpen(false);
  };

  // Contenido de la lista basado en el estado
  let listContent;
  if (!parentCategoryId) {
    listContent = <div className="p-3 text-sm text-gray-500">Seleccione primero una categoría</div>;
  } else if (loading) {
    listContent = <div className="p-3 text-sm text-gray-500">Cargando subcategorías...</div>;
  } else if (subcategories.length === 0) {
     listContent = <div className="p-3 text-sm text-gray-500">No se encontraron subcategorías.</div>;
  } else {
    // Las opciones
    listContent = subcategories.map((sc) => (
      <div
        key={sc.id}
        onClick={() => handleSelect(sc.id)}
        className={`p-3 cursor-pointer hover:bg-purple-50 transition-colors
          ${sc.id === value ? "bg-purple-100 font-semibold text-purple-700" : "text-gray-800"}
        `}
      >
        {sc.nombre}
      </div>
    ));
  }


  return (
    <div className="space-y-2 relative" ref={selectRef}>
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
        <Tag className="w-4 h-4 text-purple-600" />
        Subcategoría
      </label>

      {/* Botón de control (Reemplaza al <select>) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full border-2 rounded-xl px-4 py-3 text-left transition-all flex justify-between items-center
          ${disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          }
        `}
      >
        <span className={!value && "text-gray-400"}>
          {disabled ? "Seleccione primero una categoría" : displayValue}
        </span>
        <ChevronDown 
            className={`w-4 h-4 transition-transform ${isOpen && !disabled ? "rotate-180 text-purple-500" : "text-gray-500"}`} 
        />
      </button>

      {/* Menú Desplegable (Con Max-Height y Scroll) */}
      {isOpen && !disabled && (
        <div 
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg 
                     max-h-60 overflow-y-auto" // SOLUCIÓN AL TAMAÑO
        >
          {/* Opción para limpiar selección / Placeholder */}
          <div
            onClick={() => handleSelect("")}
            className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors text-gray-500 border-b`}
          >
            Seleccione una subcategoría
          </div>
          
          {listContent}

        </div>
      )}
    </div>
  );
};