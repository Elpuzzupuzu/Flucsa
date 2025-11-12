import React from 'react';

const ValueCard = ({ icon: Icon, title, description }) => (
    <div className="text-center group">
        {/* Ícono: Fondo blanco translúcido. Hover: Degradado Azul Corporativo (reemplaza el rojo). */}
        <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#60A5FA] group-hover:to-[#3B82F6] transition-all duration-300 border border-white/30">
            <Icon className="w-10 h-10 text-white" />
        </div>
        {/* Título: Usa el color 'text-white' heredado del padre, lo cual es correcto sobre fondo azul */}
        <h4 className="font-bold text-xl mb-3">{title}</h4>
        {/* Descripción: Opacidad ajustada para mejor legibilidad */}
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
    </div>
);

export default ValueCard;