// SliderControls.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SliderControls = ({
  slidesCount,
  currentSlide,
  onPrev,
  onNext,
  onDotClick,
}) => {
  return (
    <>
      {/* 1. Flechas de navegación 
        Clases Móviles:
        - Reducimos el tamaño (w-10 h-10 vs. w-14 h-14 en desktop).
        - Las movemos de 'left-6' a 'left-2' en móvil para dar más espacio al contenido.
      */}
      <button
        onClick={onPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-40 
                   w-10 h-10 lg:w-14 lg:h-14 
                   border-2 border-white/30 bg-black/20 backdrop-blur-md 
                   text-white hover:bg-white hover:border-white hover:text-black 
                   flex items-center justify-center transition-all duration-300 
                   hover:scale-110 rounded-lg group"
        aria-label="Anterior"
      >
        <ChevronLeft
          size={20} // Tamaño de icono más pequeño en móvil
          className="group-hover:-translate-x-0.5 transition-transform lg:size-24"
        />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-40 
                   w-10 h-10 lg:w-14 lg:h-14 
                   border-2 border-white/30 bg-black/20 backdrop-blur-md 
                   text-white hover:bg-white hover:border-white hover:text-black 
                   flex items-center justify-center transition-all duration-300 
                   hover:scale-110 rounded-lg group"
        aria-label="Siguiente"
      >
        <ChevronRight
          size={20} // Tamaño de icono más pequeño en móvil
          className="group-hover:translate-x-0.5 transition-transform lg:size-24"
        />
      </button>

      {/* 2. Indicadores de progreso (Puntos) 
        - Se mantienen igual en la parte inferior central, es un buen patrón.
      */}
      <div className="absolute bottom-8 left-0 right-0 z-40 flex justify-center gap-2 md:gap-3">
        {Array.from({ length: slidesCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="group relative"
            aria-label={`Ir a slide ${index + 1}`}
          >
            <div
              className={`transition-all duration-500 rounded-full 
                ${
                  index === currentSlide
                    ? "w-8 h-1.5 md:w-12 md:h-2 bg-blue-600 shadow-lg shadow-blue-500/50" // Más compacto en móvil
                    : "w-1.5 h-1.5 md:w-2 md:h-2 bg-white/50 group-hover:bg-white/80 group-hover:w-6 md:group-hover:w-8"
                }`}
            />
          </button>
        ))}
      </div>

      {/* 3. Contador de slides 
        - Mantenemos el mismo estilo, pero lo movemos a la parte inferior.
        - Ocultamos en móvil para priorizar los puntos, o lo mantenemos visible 
          pero lo movemos a una esquina menos intrusiva.
        
        Opción A (Mantener y mover): 
        - De 'top-8 right-8' a 'bottom-4 right-4' y ocultar en pantallas pequeñas.
        
        Opción B (Usaremos para que se muestre en mobile pero solo en el contexto de los controles)
        - Lo dejamos arriba en desktop y lo movemos abajo en mobile (pero lo haremos menos intrusivo).
        
        **Elegimos: Ocultar en móvil y mostrar solo en pantallas grandes para no recargar.**
      */}
      <div className="absolute top-8 right-8 z-40 text-white/80 text-sm font-light 
                      backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full 
                      hidden md:block"> {/* Ocultar en móvil, mostrar en tablet/desktop */}
        <span className="font-semibold text-white">{currentSlide + 1}</span> /{" "}
        {slidesCount}
      </div>
    </>
  );
};

export default SliderControls;