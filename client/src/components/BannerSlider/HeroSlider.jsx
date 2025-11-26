"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesData = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1600&h=900&fit=crop",
    title: "Válvulas y Bombas",
    subtitle: "de Alto Rendimiento",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=900&fit=crop",
    title: "Tubería PVC y CPVC",
    subtitle: "Industrial y Residencial",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=900&fit=crop",
    title: "Todo lo que Necesitas",
    subtitle: "para tu Instalación",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-white"
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
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <div
            className={`max-w-2xl transform transition-all duration-1000 delay-300 ${
              isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight">
              <span className="text-white font-semibold block">{currentSlideData.title}</span>
              <span className="text-white font-extralight block">{currentSlideData.subtitle}</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 
                   border border-white/50 bg-black/30 backdrop-blur-sm
                   hover:bg-white hover:border-white text-white hover:text-black
                   flex items-center justify-center transition-all duration-300"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 
                   border border-white/50 bg-black/30 backdrop-blur-sm
                   hover:bg-white hover:border-white text-white hover:text-black
                   flex items-center justify-center transition-all duration-300"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>

      {/* Progress bars */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide
                ? "w-12 h-1 bg-blue-800"
                : "w-8 h-1 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;