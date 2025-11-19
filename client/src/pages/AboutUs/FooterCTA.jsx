import React from 'react';

const FooterCTA = ({ getAnimationClass, ArrowRightIcon }) => (
    <section className="bg-blue-900 py-20 px-6 relative">
        
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/20"></div>
        
        <div className="max-w-5xl mx-auto text-center relative">
            <div 
                className={`text-white ${getAnimationClass('cta')}`}
                data-animate
                id="cta"
            >
                {/* Título profesional */}
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
                    ¿Listo para iniciar tu próximo proyecto?
                </h2>
                
                {/* Separador sutil */}
                <div className="w-16 h-0.5 bg-white/60 mx-auto mb-6"></div>
                
                {/* Descripción */}
                <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                    Nuestro equipo de expertos está esperando para brindarte la mejor solución hidráulica
                </p>
                
                {/* Botón profesional */}
                <a 
                    href="/contacto" 
                    className="inline-flex items-center justify-center px-10 py-4 text-base font-semibold bg-white text-blue-900 rounded hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                    Contáctanos Hoy
                    <ArrowRightIcon className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                
                {/* Información de contacto adicional */}
                <div className="mt-12 pt-8 border-t border-white/20">
                    <p className="text-white/70 text-sm font-medium mb-3">
                        O llámanos directamente
                    </p>
                    <p className="text-white text-xl font-semibold">
                        +52 (999) 123-4567
                    </p>
                </div>
            </div>
        </div>
        
        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20"></div>
    </section>
);

export default FooterCTA;