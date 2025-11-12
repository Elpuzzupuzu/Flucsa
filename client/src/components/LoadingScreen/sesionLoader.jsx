// src/components/Loaders/SessionLoader.jsx (o donde almacenes tus componentes)

import React from 'react';

const SessionLoader = () => {
  return (
    // Usa 'fixed' con 'inset-0' si quieres que cubra toda la ventana
    // o 'min-h-screen' si se renderiza dentro del div principal de App.js
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
      
      {/* Puedes añadir un spinner de carga aquí si lo deseas */}
      <svg 
        className="animate-spin h-8 w-8 text-indigo-500 mb-4" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      
      <p className="text-xl text-indigo-500 font-medium">
        Verificando sesión...
      </p>
      
      {/* Opcional: para un fondo más sutil en toda la pantalla */}
      <div className="text-sm mt-2 text-gray-400">
        Cargando la configuración de la aplicación
      </div>
    </div>
  );
};

export default SessionLoader;