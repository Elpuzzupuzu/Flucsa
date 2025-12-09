// SlideContent.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SlideContent = ({ data, direction }) => {
  const slideRef = useRef(null);
  const overlayRef = useRef(null);
  const iconRef = useRef(null);
  const categoryRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaRef = useRef(null);

  const Icon = data.icon;

  useEffect(() => {
    // Resetear animaciones antes de iniciar el timeline para la nueva slide
    gsap.set(
      [
        slideRef.current,
        overlayRef.current,
        iconRef.current,
        categoryRef.current,
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        ctaRef.current,
      ],
      { clearProps: "all" }
    );

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
      { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
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
      { rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      0.5
    );

    // Animación del subtítulo con rotación en eje X
    tl.fromTo(
      subtitleRef.current,
      { rotateX: direction * 90, opacity: 0, transformOrigin: "center center" },
      { rotateX: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
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
      { scale: 1, opacity: 1, y: 0, duration: 0.7, ease: "back.out(1.5)" },
      1.1
    );

    // Animación continua del icono (pulso sutil)
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: 1.5,
    });
  }, [data, direction]); // Re-ejecutar al cambiar la data o la dirección

  return (
    <>
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          ref={slideRef}
          src={data.image}
          alt={data.title}
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
          <div className="max-w-3xl">
            {/* Icono */}
            <div ref={iconRef} className="mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>

            {/* Categoría */}
            <div ref={categoryRef} className="mb-4">
              <span className="inline-block px-4 py-2 bg-blue-600/80 backdrop-blur-sm text-white text-sm md:text-base font-medium rounded-full shadow-lg">
                {data.category}
              </span>
            </div>

            {/* Título y Subtítulo */}
            <h1 className="mb-6" style={{ perspective: "1000px" }}>
              <span
                ref={titleRef}
                className="block text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 leading-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {data.title}
              </span>
              <span
                ref={subtitleRef}
                className="block text-4xl md:text-5xl lg:text-6xl font-light text-white/90 leading-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {data.subtitle}
              </span>
            </h1>

            {/* Descripción */}
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed"
            >
              {data.description}
            </p>

            {/* CTA Button */}
            <button
              ref={ctaRef}
              className="group relative px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg overflow-hidden shadow-2xl transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-1"
            >
              <span className="relative z-10">{data.cta}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlideContent;