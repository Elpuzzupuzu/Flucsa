import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text, rating, avatar }) => (
    // Base limpia y profesional con una sombra elegante
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/10 hover:scale-[1.01] group">
        <div className="flex items-center mb-6">
            {/* Avatar: Degradado en Azul Marino (Acento Visual) */}
            <div className="w-14 h-14 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mr-4 shadow-md">
                {avatar}
            </div>
            <div>
                {/* Nombre: Usando Gris Carbón 900 para máxima seriedad y autoridad sobre fondo blanco */}
                <h4 className="font-bold text-xl text-gray-900">{name}</h4>
                {/* Rol: Gris medio para seriedad y jerarquía */}
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
        
        {/* Texto del Testimonio: Gris oscuro y cursiva para énfasis (Máximo Contraste) */}
        <p className="text-gray-800 italic mb-6 leading-relaxed">"{text}"</p>
        
        {/* Rating Stars (Consistente: Amarillo/Dorado para calificación) */}
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    // Se mantiene el amarillo 500 para claridad visual
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill={i < rating ? 'currentColor' : 'none'} 
                />
            ))}
        </div>
    </div>
);

export default TestimonialCard;