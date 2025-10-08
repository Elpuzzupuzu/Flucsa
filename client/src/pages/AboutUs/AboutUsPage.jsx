import React, { useState, useEffect } from 'react';
import { Calendar, Users, Award, TrendingUp, Handshake, Sun, Droplet, Wrench, Spade, Home, ArrowRight, CheckCircle, Star } from 'lucide-react';

const AboutUsPage = () => {
    const [isVisible, setIsVisible] = useState({});
    const [counters, setCounters] = useState({
        years: 0,
        clients: 0,
        experience: 0,
        satisfaction: 0
    });

    const stats = [
        { icon: Calendar, number: '2015', key: 'years', label: 'Año de Fundación' },
        { icon: Users, number: '500+', key: 'clients', label: 'Clientes Satisfechos' },
        { icon: Award, number: '10', key: 'experience', label: 'Años de Experiencia' },
        { icon: TrendingUp, number: '100%', key: 'satisfaction', label: 'Atencion del Cliente' },
    ];

    const expertiseAreas = [
        { 
            icon: Droplet, 
            title: 'Sistemas de Riego', 
            description: 'Soluciones eficientes para optimizar el consumo de agua y el cuidado de tus jardines.',
            features: ['Riego automatizado', 'Sensores inteligentes', 'Ahorro de agua']
        },
        { 
            icon: Handshake, 
            title: 'Equipos para Piscinas', 
            description: 'Diseño e instalación de sistemas de filtrado y bombas para piscinas residenciales.',
            features: ['Filtros de alta calidad', 'Bombas eficientes', 'Mantenimiento']
        },
        { 
            icon: Wrench, 
            title: 'Instalaciones de Cocina', 
            description: 'Especialistas en lavabos, tuberías y grifería de alta calidad para tu cocina.',
            features: ['Grifería premium', 'Instalación experta', 'Garantía extendida']
        }, 
        { 
            icon: Spade, 
            title: 'Tuberías y Plomería', 
            description: 'Diagnóstico y reparación de fugas, así como la instalación completa de sistemas de tuberías.',
            features: ['Detección de fugas', 'Materiales duraderos', 'Servicio 24/7']
        },
        { 
            icon: Home, 
            title: 'Tinacos y Cisternas', 
            description: 'Soluciones de almacenamiento de agua potable con instalaciones seguras y duraderas.',
            features: ['Instalación segura', 'Materiales certificados', 'Mantenimiento preventivo']
        },
    ];

    const testimonials = [
        {
            name: "Ana Rodríguez",
            role: "Gerente de Proyectos",
            text: "El equipo de Flucsa superó mis expectativas. Su sistema de riego es impecable y su servicio al cliente, excepcional.",
            rating: 5,
            avatar: "A.R."
        },
        {
            name: "Juan Pérez",
            role: "Dueño de Negocio",
            text: "Los instaladores de tuberías fueron rápidos y profesionales. Un trabajo de calidad que se nota en cada detalle.",
            rating: 5,
            avatar: "J.P."
        },
        {
            name: "María González",
            role: "Arquitecta",
            text: "Flucsa transformó completamente nuestro proyecto. Su expertise en sistemas hidráulicos es incomparable.",
            rating: 5,
            avatar: "M.G."
        }
    ];

    const values = [
        {
            icon: CheckCircle,
            title: "Calidad",
            description: "Utilizamos materiales de primera y tecnología de vanguardia"
        },
        {
            icon: Users,
            title: "Confianza",
            description: "10 años construyendo relaciones duraderas con nuestros clientes"
        },
        {
            icon: TrendingUp,
            title: "Innovación",
            description: "Siempre a la vanguardia en soluciones hidráulicas"
        },
        {
            icon: Award,
            title: "Excelencia",
            description: "Comprometidos con superar las expectativas en cada proyecto"
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
                
                .floating-shapes::before {
                    content: '';
                    position: absolute;
                    top: 10%;
                    right: 10%;
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(135deg, #1C2E82, #2d4bc7);
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float 6s ease-in-out infinite;
                }
                
                .floating-shapes::after {
                    content: '';
                    position: absolute;
                    bottom: 20%;
                    left: 5%;
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #ED0000, #ff4444);
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float 4s ease-in-out infinite reverse;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
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
            `}</style>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 px-6 relative floating-shapes">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Content Side */}
                        <div 
                            className={`animate-fade-in-up ${isVisible.hero ? 'visible' : ''}`}
                            data-animate
                            id="hero"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl mb-6 sparkle">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                                <span className="gradient-text">Conoce Nuestra</span>
                                <br />
                                <span className="text-slate-800">Historia</span>
                            </h1>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mb-6 rounded-full"></div>
                            <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                Una década transformando sueños hidráulicos en realidades extraordinarias con 
                                <span className="font-semibold text-[#1C2E82]"> innovación, calidad y pasión</span>
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span className="font-medium text-slate-700">Proyectos personalizados</span>
                                </div>
                                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span className="font-medium text-slate-700">10 Años de Experiencia</span>
                                </div>
                                <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span className="font-medium text-slate-700">Satisfacción del client</span>
                                </div>
                            </div>
                        </div>

                        {/* Team Image Side */}
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
                                                    <Users className="w-12 h-12 text-white" />
                                                </div>
                                                <h3 className="text-2xl font-bold text-[#1C2E82] mb-2">Nuestro Equipo</h3>
                                                <p className="text-slate-600 mb-4">Profesionales comprometidos con la excelencia</p>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[...Array(6)].map((_, i) => (
                                                        <div key={i} className="w-12 h-12 bg-gradient-to-br from-[#1C2E82] to-[#ED0000] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                            T{i+1}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] text-white text-center">
                                            <p className="font-semibold">"Juntos construimos el futuro hidráulico de México"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div 
                        className={`grid grid-cols-2 lg:grid-cols-4 gap-8 animate-scale-in ${isVisible.stats ? 'visible' : ''}`}
                        data-animate
                        id="stats"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group hover-lift">
                                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl flex items-center justify-center sparkle transform group-hover:scale-110 transition-transform duration-300">
                                    <stat.icon className="w-10 h-10 text-white" />
                                </div>
                                <div className="text-4xl md:text-5xl font-black gradient-text mb-2 group-hover:scale-105 transition-transform">
                                    {stat.number}
                                </div>
                                <div className="text-slate-600 font-semibold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="bg-gradient-to-br from-slate-100 to-blue-50 py-20 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div 
                        className={`text-center mb-16 animate-fade-in-up ${isVisible.history ? 'visible' : ''}`}
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
                            {[
                                {
                                    icon: Award,
                                    title: "Nuestros Inicios (2015)",
                                    description: "Fundada como un pequeño taller familiar con una gran visión: revolucionar la industria hidráulica con soluciones innovadoras y de máxima calidad.",
                                    gradient: "from-[#1C2E82] to-[#2d4bc7]"
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Nuestro Crecimiento",
                                    description: "Evolucionamos constantemente, incorporando las últimas tecnologías sin perder de vista nuestros valores fundamentales: calidad, confiabilidad y excelencia.",
                                    gradient: "from-[#ED0000] to-[#ff4444]"
                                },
                                {
                                    icon: Star,
                                    title: "Nuestro Presente",
                                    description: "Hoy somos un referente de excelencia en el mercado, manteniendo nuestro compromiso con la satisfacción del cliente y la innovación constante.",
                                    gradient: "from-purple-600 to-pink-600"
                                }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className={`glass-card rounded-3xl p-8 shadow-xl hover-lift animate-fade-in-up ${isVisible[`history-${index}`] ? 'visible' : ''}`}
                                    data-animate
                                    id={`history-${index}`}
                                    style={{ animationDelay: `${index * 0.2}s` }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 sparkle`}>
                                            <item.icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#1C2E82] mb-3">{item.title}</h3>
                                            <p className="text-slate-700 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="space-y-8">
                            <div 
                                className={`relative group animate-scale-in ${isVisible.images ? 'visible' : ''}`}
                                data-animate
                                id="images"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl p-1">
                                    <div className="bg-white rounded-3xl p-8 text-center">
                                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-full flex items-center justify-center mb-6">
                                            <Users className="w-12 h-12 text-white" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-[#1C2E82] mb-2">Equipo Fundador</h4>
                                        <p className="text-slate-600">Los visionarios que iniciaron esta gran historia</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                                <div className="relative bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-3xl p-1">
                                    <div className="bg-white rounded-3xl p-8 text-center">
                                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-full flex items-center justify-center mb-6">
                                            <Award className="w-12 h-12 text-white" />
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

            {/* Mission & Vision */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-6xl mx-auto relative z-10">
                    <div 
                        className={`text-center mb-16 animate-fade-in-up ${isVisible.mission ? 'visible' : ''}`}
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
                        <div 
                            className={`bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#ED0000] transition-all duration-500 hover-lift animate-scale-in ${isVisible.missionCard ? 'visible' : ''}`}
                            data-animate
                            id="missionCard"
                        >
                            <div className="flex items-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center mr-6 sparkle">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold">Nuestra Misión</h3>
                            </div>
                            <p className="text-white/90 leading-relaxed text-lg mb-6">
                                Ofrecer soluciones hidráulicas de vanguardia, superando las expectativas de nuestros clientes con productos de calidad, servicio confiable e innovación continua, contribuyendo al desarrollo sostenible de nuestras comunidades.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span>Calidad Premium</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span>Servicio Confiable</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span>Innovación Continua</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2" />
                                    <span>Desarrollo Sostenible</span>
                                </div>
                            </div>
                        </div>
                        
                        <div 
                            className={`bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 hover:border-[#ED0000] transition-all duration-500 hover-lift animate-scale-in ${isVisible.visionCard ? 'visible' : ''}`}
                            data-animate
                            id="visionCard"
                        >
                            <div className="flex items-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center mr-6 sparkle">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-bold">Nuestra Visión</h3>
                            </div>
                            <p className="text-white/90 leading-relaxed text-lg mb-6">
                                Ser el líder y referente de la industria hidráulica a nivel nacional, reconocidos por nuestra excelencia, compromiso con la calidad y la capacidad de adaptarnos a las necesidades de un mercado en constante evolución.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span>Liderazgo Nacional</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span>Excelencia Reconocida</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span>Adaptabilidad</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                                    <span>Innovación Constante</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div 
                        className={`animate-fade-in-up ${isVisible.values ? 'visible' : ''}`}
                        data-animate
                        id="values"
                    >
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold mb-4">Nuestros Valores</h3>
                            <div className="w-16 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto rounded-full"></div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center group">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#ED0000] group-hover:to-[#ff4444] transition-all duration-300 border border-white/30">
                                        <value.icon className="w-10 h-10 text-white" />
                                    </div>
                                    <h4 className="font-bold text-xl mb-3">{value.title}</h4>
                                    <p className="text-white/80 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Expertise Areas */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div 
                        className={`text-center mb-16 animate-fade-in-up ${isVisible.expertise ? 'visible' : ''}`}
                        data-animate
                        id="expertise"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            <span className="gradient-text">Nuestras Especialidades</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Ofrecemos una amplia gama de servicios especializados para cubrir todas tus necesidades hidráulicas
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {expertiseAreas.map((area, index) => (
                            <div 
                                key={index} 
                                className={`glass-card rounded-3xl p-8 shadow-xl hover-lift group animate-scale-in ${isVisible[`area-${index}`] ? 'visible' : ''}`}
                                data-animate
                                id={`area-${index}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 sparkle">
                                    <area.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#1C2E82] mb-3">{area.title}</h3>
                                <p className="text-slate-700 leading-relaxed mb-4">{area.description}</p>
                                <ul className="space-y-2">
                                    {area.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-slate-600">
                                            <CheckCircle className="w-4 h-4 text-[#ED0000] mr-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div 
                        className={`text-center mb-16 animate-fade-in-up ${isVisible.testimonials ? 'visible' : ''}`}
                        data-animate
                        id="testimonials"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                            <span className="gradient-text">Testimonios</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            La satisfacción de nuestros clientes es nuestro mayor orgullo
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className={`glass-card rounded-3xl p-8 shadow-xl hover-lift animate-scale-in ${isVisible[`testimonial-${index}`] ? 'visible' : ''}`}
                                data-animate
                                id={`testimonial-${index}`}
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-slate-700 leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-full flex items-center justify-center mr-4 text-white font-bold">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#1C2E82]">{testimonial.name}</p>
                                        <p className="text-sm text-slate-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-slate-100 to-blue-50 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-[#1C2E82] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#ED0000] rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div 
                        className={`animate-fade-in-up ${isVisible.cta ? 'visible' : ''}`}
                        data-animate
                        id="cta"
                    >
                        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
                            <span className="gradient-text">¿Listo para Empezar</span>
                            <br />
                            <span className="text-slate-800">tu Proyecto?</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
                            Contacta a nuestros expertos y descubre cómo podemos ayudarte a llevar tus ideas a la realidad con soluciones hidráulicas de vanguardia.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a 
                                href="/contacto" 
                                className="group inline-flex items-center bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-2xl px-10 py-5 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 sparkle"
                            >
                                <span className="mr-3">Habla con un Experto</span>
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                            
                            <a 
                                href="/servicios" 
                                className="group inline-flex items-center bg-white border-2 border-[#1C2E82] rounded-2xl px-10 py-5 text-[#1C2E82] font-bold text-lg hover:bg-[#1C2E82] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                <span className="mr-3">Ver Servicios</span>
                                <TrendingUp className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                        
                        <div className="mt-12 flex justify-center space-x-8 text-slate-500">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Consulta Gratuita</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Presupuesto Sin Compromiso</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-[#ED0000] mr-2" />
                                <span className="font-medium">Respuesta en 24h</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Info Section */}
            <section className="py-16 px-6 bg-white border-t border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div 
                        className={`grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up ${isVisible.footer ? 'visible' : ''}`}
                        data-animate
                        id="footer"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl flex items-center justify-center mb-4">
                                <Droplet className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1C2E82] mb-2">Innovación Constante</h3>
                            <p className="text-slate-600">Siempre a la vanguardia en tecnología hidráulica</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-2xl flex items-center justify-center mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1C2E82] mb-2">Calidad Garantizada</h3>
                            <p className="text-slate-600">Materiales premium y mano de obra especializada</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1C2E82] mb-2">Servicio Personalizado</h3>
                            <p className="text-slate-600">Atención dedicada para cada proyecto único</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsPage;