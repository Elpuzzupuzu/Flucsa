import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text, rating, avatar }) => (
    <div className="bg-white rounded-lg p-8 shadow-md border border-gray-200 transition-all duration-300 hover:border-blue-900 hover:shadow-lg group">
        
        <div className="flex items-start mb-6">
            {/* Avatar minimalista */}
            <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center text-white font-semibold text-base flex-shrink-0 mr-4">
                {avatar}
            </div>
            <div className="flex-1">
                {/* Nombre y rol */}
                <h4 className="font-semibold text-lg text-gray-900 mb-1">{name}</h4>
                <p className="text-xs text-gray-500 uppercase tracking-wide">{role}</p>
            </div>
        </div>
        
        {/* Separador sutil */}
        <div className="w-12 h-0.5 bg-blue-600 mb-5"></div>
        
        {/* Texto del testimonio - sin cursiva para mayor profesionalismo */}
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
            "{text}"
        </p>
        
        {/* Rating con diseño más corporativo */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                    <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rating ? 'text-blue-900' : 'text-gray-300'}`}
                        fill={i < rating ? 'currentColor' : 'none'} 
                    />
                ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">{rating}.0/5.0</span>
        </div>
    </div>
);

export default TestimonialCard;