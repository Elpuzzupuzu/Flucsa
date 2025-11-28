import React from 'react';

const StatCard = ({ icon: Icon, number = 0, label = '' }) => (
    <div className="text-center group">
        {/* Contenedor del Icono - Minimalista y elegante */}
        <div className="w-16 h-16 mx-auto mb-5 bg-blue-900 rounded flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
            {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
        
        {/* Número - Tipografía destacada pero profesional */}
        <div className="text-5xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">
            {number}
        </div>
        
        {/* Separador sutil */}
        <div className="w-12 h-0.5 bg-blue-600 mx-auto mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Etiqueta - Texto secundario limpio */}
        <div className="text-gray-600 font-medium text-sm uppercase tracking-wide">
            {label}
        </div>
    </div>
);

export default StatCard;
