import React from 'react';

const FooterCTA = ({ getAnimationClass, ArrowRightIcon }) => (
    <section className="bg-gradient-to-r from-[#1C2E82] to-[#ED0000] py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
            <div 
                className={`text-white ${getAnimationClass('cta')}`}
                data-animate
                id="cta"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    ¿Listo para iniciar tu próximo proyecto?
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
                    Nuestro equipo de expertos está esperando para brindarte la mejor solución hidráulica.
                </p>
                <a 
                    href="/contacto" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-[#1C2E82] rounded-full shadow-lg hover:bg-slate-100 transition-colors duration-300 transform hover-lift sparkle"
                >
                    Contáctanos Hoy
                    <ArrowRightIcon className="w-5 h-5 ml-3" />
                </a>
            </div>
        </div>
    </section>
);

export default FooterCTA;