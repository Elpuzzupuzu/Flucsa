import React from 'react';
import ValueCard from './ValueCard';

const MissionVisionSection = ({ values, getAnimationClass, AwardIcon, TrendingUpIcon, StarIcon, CheckCircleIcon }) => (
    <section className="py-20 px-6 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
            <div 
                className={`text-center mb-16 ${getAnimationClass('mission')}`}
                data-animate
                id="mission"
            >
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                    Misión & Visión
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                    Los pilares que guían nuestro compromiso con la excelencia
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Mission Card */}
                <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#ED0000] transition-all duration-500 hover-lift ${getAnimationClass('missionCard', 'scale-in')}`}
                    data-animate
                    id="missionCard"
                >
                    <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center mr-6 sparkle">
                            <AwardIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">Nuestra Misión</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-lg mb-6">
                        Ofrecer soluciones hidráulicas de vanguardia, superando las expectativas de nuestros clientes con productos de calidad, servicio confiable e innovación continua, contribuyendo al desarrollo sostenible de nuestras comunidades.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#ED0000] mr-2" />
                            <span>Calidad Premium</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#ED0000] mr-2" />
                            <span>Servicio Confiable</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#ED0000] mr-2" />
                            <span>Innovación Continua</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-4 h-4 text-[#ED0000] mr-2" />
                            <span>Desarrollo Sostenible</span>
                        </div>
                    </div>
                </div>
                
                {/* Vision Card */}
                <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#ED0000] transition-all duration-500 hover-lift ${getAnimationClass('visionCard', 'scale-in')}`}
                    data-animate
                    id="visionCard"
                >
                    <div className="flex items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center mr-6 sparkle">
                            <TrendingUpIcon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold">Nuestra Visión</h3>
                    </div>
                    <p className="text-white/90 leading-relaxed text-lg mb-6">
                        Ser el líder y referente de la industria hidráulica a nivel nacional, reconocidos por nuestra excelencia, compromiso con la calidad y la capacidad de adaptarnos a las necesidades de un mercado en constante evolución.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>Liderazgo Nacional</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>Excelencia Reconocida</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>Adaptabilidad</span>
                        </div>
                        <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-2" />
                            <span>Innovación Constante</span>
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
                    <div className="w-16 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <ValueCard key={index} {...value} />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default MissionVisionSection;