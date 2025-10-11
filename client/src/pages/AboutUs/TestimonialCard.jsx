import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ name, role, text, rating, avatar }) => (
    <div className="glass-card rounded-3xl p-8 shadow-xl hover-lift group">
        <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#1C2E82] to-[#ED0000] rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mr-4">
                {avatar}
            </div>
            <div>
                <h4 className="font-bold text-lg text-[#1C2E82]">{name}</h4>
                <p className="text-sm text-slate-500">{role}</p>
            </div>
        </div>
        <p className="text-slate-700 italic mb-6">"{text}"</p>
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`}
                    fill={i < rating ? 'currentColor' : 'none'} 
                />
            ))}
        </div>
    </div>
);

export default TestimonialCard;