import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialsSection = ({ testimonials, getAnimationClass }) => (
    <section className="bg-slate-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
            <div 
                className={`text-center mb-16 ${getAnimationClass('testimonials')}`}
                data-animate
                id="testimonials"
            >
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                    <span className="gradient-text">Lo que Dicen</span> Nuestros Clientes
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Historias reales de éxito que demuestran nuestro compromiso con la excelencia
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