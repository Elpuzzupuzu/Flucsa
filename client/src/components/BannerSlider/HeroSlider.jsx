"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

// Importa tus imágenes locales
import bannerOne from "../../assets/images/pool.jpg";
import bannerTwo from "../../assets/images/pvc.jpg";
import bannerThree from "../../assets/images/pool2.jpg";

// Datos de los slides con tus imágenes
const slidesData = [
  {
    id: 1,
    image: bannerOne,
    category: "Bombas Hidráulicas",
    title: "Bombas de Alto Rendimiento",
    subtitle: "Tecnología avanzada para sistemas profesionales",
    features: ["Alta eficiencia", "Bajo mantenimiento", "Garantía extendida"],
    cta: "Ver Bombas",
    route: "/productos/bombas",
  },
  {
    id: 2,
    image: bannerTwo,
    category: "Sistemas PVC",
    title: "Tubería y Accesorios PVC",
    subtitle: "Calidad superior para instalaciones duraderas",
    features: ["Resistente a corrosión", "Fácil instalación", "Normas internacionales"],
    cta: "Ver PVC",
    route: "/productos/pvc",
  },
  {
    id: 3,
    image: bannerThree,
    category: "Equipos para Piscinas",
    title: "Soluciones Completas para Piscinas",
    subtitle: "Todo lo que necesitas para el mantenimiento perfecto",
    features: ["Filtración avanzada", "Control automático", "Eficiencia energética"],
    cta: "Ver Piscinas",
    route: "/productos/piscinas",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlideData = slidesData[currentSlide];

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden shadow-2xl bg-gradient-to-br from-blue-900 to-blue-700"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            <div
              className={`text-white transform transition-all duration-1000 delay-300 ${
                isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              {/* Category Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                {currentSlideData.category}
              </div>

              {/* Main Title */}
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {currentSlideData.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl mb-8 text-gray-200 leading-relaxed max-w-lg">
                {currentSlideData.subtitle}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mb-8">
                {currentSlideData.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-sm bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg"
                  >
                    <Zap className="w-4 h-4 mr-2 text-yellow-400" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
                onClick={() => navigate(currentSlideData.route)}
              >
                {currentSlideData.cta}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length)
        }
        className="absolute top-1/2 left-6 z-30 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-200 shadow-lg rounded-full h-14 w-14 flex items-center justify-center text-white hover:text-blue-600"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % slidesData.length)
        }
        className="absolute top-1/2 right-6 z-30 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 hover:scale-110 transition-all duration-200 shadow-lg rounded-full h-14 w-14 flex items-center justify-center text-white hover:text-blue-600"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative transition-all duration-300 ${
              index === currentSlide
                ? "w-12 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-30 bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium">
        {currentSlide + 1} / {slidesData.length}
      </div>
    </div>
  );
};

export default HeroSlider;
