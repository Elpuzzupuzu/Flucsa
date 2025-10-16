import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

const HeroSection = ({ teamImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" }) => (
    <section className="bg-white py-16 px-6 lg:py-20">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
                
                {/* Content Side - Menor ancho para dar protagonismo a imagen */}
                <div className="lg:col-span-2">
                  
                    
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-slate-900 leading-tight">
                        Conoce Nuestra
                        <span className="text-[#ED0000]"> Historia</span>
                    </h1>
                    
                    <div className="w-12 h-1 bg-[#ED0000] mb-6 rounded-full"></div>
                    
                    <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Una década transformando ideas en realidades extraordinarias con 
                        <span className="font-semibold text-slate-900"> innovación, calidad y pasión</span>
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#ED0000] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 font-medium">Proyectos personalizados</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#ED0000] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 font-medium">10 años de experiencia</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-[#ED0000] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 font-medium">Satisfacción garantizada</span>
                        </div>
                    </div>
                </div>

                {/* Team Image - Elemento Principal */}
                <div className="lg:col-span-3">
                    <div className="relative">
                        {/* Sombra sutil */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-[#1C2E82]/10 rounded-2xl blur-xl -z-10"></div>
                        
                        {/* Frame de la imagen */}
                        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                            <img
                                src={teamImage}
                                alt="Equipo de trabajo de la empresa"
                                className="w-full h-auto object-cover aspect-[16/10]"
                            />
                        </div>
                        
                        {/* Quote bar */}
                        <div className="mt-6 bg-slate-50 rounded-lg px-6 py-4 border-l-4 border-[#ED0000]">
                            <p className="text-slate-700 font-medium italic text-center">
                                "Creciendo contigo, impulsando soluciones hidráulicas para todos"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;