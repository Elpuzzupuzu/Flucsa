import React, { useState, useEffect } from 'react';
import { Lightbulb, Wrench, Sprout, Leaf, Sun, Droplet, Users, Zap, ShieldCheck, Handshake, TrendingUp, ArrowRight, CheckCircle, Star, Phone, Clock, Award } from 'lucide-react';

const ServicesPage = () => {
    const [isVisible, setIsVisible] = useState({});

    const services = [
        { 
            icon: Droplet, 
            title: 'Sistemas de Riego Residencial', 
            description: 'Diseño e instalación de sistemas de riego automáticos que optimizan el consumo de agua para el cuidado de jardines, césped y áreas verdes.',
            features: ['Riego automatizado', 'Sensores de humedad', 'Ahorro hasta 40% de agua'],
            color: 'from-blue-600 to-cyan-500'
        },
        { 
            icon: Sun, 
            title: 'Equipos para Piscinas', 
            description: 'Soluciones completas para el mantenimiento de piscinas, incluyendo bombas de alta eficiencia, filtros, calentadores y sistemas de limpieza.',
            features: ['Bombas eficientes', 'Filtros premium', 'Limpieza automática'],
            color: 'from-orange-500 to-yellow-500'
        },
        { 
            icon: Wrench, 
            title: 'Plomería y Reparaciones', 
            description: 'Servicio de plomería profesional para diagnosticar y reparar fugas, grifos, inodoros y cualquier problema en el sistema de tuberías.',
            features: ['Detección de fugas', 'Reparaciones 24/7', 'Garantía extendida'],
            color: 'from-gray-600 to-slate-500'
        },
        { 
            icon: Lightbulb, 
            title: 'Instalaciones de Iluminación', 
            description: 'Iluminación especializada para exteriores y jardines, creando ambientes acogedores y seguros con luces LED de bajo consumo.',
            features: ['Iluminación LED', 'Diseños modernos', 'Bajo consumo'],
            color: 'from-yellow-500 to-amber-400'
        },
        { 
            icon: Handshake, 
            title: 'Mantenimiento Preventivo', 
            description: 'Planes de mantenimiento personalizados para sistemas hidráulicos y equipos, asegurando su óptimo funcionamiento y prolongando su vida útil.',
            features: ['Planes personalizados', 'Revisiones periódicas', 'Vida útil extendida'],
            color: 'from-green-600 to-emerald-500'
        },
        { 
            icon: ShieldCheck, 
            title: 'Impermeabilización de Azoteas', 
            description: 'Aplicación de productos impermeabilizantes de alta calidad para proteger tu hogar de la humedad y filtraciones.',
            features: ['Materiales premium', 'Protección total', 'Garantía 5 años'],
            color: 'from-indigo-600 to-purple-500'
        },
        { 
            icon: Zap, 
            title: 'Sistemas Hidroneumáticos', 
            description: 'Instalación y reparación de equipos hidroneumáticos para garantizar una presión de agua constante y uniforme.',
            features: ['Presión constante', 'Equipos eficientes', 'Instalación profesional'],
            color: 'from-purple-600 to-pink-500'
        },
        { 
            icon: Sprout, 
            title: 'Diseño de Jardines', 
            description: 'Asesoría y diseño de jardines que se adaptan a tu espacio y estilo, con un enfoque en la sostenibilidad.',
            features: ['Diseño personalizado', 'Plantas nativas', 'Sostenible'],
            color: 'from-green-500 to-teal-400'
        },
        { 
            icon: Leaf, 
            title: 'Cisternas y Tinacos', 
            description: 'Instalación profesional y sanitización de tanques de almacenamiento de agua, asegurando un suministro limpio y seguro.',
            features: ['Instalación segura', 'Sanitización completa', 'Agua limpia'],
            color: 'from-teal-600 to-cyan-500'
        }
    ];

    const whyChooseUs = [
        {
            icon: Award,
            title: "15 Años de Experiencia",
            description: "Más de una década perfeccionando nuestros servicios"
        },
        {
            icon: Users,
            title: "500+ Clientes Satisfechos",
            description: "Una comunidad creciente que confía en nosotros"
        },
        {
            icon: Clock,
            title: "Servicio 24/7",
            description: "Disponibles cuando más nos necesitas"
        },
        {
            icon: CheckCircle,
            title: "Garantía Extendida",
            description: "Respaldamos la calidad de nuestro trabajo"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="overflow-hidden">
            <style jsx>{`
                .animate-fade-in-up {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                .animate-fade-in-up.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .animate-scale-in {
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                
                .animate-scale-in.visible {
                    opacity: 1;
                    transform: scale(1);
                }
                
                .gradient-text {
                    background: linear-gradient(135deg, #1C2E82, #ED0000);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .glass-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .hover-lift {
                    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                
                .hover-lift:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                }
                
                .sparkle {
                    position: relative;
                    overflow: hidden;
                }
                
                .sparkle::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent,
                        rgba(255, 255, 255, 0.1),
                        transparent
                    );
                    transform: rotate(45deg) translateY(-100%);
                    transition: transform 0.6s;
                }
                
                .sparkle:hover::before {
                    transform: rotate(45deg) translateY(100%);
                }
                
                .floating-shapes::before {
                    content: '';
                    position: absolute;
                    top: 10%;
                    right: 10%;
                    width: 120px;
                    height: 120px;
                    background: linear-gradient(135deg, #1C2E82, #2d4bc7);
                    border-radius: 50%;
                    opacity: 0.08;
                    animation: float 8s ease-in-out infinite;
                }
                
                .floating-shapes::after {
                    content: '';
                    position: absolute;
                    bottom: 15%;
                    left: 8%;
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #ED0000, #ff4444);
                    border-radius: 50%;
                    opacity: 0.06;
                    animation: float 6s ease-in-out infinite reverse;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
            `}</style>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6 relative floating-shapes">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content Side */}
                        <div 
                            className={`animate-fade-in-up ${isVisible.hero ? 'visible' : ''}`}
                            data-animate
                            id="hero"
                        >
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl mb-8 sparkle">
                                <Wrench className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                                <span className="gradient-text">Nuestros</span>
                                <br />
                                <span className="text-slate-800">Servicios</span>
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mb-8 rounded-full"></div>
                            <p className="text-xl text-slate-600 leading-relaxed mb-10">
                                Soluciones hidráulicas y de construcción 
                                <span className="font-semibold text-[#1C2E82]"> innovadoras y de alta calidad </span>
                                para transformar tu hogar o negocio con la excelencia que mereces
                            </p>
                            
                            {/* Service Categories Preview */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { icon: Droplet, title: "Sistemas Hidráulicos", count: "3 servicios" },
                                    { icon: Sun, title: "Mantenimiento", count: "2 servicios" },
                                    { icon: Sprout, title: "Diseño & Jardines", count: "4 servicios" }
                                ].map((category, index) => (
                                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover-lift text-center">
                                        <div className="w-10 h-10 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-xl flex items-center justify-center mb-3 mx-auto">
                                            <category.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <h3 className="font-bold text-[#1C2E82] mb-1 text-sm">{category.title}</h3>
                                        <p className="text-xs text-slate-500">{category.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image Side */}
                        <div 
                            className={`animate-scale-in ${isVisible.heroImage ? 'visible' : ''}`}
                            data-animate
                            id="heroImage"
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1C2E82] to-[#ED0000] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl p-1">
                                    <div className="bg-white rounded-3xl overflow-hidden">
                                        <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                                            <div className="text-center p-8">
                                                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-full flex items-center justify-center mb-6">
                                                    <Wrench className="w-12 h-12 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#1C2E82] mb-2">Equipo Profesional</h3>
                                                <p className="text-slate-600 mb-6">Técnicos especializados en soluciones hidráulicas</p>
                                                <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                                                    {[...Array(6)].map((_, i) => (
                                                        <div key={i} className="aspect-square bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center">
                                                            <div className="w-6 h-6 bg-gradient-to-br from-[#1C2E82] to-[#ED0000] rounded-full flex items-center justify-center">
                                                                <span className="text-white text-xs font-bold">{i+1}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] text-white text-center">
                                            <p className="font-semibold">"Comprometidos con la excelencia en cada proyecto"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div 
                        className={`text-center mb-20 animate-fade-in-up ${isVisible.servicesHeader ? 'visible' : ''}`}
                        data-animate
                        id="servicesHeader"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            <span className="gradient-text">Servicios Especializados</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Cada servicio está diseñado para superar tus expectativas con tecnología avanzada y mano de obra especializada
                        </p>
                    </div>

                    {/* Services Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div 
                                key={index} 
                                className={`group glass-card rounded-3xl p-8 shadow-lg border border-slate-100 hover-lift animate-scale-in ${isVisible[`service-${index}`] ? 'visible' : ''}`}
                                data-animate
                                id={`service-${index}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Icon with gradient background */}
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 sparkle`}>
                                    <service.icon className="w-8 h-8 text-white" />
                                </div>
                                
                                {/* Title */}
                                <h3 className="text-2xl font-bold text-[#1C2E82] mb-4 group-hover:text-[#ED0000] transition-colors">
                                    {service.title}
                                </h3>
                                
                                {/* Description */}
                                <p className="text-slate-700 leading-relaxed mb-6">
                                    {service.description}
                                </p>
                                
                                {/* Features */}
                                <ul className="space-y-2 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-slate-600">
                                            <CheckCircle className="w-4 h-4 text-[#ED0000] mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                
                                {/* Action Button */}
                                <button className="w-full bg-gradient-to-r from-slate-100 to-slate-50 hover:from-[#1C2E82] hover:to-[#2d4bc7] text-slate-700 hover:text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group/btn">
                                    <span className="mr-2">Más Información</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-100 to-blue-50 relative">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div 
                        className={`text-center mb-16 animate-fade-in-up ${isVisible.whyUs ? 'visible' : ''}`}
                        data-animate
                        id="whyUs"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            <span className="gradient-text">¿Por Qué Elegirnos?</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            La combinación perfecta de experiencia, calidad y compromiso con nuestros clientes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <div 
                                key={index}
                                className={`text-center group animate-scale-in ${isVisible[`why-${index}`] ? 'visible' : ''}`}
                                data-animate
                                id={`why-${index}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-xl flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-[#1C2E82] mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div 
                        className={`animate-fade-in-up ${isVisible.cta ? 'visible' : ''}`}
                        data-animate
                        id="cta"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            ¿Listo para Empezar tu Proyecto?
                        </h2>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10">
                            Contacta a nuestros expertos y descubre cómo podemos transformar tu espacio con soluciones innovadoras y de alta calidad
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a 
                                href="/contacto" 
                                className="group inline-flex items-center bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-2xl px-10 py-5 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 sparkle"
                            >
                                <Phone className="w-6 h-6 mr-3" />
                                <span className="mr-3">Solicitar Cotización</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <a 
                                href="/about" 
                                className="group inline-flex items-center bg-white/20 backdrop-blur-sm rounded-2xl px-10 py-5 text-white font-bold text-lg hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/30"
                            >
                                <span className="mr-3">Conocer Más</span>
                                <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        
                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Cotización Gratuita</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Respuesta en 24h</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Garantía de Calidad</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ServicesPage;