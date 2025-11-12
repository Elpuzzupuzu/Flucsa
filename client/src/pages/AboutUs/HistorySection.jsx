import React from 'react';
import HistoryItemCard from './HistoryItemCard';

const HistorySection = ({ historyItems, getAnimationClass, UsersIcon }) => (
    // Fondo limpio y suave
    <section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
            {/* Título de la Sección */}
            <div 
                className={`text-center mb-16 ${getAnimationClass('history')}`}
                data-animate
                id="history"
            >
                {/* Título: Usando Gris Carbón 900 para base, acentuado con Azul Marino */}
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
                    <span className="text-[#1E3A8A]">Nuestra</span> Historia
                </h2>
                {/* Separador elegante en Azul Marino */}
                <div className="w-20 h-1 bg-[#1E3A8A] mx-auto mb-6 rounded-full"></div>
                {/* Descripción: Gris Oscuro 700 para legibilidad y seriedad */}
                <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                    Una trayectoria de excelencia e innovación que comenzó con una visión y se ha convertido en liderazgo.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Columna de Items de Historia */}
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
                
                {/* Columna de Cards de Equipo (Información del equipo) */}
                <div className="space-y-8">
                    {/* Card de Equipo Fundador - Azul Marino */}
                    <div 
                        className={`relative group ${getAnimationClass('images', 'scale-in')}`}
                        data-animate
                        id="images"
                    >
                        {/* Sombra sutil en Azul Marino */}
                        <div className="absolute inset-0 bg-[#1E3A8A] rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                        {/* Borde sutil en Azul Marino */}
                        <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-3xl p-1 shadow-xl">
                            <div className="bg-white rounded-[1.4rem] p-8 text-center">
                                {/* Icono en Azul Marino y blanco */}
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-full flex items-center justify-center mb-6 shadow-md">
                                    <UsersIcon className="w-12 h-12 text-white" />
                                </div>
                                {/* Título: Aseguramos Gris Carbón 900 para el texto sobre fondo blanco */}
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Equipo Fundador</h4>
                                {/* Párrafo: Aseguramos Gris Oscuro 700 para el texto sobre fondo blanco */}
                                <p className="text-gray-700">Los visionarios que iniciaron esta gran historia.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Card de Equipo Actual - Gris Carbón (para contraste serio) */}
                    <div className="relative group">
                        {/* Sombra sutil en Gris Carbón */}
                        <div className="absolute inset-0 bg-[#374151] rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                        {/* Borde sutil en Gris Carbón (Usando Gris 700 y 500 como alternativa al Azul) */}
                        <div className="relative bg-gradient-to-br from-gray-700 to-gray-500 rounded-3xl p-1 shadow-xl">
                            <div className="bg-white rounded-[1.4rem] p-8 text-center">
                                {/* Icono en Gris Carbón y blanco */}
                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-700 to-gray-500 rounded-full flex items-center justify-center mb-6 shadow-md">
                                    <UsersIcon className="w-12 h-12 text-white" />
                                </div>
                                {/* Título: Aseguramos Gris Carbón 900 para el texto sobre fondo blanco */}
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Nuestro Equipo Actual</h4>
                                {/* Párrafo: Aseguramos Gris Oscuro 700 para el texto sobre fondo blanco */}
                                <p className="text-gray-700">Profesionales comprometidos con la excelencia y el futuro.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HistorySection;