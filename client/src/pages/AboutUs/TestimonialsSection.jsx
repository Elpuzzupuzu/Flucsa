import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = ({ testimonials, getAnimationClass }) => (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 px-6 relative">
        
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
            
            <div 
                className={`text-center mb-20 ${getAnimationClass('testimonials')}`}
                data-animate
                id="testimonials"
            >
                {/* Título minimalista */}
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-gray-900">
                    Lo que Dicen Nuestros Clientes
                </h2>
                <div className="w-16 h-0.5 bg-blue-900 mx-auto mb-6"></div>
                
                {/* Descripción */}
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                    Historias reales de éxito que demuestran nuestro compromiso con la excelencia
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                    <div 
                        key={index}
                        className={getAnimationClass(`testimonial-${index}`, 'fade-in-up')}
                        data-animate
                        id={`testimonial-${index}`}
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        <TestimonialCard {...testimonial} />
                    </div>
                ))}
            </div>

            {/* Sección de confianza corporativa */}
            <div className="mt-16 pt-16 border-t border-gray-200">
                <div className="text-center">            
                </div>
            </div>
        </div>
        
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </section>
);

export default TestimonialsSection;