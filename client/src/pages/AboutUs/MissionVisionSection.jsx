import React from 'react';
import ValueCard from './ValueCard';

const MissionVisionSection = ({ values, getAnimationClass, AwardIcon, TrendingUpIcon, StarIcon, CheckCircleIcon }) => (
    // 1. Fondo en Azul Marino Profundo (Seriedad y Confianza)
    <section className="py-20 px-6 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white relative overflow-hidden">
        {/* Elementos de fondo borrosos para dar profundidad, usando blanco y el azul de acento */}
        <div className="absolute inset-0 opacity-10">
            {/* Usamos el azul de acento para los blurs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#60A5FA] rounded-full blur-3xl"></div> 
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#1E3A8A] rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
            {/* Título de la Sección */}
            <div 
                className={`text-center mb-16 ${getAnimationClass('mission')}`}
                data-animate
                id="mission"
            >
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Misión & Visión
                </h2>
                {/* Separador elegante en Blanco para alto contraste */}
                <div className="w-20 h-1 bg-white mx-auto mb-6 rounded-full opacity-90"></div>
                {/* Párrafo: Opacidad ajustada para legibilidad perfecta */}
                <p className="text-white/95 text-xl max-w-3xl mx-auto leading-relaxed">
                    Los pilares que guían nuestro compromiso con la excelencia.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Mission Card (Fondo blanco translúcido sobre azul) */}
                <div 
                    className={`bg-white/20 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#60A5FA] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/60 ${getAnimationClass('missionCard', 'scale-in')}`}
                    data-animate
                    id="missionCard"
                >
                    <div className="flex items-center mb-8">
                        {/* Ícono consistente con el azul de acento */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                            <AwardIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">Nuestra Misión</h3>
                    </div>
                    {/* Texto con alta opacidad para legibilidad */}
                    <p className="text-white leading-relaxed text-lg mb-6">
                        Ofrecer soluciones hidráulicas de vanguardia, superando las expectativas de nuestros clientes con productos de calidad, servicio confiable e innovación continua, contribuyendo al desarrollo sostenible de nuestras comunidades.
                    </p>
                    {/* Lista de Puntos: Azul claro (Acción/Proceso) */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#60A5FA] mr-2" />
                            <span className="font-medium">Calidad Premium</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#60A5FA] mr-2" />
                            <span className="font-medium">Servicio Confiable</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#60A5FA] mr-2" />
                            <span className="font-medium">Innovación Continua</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#60A5FA] mr-2" />
                            <span className="font-medium">Desarrollo Sostenible</span>
                        </div>
                    </div>
                </div>
                
                {/* Vision Card (Fondo blanco translúcido sobre azul) */}
                <div 
                    className={`bg-white/20 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#60A5FA] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/60 ${getAnimationClass('visionCard', 'scale-in')}`}
                    data-animate
                    id="visionCard"
                >
                    <div className="flex items-center mb-8">
                        {/* Ícono consistente con el azul de acento */}
                        <div className="w-16 h-16 bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                            <TrendingUpIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">Nuestra Visión</h3>
                    </div>
                    {/* Texto con alta opacidad para legibilidad */}
                    <p className="text-white leading-relaxed text-lg mb-6">
                        Ser el líder y referente de la industria hidráulica a nivel nacional, reconocidos por nuestra excelencia, compromiso con la calidad y la capacidad de adaptarnos a las necesidades de un mercado en constante evolución.
                    </p>
                    {/* Lista de Puntos: Amarillo (Meta/Logro) */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-300 mr-2" />
                            <span className="font-medium">Liderazgo Nacional</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-300 mr-2" />
                            <span className="font-medium">Excelencia Reconocida</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-300 mr-2" />
                            <span className="font-medium">Adaptabilidad</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-300 mr-2" />
                            <span className="font-medium">Innovación Constante</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div 
                className={getAnimationClass('values')}
                data-animate
                id="values"
            >
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold mb-4">Nuestros Valores</h3>
                    {/* Separador usando el Azul de acento */}
                    <div className="w-16 h-1 bg-[#60A5FA] mx-auto rounded-full"></div>
                </div>
                {/* La tarjeta ValueCard debe ser ajustada a fondo oscuro */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Asumiendo que ValueCard está preparado para un fondo oscuro (text-white) */}
                    {values.map((value, index) => (
                        <ValueCard key={index} {...value} />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default MissionVisionSection;