import { Droplets, Wrench, Zap, Package } from "lucide-react";

const FlucsaBanner = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#2172B0]/20 via-[#2B21B0]/10 to-[#2172B0]/20 rounded-2xl shadow-xl mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#2B21B0] rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2172B0] rounded-full blur-3xl opacity-40"></div>
        {/* Pequeños toques de color */}
        <div className="absolute top-10 right-1/3 w-20 h-20 bg-red-400 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute bottom-10 left-1/3 w-16 h-16 bg-yellow-400 rounded-full blur-2xl opacity-60"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-6 right-10 animate-bounce">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-xl">
          <Droplets className="w-8 h-8 text-[#2B21B0]" />
        </div>
      </div>

      <div className="absolute bottom-6 left-16 animate-pulse">
        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-full shadow-lg">
          <Wrench className="w-7 h-7 text-red-500" />
        </div>
      </div>

      <div
        className="absolute top-1/2 right-1/4 animate-bounce"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-full shadow-md">
          <Zap className="w-7 h-7 text-yellow-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 md:px-12 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-4">
                <div className="w-3 h-3 bg-[#2B21B0] rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-[#2172B0] uppercase tracking-wide">
                  Soluciones Hidráulicas
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl font-black mb-2 leading-tight">
                <span className="bg-gradient-to-r from-[#2B21B0] via-[#2172B0] to-[#2B21B0] bg-clip-text text-transparent drop-shadow-sm">
                  FLUCSA
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-2xl mx-auto md:mx-0 font-medium">
                Especialistas en{" "}
                <span className="text-[#2172B0] font-bold">
                  Hidráulicos y Tuberías
                </span>
                <br />
                <span className="text-base text-gray-600">
                  Calidad y confiabilidad en cada producto
                </span>
              </p>

              {/* CTA Button */}
              <button className="group relative px-6 py-3 bg-gradient-to-r from-[#2B21B0] to-[#2172B0] text-white font-bold text-base rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <Package className="w-6 h-6" />
                  Ver Productos
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#2172B0] to-[#2B21B0] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative flex-shrink-0">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {/* Main Circle */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2B21B0] to-[#2172B0] rounded-full animate-pulse shadow-2xl"></div>

                {/* Inner Circle */}
                <div className="absolute inset-3 bg-gradient-to-br from-[#2172B0] to-[#2B21B0] rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-center text-white">
                    <Droplets className="w-20 h-20 mx-auto mb-3 animate-bounce" strokeWidth={1.5} />
                    <p className="text-sm font-bold">Calidad</p>
                    <p className="text-2xl font-black">Premium</p>
                  </div>
                </div>

                {/* Orbiting Elements */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white rounded-full p-4 shadow-lg animate-bounce">
                  <Droplets className="w-7 h-7 text-red-500" />
                </div>

                <div className="absolute top-1/2 -right-3 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg animate-pulse">
                  <Wrench className="w-7 h-7 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl mx-auto md:mx-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-xl font-black text-[#2B21B0]">500+</p>
              <p className="text-xs text-gray-600 font-medium">Productos</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-xl font-black text-[#2B21B0]">15+</p>
              <p className="text-xs text-gray-600 font-medium">Años</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
              <p className="text-xl font-black text-[#2B21B0]">100%</p>
              <p className="text-xs text-gray-600 font-medium">Garantía</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-[#2B21B0] via-[#2172B0] to-[#2B21B0]"></div>
    </div>
  );
};

export default FlucsaBanner;
