import React from 'react';
import ValueCard from './ValueCard';

const MissionVisionSection = ({ values, getAnimationClass, AwardIcon, TrendingUpIcon, StarIcon, CheckCircleIcon }) => (
    // Fondo corporativo: Blanco a gris muy claro
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative">
        
        {/* Línea decorativa superior sutil */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-30"></div>
        
        <div className="max-w-7xl mx-auto relative">
            
            {/* Título de la Sección */}
            <div 
                className={`text-center mb-20 ${getAnimationClass('mission')}`}
                data-animate
                id="mission"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
                    Misión & Visión
                </h2>
                <div className="w-16 h-0.5 bg-blue-900 mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
                    Los pilares que guían nuestro compromiso con la excelencia
                </p>
            </div>
            
            {/* Cards Minimalistas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
                
                {/* Mission Card */}
                <div 
                    className={`bg-white rounded-lg p-12 border border-gray-200 hover:border-blue-900 transition-all duration-300 hover:shadow-xl ${getAnimationClass('missionCard', 'scale-in')}`}
                    data-animate
                    id="missionCard"
                >
                    <div className="flex items-start mb-6">
                        <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center mr-5 flex-shrink-0">
                            <AwardIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Nuestra Misión</h3>
                            <div className="w-12 h-0.5 bg-blue-600"></div>
                        </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-base mb-8 font-light">
                        Ofrecer soluciones hidráulicas de vanguardia, superando las expectativas de nuestros clientes con productos de calidad, servicio confiable e innovación continua, contribuyendo al desarrollo sostenible de nuestras comunidades.
                    </p>
                    
                    <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Calidad Premium</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Servicio Confiable</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Innovación Continua</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Desarrollo Sostenible</span>
                        </div>
                    </div>
                </div>
                
                {/* Vision Card */}
                <div 
                    className={`bg-white rounded-lg p-12 border border-gray-200 hover:border-blue-900 transition-all duration-300 hover:shadow-xl ${getAnimationClass('visionCard', 'scale-in')}`}
                    data-animate
                    id="visionCard"
                >
                    <div className="flex items-start mb-6">
                        <div className="w-12 h-12 bg-blue-900 rounded flex items-center justify-center mr-5 flex-shrink-0">
                            <TrendingUpIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-1">Nuestra Visión</h3>
                            <div className="w-12 h-0.5 bg-blue-600"></div>
                        </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-base mb-8 font-light">
                        Ser el líder y referente de la industria hidráulica a nivel nacional, reconocidos por nuestra excelencia, compromiso con la calidad y la capacidad de adaptarnos a las necesidades de un mercado en constante evolución.
                    </p>
                    
                    <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                            <StarIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Liderazgo Nacional</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <StarIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Excelencia Reconocida</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <StarIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Adaptabilidad</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <StarIcon className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0" />
                            <span className="text-sm font-medium">Innovación Constante</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        {/* Línea decorativa inferior sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-900 to-transparent opacity-30"></div>
    </section>
);

export default MissionVisionSection;
