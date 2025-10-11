import React from 'react';
import HistoryItemCard from './HistoryItemCard';

const HistorySection = ({ historyItems, getAnimationClass, UsersIcon }) => (
    <section className="bg-gradient-to-br from-slate-100 to-blue-50 py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
            <div 
                className={`text-center mb-16 ${getAnimationClass('history')}`}
                data-animate
                id="history"
            >
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                    <span className="gradient-text">Nuestra</span> Historia
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Una trayectoria de excelencia e innovación que comenzó con una visión y se ha convertido en liderazgo
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    {historyItems.map((item, index) => (
                        <HistoryItemCard 
                            key={index} 
                            {...item} 
                            animationClass={getAnimationClass(`history-${index}`)}
                            id={`history-${index}`}
                            style={{ animationDelay: `${index * 0.2}s` }}
                        />
                    ))}
                </div>
                
                <div className="space-y-8">
                    <div 
                        className={`relative group ${getAnimationClass('images', 'scale-in')}`}
                        data-animate
                        id="images"
                    >
                        {/* Card de Equipo Fundador */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl p-1">
                            <div className="bg-white rounded-3xl p-8 text-center">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-full flex items-center justify-center mb-6">
                                    <UsersIcon className="w-12 h-12 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold text-[#1C2E82] mb-2">Equipo Fundador</h4>
                                <p className="text-slate-600">Los visionarios que iniciaron esta gran historia</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative group">
                        {/* Card de Equipo Actual */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-3xl p-1">
                            <div className="bg-white rounded-3xl p-8 text-center">
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-full flex items-center justify-center mb-6">
                                    <UsersIcon className="w-12 h-12 text-white" /> {/* Usando UsersIcon como ejemplo */}
                                </div>
                                <h4 className="text-2xl font-bold text-[#1C2E82] mb-2">Nuestro Equipo Actual</h4>
                                <p className="text-slate-600">Profesionales comprometidos con la excelencia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HistorySection;