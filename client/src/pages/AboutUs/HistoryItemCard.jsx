import React from 'react';
import HistoryItemCard from './HistoryItemCard';

const HistorySection = ({ historyItems = [], getAnimationClass = () => '', UsersIcon }) => (
    <section className="bg-white py-24 px-6 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-20 ${getAnimationClass('history')}`} data-animate id="history">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight text-gray-900">
                    Nuestra Historia
                </h2>
                <div className="w-16 h-0.5 bg-blue-900 mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
                    Una trayectoria de excelencia e innovación que comenzó con una visión y se ha convertido en liderazgo
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-6">
                    {historyItems.map((item) => (
                        <HistoryItemCard
                            key={item.id || item.title}
                            {...item}
                            animationClass={getAnimationClass(`history-${item.id || item.title}`)}
                            id={`history-${item.id || item.title}`}
                            style={{ animationDelay: `${(item.id || item.title).toString().slice(-2) * 0.2}s` }}
                        />
                    ))}
                </div>

                <div className="space-y-6 lg:sticky lg:top-24">
                    {[{
                        title: 'Equipo Fundador',
                        description: 'Los visionarios que iniciaron esta gran historia con determinación y visión de futuro.',
                    }, {
                        title: 'Nuestro Equipo Actual',
                        description: 'Profesionales comprometidos con la excelencia y el futuro de la industria.',
                    }].map((card, idx) => (
                        <div
                            key={card.title}
                            className={`bg-white border border-gray-200 rounded-lg p-8 hover:border-blue-900 transition-all duration-300 hover:shadow-lg ${idx === 0 ? getAnimationClass('images', 'scale-in') : ''}`}
                            data-animate
                            id={idx === 0 ? 'images' : undefined}
                        >
                            <div className="flex items-start">
                                {UsersIcon && (
                                    <div className="w-16 h-16 bg-blue-900 rounded flex items-center justify-center mr-6 flex-shrink-0">
                                        <UsersIcon className="w-8 h-8 text-white" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h4>
                                    <div className="w-12 h-0.5 bg-blue-600 mb-3"></div>
                                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-8 text-white text-center">
                        <div className="text-4xl font-bold mb-2">25+</div>
                        <div className="text-blue-200 text-sm font-medium uppercase tracking-wide">
                            Años de Experiencia
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    </section>
);

export default HistorySection;
