
export default function HeroSection({ heroImage }) {
  return (
    <div className="relative w-full min-h-[400px] md:min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Tienda FLUCSA" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16 max-w-7xl">
        <div className="max-w-2xl">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Todo lo que necesitas en{' '}
            <span className="text-cyan-400">un solo lugar</span>
          </h1>
          
          <p className="text-gray-200 text-base md:text-lg mb-8 leading-relaxed">
            Ferretería, artículos de cocina, plomería básica, mantenimiento de
            piscinas e industria hidráulica. <span className="text-cyan-300 font-medium">Productos de calidad para hogares,
            negocios y profesionales.</span>
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
              Ver Catálogo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Conócenos
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Variedad Garantizada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Calidad Certificada</span>
            </div>
            <div className="flex items-center gap-2 text-gray-200">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Asesoría Profesional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}