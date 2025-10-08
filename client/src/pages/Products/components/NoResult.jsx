// components/NoResults.jsx
import React from "react";

const NoResults = () => {
  return (
    <div className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100">
      <div className="text-8xl mb-6 opacity-50">🔍</div>
      <h3 className="text-2xl font-bold text-gray-700 mb-3">No se encontraron productos</h3>
      <p className="text-gray-500 text-lg">
        Intenta con otros términos de búsqueda o ajusta los filtros
      </p>
    </div>
  );
};

export default NoResults;
