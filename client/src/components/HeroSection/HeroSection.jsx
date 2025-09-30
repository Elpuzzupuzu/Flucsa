import React, { useEffect, useState } from 'react';

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 pt-6 pb-12 overflow-hidden min-h-[75vh] flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-out"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='tools' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10h5v5h-5z'/%3E%3Cpath d='M30 30h8v8h-8z'/%3E%3Cpath d='M20 5h3v10h-3z'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23tools)'/%3E%3C/svg%3E")`,
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Main Floating Elements */}
        <div 
          className="absolute top-[10%] left-[5%] w-48 h-48 bg-gradient-to-br from-blue-400/30 to-cyan-500/20 rounded-full blur-3xl animate-float-slow opacity-60"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.03}px)`
          }}
        />
        
        <div 
          className="absolute top-[60%] right-[10%] w-64 h-64 bg-gradient-to-br from-purple-400/20 to-blue-600/30 rounded-full blur-3xl animate-float-reverse opacity-50"
          style={{
            transform: `translate(${-mousePosition.x * 0.03}px, ${mousePosition.y * 0.04}px)`
          }}
        />

        <div 
          className="absolute bottom-[20%] left-[15%] w-32 h-32 bg-gradient-to-br from-cyan-300/25 to-blue-400/20 rounded-full blur-2xl animate-pulse-slow opacity-70"
          style={{
            transform: `translate(${mousePosition.x * 0.04}px, ${-mousePosition.y * 0.02}px)`
          }}
        />

        {/* Geometric Floating Elements - MÁS GRANDES */}
        <div className="absolute top-[15%] right-[20%] w-8 h-8 bg-cyan-400 rounded-full animate-bounce opacity-70 animate-delay-300" />
        <div className="absolute top-[35%] left-[12%] w-6 h-6 bg-blue-300 rounded-full animate-ping opacity-60 animate-delay-700" />
        <div className="absolute bottom-[30%] right-[25%] w-10 h-10 bg-purple-400 rounded-full animate-bounce opacity-50 animate-delay-1000" />
        
        {/* Tool Icons Floating - MUCHO MÁS GRANDES */}
      <div className="absolute top-[25%] left-[20%] animate-float text-8xl opacity-40 animate-delay-500">🔧</div>
      <div className="absolute top-[50%] right-[15%] animate-float-reverse text-7xl opacity-35 animate-delay-1200">⚙️</div>
      <div className="absolute bottom-[40%] left-[10%] animate-float text-7xl opacity-30 animate-delay-800">🔨</div>
      <div className="absolute top-[70%] right-[35%] animate-float text-8xl opacity-40 animate-delay-1500">🛠️</div>

      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-blue-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

      {/* Main Content */}
      <div className={`relative z-20 max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between w-full transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="md:w-1/2 text-left pr-6 space-y-4">
          {/* Badge */}
          <div className={`inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 text-xs font-medium rounded-full mb-4 transition-all duration-700 hover:scale-105 animate-glow ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            ✨ Soluciones en Ferretería e Industria
          </div>
          
          {/* Heading */}
          <div className="space-y-2">
            <h1 className={`text-3xl md:text-5xl font-black leading-tight tracking-tight transition-all duration-1000 animate-delay-200 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
              <span className="text-white">Todo lo que necesitas en</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent font-extrabold animate-gradient-x">
                un solo lugar
              </span>
            </h1>
          </div>
          
          {/* Description */}
          <p className={`text-base text-gray-300 max-w-lg leading-relaxed font-medium transition-all duration-1000 animate-delay-400 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            Ferretería, artículos de cocina, plomería básica, mantenimiento de piscinas 
            e industria hidráulica. <span className="text-cyan-300 font-semibold">Productos de calidad</span> para hogares, negocios y profesionales.
          </p>
          
          {/* Call-to-action */}
          <div className={`flex flex-col sm:flex-row gap-3 pt-4 transition-all duration-1000 animate-delay-600 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            <button className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center space-x-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-base z-10">Ver Catálogo</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="relative h-5 w-5 group-hover:translate-x-1 transition-transform duration-300 z-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="group px-6 py-3 border-2 border-cyan-400/50 bg-slate-800/50 backdrop-blur-sm text-cyan-300 font-bold rounded-xl hover:border-cyan-300 hover:bg-cyan-500/10 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">Conócenos</span>
            </button>
          </div>
          
          {/* Features */}
          <div className={`flex flex-wrap items-center gap-4 pt-4 text-xs transition-all duration-1000 animate-delay-800 ${isLoaded ? 'animate-fade-in-up' : ''}`}>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
              <span className="text-gray-300 group-hover:text-green-300 transition-colors duration-300">Variedad Garantizada</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full animate-pulse animate-delay-300 group-hover:scale-125 transition-transform duration-300"></div>
              <span className="text-gray-300 group-hover:text-blue-300 transition-colors duration-300">Calidad Certificada</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse animate-delay-600 group-hover:scale-125 transition-transform duration-300"></div>
              <span className="text-gray-300 group-hover:text-purple-300 transition-colors duration-300">Asesoría Profesional</span>
            </div>
          </div>
        </div>
        
        {/* Right Side Illustration - ÍCONOS MÁS GRANDES */}
        <div className={`md:w-1/2 mt-6 md:mt-0 relative transition-all duration-1000 animate-delay-1000 ${isLoaded ? 'animate-fade-in-left' : ''}`}>
          <div className="relative w-full h-60 md:h-72">
            {/* Main Illustration Container */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/20 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-cyan-400/20 shadow-2xl">
              {/* Floating Tool Elements - MÁS GRANDES Y CON MÁS ESPACIO */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl rotate-12 animate-float shadow-lg flex items-center justify-center text-3xl">
                🔧
              </div>
              
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg -rotate-12 animate-float-reverse animate-delay-500 shadow-lg flex items-center justify-center text-2xl">
                ⚙️
              </div>
              
              <div className="absolute bottom-1/3 left-1/3 w-18 h-18 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl rotate-45 animate-float animate-delay-1000 shadow-lg flex items-center justify-center text-2xl">
                🔨
              </div>
              
              <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce animate-delay-700 shadow-lg flex items-center justify-center text-xl">
                ⚡
              </div>

              {/* Central Glow Effect - MÁS GRANDE */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-xl animate-pulse-slow" />
              
              {/* Decorative Rings - MÁS GRANDES */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 border-cyan-400/30 rounded-full animate-spin-slow" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-blue-400/20 rounded-full animate-spin-reverse" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0px); }
        }
        
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0px); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.6); }
        }
        
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-left { animation: fade-in-left 0.8s ease-out forwards; }
        .animate-gradient-x { 
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite; 
        }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-spin-reverse { animation: spin-reverse 15s linear infinite; }
        
        .animate-delay-200 { animation-delay: 200ms; }
        .animate-delay-300 { animation-delay: 300ms; }
        .animate-delay-400 { animation-delay: 400ms; }
        .animate-delay-500 { animation-delay: 500ms; }
        .animate-delay-600 { animation-delay: 600ms; }
        .animate-delay-700 { animation-delay: 700ms; }
        .animate-delay-800 { animation-delay: 800ms; }
        .animate-delay-1000 { animation-delay: 1000ms; }
        .animate-delay-1200 { animation-delay: 1200ms; }
        .animate-delay-1500 { animation-delay: 1500ms; }
      `}</style>
    </div>
  );
}

export default HeroSection;