import React from 'react';

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white pt-10 pb-20 overflow-hidden min-h-[650px] flex items-center">
      {/* Large Blue Background (top left) */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-gradient-to-br from-blue-600 to-blue-700 rounded-full opacity-95 transform -translate-x-1/3 -translate-y-1/3 z-0 shadow-2xl animate-pulse hidden md:block"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-16 h-16 bg-blue-400 rounded-full opacity-60 animate-bounce delay-75 hidden md:block"></div>
      <div className="absolute top-32 left-8 w-8 h-8 bg-blue-500 rounded-full opacity-40 hidden md:block"></div>

      {/* Water and Splash Form */}
      <div className="absolute right-0 top-0 w-[650px] h-[550px] z-10 hidden md:block">
        <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-500 rounded-bl-[120px] shadow-xl">
          <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-75 blur-sm shadow-lg animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-red-400 rounded-full opacity-50 blur-xs"></div>
          
          <div className="absolute bottom-0 left-0 w-full h-[350px] bg-gradient-to-t from-blue-600 to-blue-500 rounded-tr-[80px] opacity-90" 
            style={{ clipPath: 'polygon(0 40%, 100% 10%, 100% 100%, 0% 100%)' }}>
          </div>
          
          <div className="absolute top-1/2 right-1/2 w-6 h-6 bg-blue-200 rounded-full opacity-60 animate-ping"></div>
          <div className="absolute top-3/4 right-1/5 w-4 h-4 bg-blue-100 rounded-full opacity-50"></div>
        </div>
        <div className="absolute right-8 bottom-8 w-32 h-32 bg-white rounded-full opacity-20 blur-xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-8 py-16 flex flex-col md:flex-row items-center justify-between w-full">
        <div className="md:w-1/2 text-left pr-8 space-y-6">
          {/* Heading */}
          <div className="space-y-2">
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              Soluciones en Ferretería e Industria
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-blue-900 leading-[0.9] tracking-tight">
              Todo lo que necesitas en
              <span className="block text-blue-600 font-extrabold">un solo lugar</span>
            </h1>
          </div>
          
          {/* Description */}
          <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
            Ferretería, artículos de cocina, plomería básica, mantenimiento de piscinas 
            e industria hidráulica. Productos de calidad para hogares, negocios y profesionales.
          </p>
          
          {/* Call-to-action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl hover:bg-blue-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3">
              <span className="text-lg">Ver Catálogo</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4v8a2 2 0 002 2h6a2 2 0 002-2v-8M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2" />
              </svg>
              <span>Conócenos</span>
            </button>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap items-center space-x-8 pt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Variedad Garantizada</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Calidad Certificada</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Asesoría Profesional</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          {/* Illustration placeholder */}
          <div className="relative w-full h-64 md:h-80">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-transparent rounded-3xl opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl opacity-20">
              🔧
            </div>
          </div>
        </div>
      </div>
      
      {/* Extra Background Elements */}
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl hidden md:block"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-blue-100 rounded-full opacity-10 blur-3xl hidden md:block"></div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
