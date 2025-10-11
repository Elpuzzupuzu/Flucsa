import { Droplets, Wrench, Zap, Package, ChevronRight } from "lucide-react";

const FlucsaBanner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-lg shadow-md mb-6">
      {/* Background Pattern - Más sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content - Más compacto */}
      <div className="relative z-10 px-6 md:px-10 py-8 md:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            
            {/* Left Content - Información principal */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge pequeño */}
              <div className="inline-flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-md shadow-sm mb-3">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-wide">
                  Soluciones Profesionales
                </span>
              </div>

              {/* Main Title - Más compacto */}
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white leading-tight">
                FLUCSA - Hidráulicos y Tuberías
              </h1>

              {/* Subtitle - Más breve */}
              <p className="text-base md:text-lg text-blue-100 mb-4 max-w-2xl mx-auto md:mx-0">
                Especialistas en sistemas hidráulicos con{" "}
                <span className="font-semibold text-white">15+ años de experiencia</span>
              </p>

              {/* Features compactas */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-1.5 text-white text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Envío rápido</span>
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Garantía incluida</span>
                </div>
                <div className="flex items-center gap-1.5 text-white text-sm">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Asesoría experta</span>
                </div>
              </div>

              {/* CTA Button - Estilo Amazon */}
              <button className="group inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-sm rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <Package className="w-4 h-4" />
                Ver Catálogo Completo
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Right Content - Imagen/Visual más pequeño */}
            <div className="relative flex-shrink-0 hidden md:block">
              <div className="relative w-40 h-40 lg:w-48 lg:h-48">
                {/* Círculo principal más simple */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border-4 border-white/20"></div>
                
                {/* Contenido central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Droplets className="w-16 h-16 mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xs font-medium opacity-90">Calidad</p>
                    <p className="text-lg font-bold">Premium</p>
                  </div>
                </div>

                {/* Iconos flotantes pequeños */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>

                <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                  <Wrench className="w-4 h-4 text-yellow-500" />
                </div>

                <div className="absolute bottom-4 -left-2 bg-white rounded-full p-2 shadow-md">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats - Más compacto y limpio */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto md:mx-0">
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-white mb-0.5">500+</p>
                <p className="text-xs text-blue-200">Productos disponibles</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-white mb-0.5">15+</p>
                <p className="text-xs text-blue-200">Años de experiencia</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-2xl font-bold text-white mb-0.5">100%</p>
                <p className="text-xs text-blue-200">Garantía de calidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlucsaBanner;