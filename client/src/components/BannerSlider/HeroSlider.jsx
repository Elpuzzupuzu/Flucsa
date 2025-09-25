"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// importa tus imágenes
import bannerOne from "../../assets/images/pool.jpg";
import bannerTwo from "../../assets/images/pvc.jpg";
import bannerThree from "../../assets/images/pool.jpg";

const HeroSlider = () => {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  return (
    <div
      className="relative w-full h-[480px] overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />

      {/* slides */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          alt={`Banner ${index + 1}`}
          className={`
            absolute top-0 left-0 w-full h-full object-cover
            ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            transition-all duration-1000 ease-in-out
          `}
        />
      ))}

      {/* contenido central */}
      <div className="absolute top-1/2 left-0 right-0 z-20 -translate-y-1/2 text-center text-white">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Soluciones en Bombas Hidráulicas y PVC
        </h1>
        <p className="text-xl mb-8 max-w-lg mx-auto drop-shadow-md">
          Todo para piscinas, sistemas hidráulicos y accesorios de calidad
        </p>
        <button
          className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/productos")}
        >
          Ver Productos
        </button>
      </div>

      {/* botón izquierda */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute top-1/2 left-6 z-20 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg rounded-full h-12 w-12 flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* botón derecha */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % slides.length)
        }
        className="absolute top-1/2 right-6 z-20 -translate-y-1/2 bg-white/90 hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg rounded-full h-12 w-12 flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* indicadores */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
