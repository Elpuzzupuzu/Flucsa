import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

const HeroSection = ({ teamImage = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" }) => (
    // Fondo: Blanco nítido con un degradado sutil a gris muy claro
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 px-6 lg:py-32">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24 items-center">
                
                {/* Content Side */}
                <div className="lg:col-span-2 space-y-8">
                    
                    <div>
                        {/* ✍️ Título: Reducimos el tamaño y el peso a 'font-bold' para seriedad */}
                        <h1 className="text-5xl lg:text-6xl font-bold mb-5 text-gray-900 leading-tight tracking-tight">
                            Conoce Nuestra
                            {/* 🟦 Azul Marino Profundo: Manteniendo el color corporativo */}
                            <span className="block text-[#1E3A8A] mt-2">Historia</span>
                        </h1>
                        
                        {/* Separador: Más sutil en Azul Marino, menor altura */}
                        <div className="w-12 h-1 bg-[#1E3A8A]/70 mb-8 rounded-full"></div>
                        
                        {/* Párrafo Principal: Gris Oscuro, peso font-normal */}
                        <p className="text-xl text-gray-700 leading-relaxed font-normal">
                            Una década transformando ideas en realidades extraordinarias con 
                            {/* Énfasis en Azul Marino para destacar sin usar negrita en el gris */}
                            <span className="font-semibold text-[#1E3A8A]"> innovación, calidad y pasión.</span>
                        </p>
                    </div>
                    
                    {/* Features List */}
                    <div className="space-y-4 pt-4">
                        {/* ✅ Checklist: Utilizamos un Gris Claro como fondo y Azul Marino en el ícono */}
                        <div className="flex items-start gap-4 group">
                            <div className="bg-gray-100 p-1.5 rounded-md flex-shrink-0 transition-colors">
                                <CheckCircle className="w-5 h-5 text-[#1E3A8A]" /> {/* Ícono en Azul Marino */}
                            </div>
                            <span className="text-gray-800 font-medium text-lg">Proyectos personalizados</span> {/* Peso medio */}
                        </div>
                        <div className="flex items-start gap-4 group">
                            <div className="bg-gray-100 p-1.5 rounded-md flex-shrink-0 transition-colors">
                                <CheckCircle className="w-5 h-5 text-[#1E3A8A]" />
                            </div>
                            <span className="text-gray-800 font-medium text-lg">Más de 10 años de experiencia</span>
                        </div>
                        <div className="flex items-start gap-4 group">
                            <div className="bg-gray-100 p-1.5 rounded-md flex-shrink-0 transition-colors">
                                <CheckCircle className="w-5 h-5 text-[#1E3A8A]" />
                            </div>
                            <span className="text-gray-800 font-medium text-lg">Satisfacción del cliente garantizada</span>
                        </div>
                    </div>
                </div>

                {/* Team Image */}
                <div className="lg:col-span-3">
                    <div className="relative">
                        {/* ❌ Eliminamos la sombra borrosa de colores para un look más limpio */}
                        
                        {/* Frame de la imagen: Sombra más simple y nítida, sin degradados internos */}
                        <div className="relative bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100">
                            <img
                                src={teamImage}
                                alt="Equipo de trabajo de la empresa"
                                // 📷 Ajustamos el aspect ratio para un formato corporativo más común y menos ancho
                                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[3/2] transition-transform duration-500"
                            />
                        </div>
                        
                        {/* Quote card: Borde de seriedad, sin sombras de color llamativas */}
                        <div className="mt-8 relative">
                            {/* ❌ Eliminamos la sombra de contorno de color */}
                            <div className="relative bg-white rounded-lg px-6 py-5 border-l-4 border-[#1E3A8A] shadow-md">
                                {/* Texto de la cita en Gris Oscuro, peso font-medium */}
                                <p className="text-gray-800 font-medium text-lg text-center leading-relaxed">
                                    "Creciendo contigo, impulsando soluciones para todos nuestros clientes."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection;