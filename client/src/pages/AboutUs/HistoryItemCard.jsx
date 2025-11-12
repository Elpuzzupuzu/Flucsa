import React from 'react';

const HistoryItemCard = ({ icon: Icon, title, description, gradient, animationClass, id, style }) => (
    <div 
        // Usa glass-card (transparente, blur) y hover-lift (sombra azul sutil), definidos en CSSStyles
        className={`glass-card rounded-3xl p-8 shadow-xl hover-lift ${animationClass}`}
        data-animate
        id={id}
        style={style}
    >
        <div className="flex items-start space-x-4">
            {/* Ícono: Usa el degradado azul corporativo (definido por 'gradient' prop) y el efecto sparkle */}
            <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center flex-shrink-0 sparkle`}>
                <Icon className="w-7 h-7 text-white" />
            </div>
            <div>
                {/* Título: Usando Gris Carbón Oscuro para máxima seriedad y legibilidad */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
                {/* Descripción: Gris Oscuro estándar para consistencia */}
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

export default HistoryItemCard;