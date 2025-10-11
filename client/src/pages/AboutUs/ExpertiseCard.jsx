import React from 'react';
import { CheckCircle } from 'lucide-react'; // Importar CheckCircle aquí

const ExpertiseCard = ({ icon: Icon, title, description, features, animationClass, id, style }) => (
    <div 
        className={`glass-card rounded-3xl p-8 shadow-xl hover-lift group ${animationClass}`}
        data-animate
        id={id}
        style={style}
    >
        <div className="w-16 h-16 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 sparkle">
            <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#1C2E82] mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
        <ul className="space-y-2">
            {features.map((feature, i) => (
                <li key={i} className="flex items-center text-slate-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <button className="mt-6 flex items-center text-sm font-semibold text-[#1C2E82] hover:text-[#ED0000] transition-colors">
            Saber Más
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
            </span>
        </button>
    </div>
);

export default ExpertiseCard;