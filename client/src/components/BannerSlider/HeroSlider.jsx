"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Droplet, Gauge, Wrench } from "lucide-react";
import { gsap } from "gsap";

const slidesData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1600&h=900&fit=crop",
    category: "Sistemas de Flujo Premium",
    title: "Válvulas y Bombas",
    subtitle: "de Alto Rendimiento",
    description: "Componentes hidráulicos de precisión para un control y caudal óptimos en cualquier aplicación.",
    cta: "Ver Hidráulicos",
    icon: Droplet,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop",
    category: "Infraestructura Duradera",
    title: "Tubería PVC y CPVC",
    subtitle: "Industrial y Residencial",
    description: "Soluciones resistentes a la corrosión, ideales para instalaciones de agua, drenaje y conducción de fluidos.",
    cta: "Explorar Tubería",
    icon: Gauge,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1600&h=900&fit=crop",
    category: "Conexiones y Herramientas",
    title: "Todo lo que Necesitas",
    subtitle: "para tu Instalación",
    description: "Bridas, codos, adaptadores y herramientas profesionales para garantizar un sellado perfecto y seguro.",
    cta: "Comprar Conexiones",
    icon: Wrench,
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);
  const iconRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animación del overlay
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.inOut" }
    );

    // Animación de la imagen con efecto parallax
    tl.fromTo(
      slideRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" },
      0
    );

    // Animación del icono con rotación y escala
    tl.fromTo(
      iconRef.current,
      { scale: 0, rotate: -180, opacity: 0 },
      { 
        scale: 1, 
        rotate: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "back.out(1.7)" 
      },
      0.3
    );

    // Animación de la categoría desde arriba
    tl.fromTo(
      categoryRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      0.4
    );

    // Animación del título con rotación en eje X
    tl.fromTo(
      titleRef.current,
      { rotateX: direction * 90, opacity: 0, transformOrigin: "center center" },
      { 
        rotateX: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      },
      0.5
    );

    // Animación del subtítulo con rotación en eje X
    tl.fromTo(
      subtitleRef.current,
      { rotateX: direction * 90, opacity: 0, transformOrigin: "center center" },
      { 
        rotateX: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
      },
      0.7
    );

    // Animación de la descripción con efecto de fade
    tl.fromTo(
      descriptionRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.9
    );

    // Animación del botón CTA con bounce
    tl.fromTo(
      ctaRef.current,
      { scale: 0.8, opacity: 0, y: 20 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "back.out(1.5)" 
      },
      1.1
    );

    // Animación continua del icono (pulso sutil)
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.5
    });

  }, [currentSlide, direction]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const currentSlideData = slidesData[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          ref={slideRef}
          src={currentSlideData.image}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
        />
      </div>

      {/* Contenido */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div ref={contentRef} className="max-w-3xl">
            {/* Icono */}
            <div ref={iconRef} className="mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>

            {/* Categoría */}
            <div ref={categoryRef} className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white text-sm md:text-base font-medium rounded-full shadow-lg">
                {currentSlideData.category}
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h1 className="mb-6" style={{ perspective: "1000px" }}>
              <span 
                ref={titleRef}
                className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {currentSlideData.title}
              </span>
              <span 
                ref={subtitleRef}
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-white/90 leading-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {currentSlideData.subtitle}
              </span>
            </h1>

            {/* Descripción */}
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              {currentSlideData.description}
            </p>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              className="group relative px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg overflow-hidden shadow-2xl transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              <span className="relative z-10">{currentSlideData.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Flechas de navegación */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 border-2 border-white/30 bg-black/20 backdrop-blur-md hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-lg group"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 border-2 border-white/30 bg-black/20 backdrop-blur-md hover:bg-white hover:border-white text-white hover:text-black flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-lg group"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Indicadores de progreso */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center gap-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative"
            aria-label={`Ir a slide ${index + 1}`}
          >
            <div
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? "w-12 h-2 bg-blue-600 shadow-lg shadow-blue-500/50"
                  : "w-2 h-2 bg-white/50 group-hover:bg-white/80 group-hover:w-8"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Contador de slides */}
      <div className="absolute top-8 right-8 z-40 text-white/80 text-sm font-light backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
        <span className="font-semibold text-white">{currentSlide + 1}</span> / {slidesData.length}
      </div>
    </div>
  );
};

export default HeroSlider;