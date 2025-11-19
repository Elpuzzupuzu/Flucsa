import React from 'react';

const HistoryItemCard = ({ icon: Icon, title, description, gradient, animationClass, id, style }) => (
    <div 
        className={`bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-900 hover:shadow-lg transition-all duration-300 ${animationClass}`}
        data-animate
        id={id}
        style={style}
    >
        <div className="flex items-start space-x-5">
            {/* Ícono corporativo minimalista */}
            <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
                {/* Título con separador */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <div className="w-10 h-0.5 bg-blue-600 mb-3"></div>
                
                {/* Descripción */}
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
        </div>
    </div>
);

export default HistoryItemCard;