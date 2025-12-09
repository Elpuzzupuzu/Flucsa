// HeroSlider.jsx
"use client";

import React, { useState, useEffect } from "react";
import { slidesData } from "./components/data"; // Asume que data.js está en la misma carpeta o importación correcta
import SlideContent from "./components/SlideContent";
import SliderControls from "./components/SliderControls";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Dirección: 1 (siguiente), -1 (anterior)
  const [direction, setDirection] = useState(1); 

  // Lógica de avance automático
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        handleNext();
      }
    }, 6000); // 6 segundos
    return () => clearInterval(timer);
  }, [isPaused, currentSlide]); // Se reinicia el timer en cada cambio de slide/estado de pausa

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

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Contenido de la diapositiva con animaciones de GSAP */}
      <SlideContent data={currentSlideData} direction={direction} />

      {/* Controles de navegación y puntos */}
      <SliderControls
        slidesCount={slidesData.length}
        currentSlide={currentSlide}
        onPrev={handlePrev}
        onNext={handleNext}
        onDotClick={handleDotClick}
      />
    </div>
  );
};

export default HeroSlider;