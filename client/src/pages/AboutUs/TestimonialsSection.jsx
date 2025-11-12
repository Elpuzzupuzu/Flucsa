import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = ({ testimonials, getAnimationClass }) => (
    // Fondo limpio y profesional (gris muy claro)
    <section className="bg-gray-50 py-20 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
            <div 
                className={`text-center mb-16 ${getAnimationClass('testimonials')}`}
                data-animate
                id="testimonials"
            >
                {/* Título: Usamos Gris Carbón 900 para la base, y Azul Marino para el acento. */}
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
                    <span className="text-gray-900">Lo que Dicen</span> <span className="text-[#1E3A8A]">Nuestros Clientes</span>
                </h2>
                {/* Separador sólido en Azul Marino */}
                <div className="w-20 h-1 bg-[#1E3A8A] mx-auto mb-6 rounded-full"></div>
                
                {/* Párrafo en Gris Oscuro 700 para excelente legibilidad y seriedad */}
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Historias reales de éxito que demuestran nuestro compromiso con la excelencia.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>
    </section>
);

export default TestimonialsSection;