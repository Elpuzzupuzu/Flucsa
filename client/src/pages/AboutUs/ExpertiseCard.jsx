import React from 'react';
import { CheckCircle } from 'lucide-react'; 

const ExpertiseCard = ({ icon: Icon, title, description, features = [], animationClass, id, style }) => (
    <div 
        className={`glass-card rounded-3xl p-8 shadow-xl hover-lift group ${animationClass}`}
        data-animate
        id={id}
        style={style}
    >
        {/* Ícono */}
        <div className="w-16 h-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 sparkle">
            {Icon && <Icon className="w-8 h-8 text-white" />}
        </div>
        
        {/* Título */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
        
        {/* Descripción */}
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
        
        {/* Lista de features */}
        {features.length > 0 && (
            <ul className="space-y-2">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#3B82F6] mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>
        )}
        
        {/* Botón */}
        <button className="mt-6 flex items-center text-sm font-semibold text-[#1E3A8A] hover:text-[#3B82F6] transition-colors">
            Saber Más
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
            </span>
        </button>
    </div>
);

export default ExpertiseCard;
