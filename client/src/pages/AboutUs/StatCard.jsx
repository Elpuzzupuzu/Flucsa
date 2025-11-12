import React from 'react';

const StatCard = ({ icon: Icon, number, label }) => (
    // Efecto de levantamiento (hover-lift) sutil y profesional
    <div className="text-center group transition-transform duration-300 hover:scale-[1.03]">
        {/* Contenedor del Icono: Azul Marino Profundo (Se mantiene como acento) */}
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-3xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/40">
            <Icon className="w-10 h-10 text-white" />
        </div>
        
        {/* Número: Gris Carbón Profundo (Seriedad base) */}
        <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#1E3A8A]">
            {number}
        </div>
        
        {/* Etiqueta: Gris Oscuro (Limpieza y legibilidad) */}
        <div className="text-gray-700 font-semibold text-lg transition-colors duration-300">
            {label}
        </div>
    </div>
);

export default StatCard;