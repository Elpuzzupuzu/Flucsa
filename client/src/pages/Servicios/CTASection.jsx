import { Droplet, Sun, Sprout } from "lucide-react";
import flucsahero from '../../assets/images/F1.jpg';

const HeroSection = ({ isVisible }) => {
  return (
    <section
      // CAMBIO: Fondo BLANCO para contraste limpio
      className="w-full relative overflow-hidden py-24 md:py-32 bg-white" 
    >
      
      {/* Elementos decorativos - Se usa un gris muy claro/sombra sutil en lugar de blurs oscuros */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-100/70 rounded-full blur-3xl"></div>
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-200/50 rounded-full blur-3xl"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">
          
          {/* Text content - Izquierda */}
          <div
            className={`animate-fade-in-up ${
              isVisible?.hero ? "visible" : ""
            } order-2 lg:order-1`}
            data-animate
            id="hero"
          >
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-lg text-orange-600 mb-2 uppercase tracking-widest font-sans font-semibold">
                    Compromiso. Calidad. Servicio.
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-tight font-serif">
                  {/* Texto principal ahora en AZUL MARINO/OSCURO */}
                  <span className="text-[#0A1854] drop-shadow-sm">Excelencia en</span>
                  <br />
                  {/* GRADIENTE DE TEXTO: Se mantiene para énfasis, pero con colores que contrasten con blanco */}
                  <span className="bg-gradient-to-r from-cyan-600 via-blue-700 to-[#0A1854] bg-clip-text text-transparent drop-shadow-sm">
                    Servicios Integrales
                  </span>
                </h1>
                
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-full mt-4"></div>
              </div>

              <p className="text-xl text-gray-700 leading-relaxed font-sans">
                Ofrecemos **soluciones hidráulicas y de construcción** a la medida, garantizando la durabilidad y eficiencia que su proyecto de alto nivel requiere.
              </p>

              {/* Categories - Los fondos cambian a blanco/gris claro con bordes azules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {[
                  {
                    icon: Droplet,
                    title: "Sistemas Hidráulicos",
                    count: "Ver Soluciones",
                    color: "from-cyan-500 to-blue-700",
                    delay: "0s",
                  },
                  {
                    icon: Sun,
                    title: "Mantenimiento Preventivo",
                    count: "Planificar Ahora",
                    color: "from-orange-500 to-amber-700",
                    delay: "0.1s",
                  },
                  {
                    icon: Sprout,
                    title: "Diseño & Ejecución",
                    count: "Explorar Proyectos",
                    color: "from-emerald-500 to-teal-700",
                    delay: "0.2s",
                  },
                ].map((category, i) => (
                  <div
                    key={i}
                    // CAMBIO: Fondo BLANCO/CLARO y texto oscuro
                    className="group relative bg-white rounded-xl p-5 border border-gray-200 hover:border-cyan-400 transition-all duration-300 text-left hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-100/50 cursor-pointer"
                    style={{
                      animationDelay: category.delay,
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)", // Sombra más sutil
                    }}
                  >
                    
                    <div className="relative">
                      {/* Iconos se mantienen con color para contraste */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-3 shadow-lg transition-all duration-300`}
                      >
                        <category.icon
                          className="w-6 h-6 text-white"
                          strokeWidth={2}
                        />
                      </div>
                      <h3 className="font-bold text-[#0A1854] mb-1 text-base font-sans transition-colors duration-300 group-hover:text-cyan-600">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium font-sans">
                        {category.count}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image side - Derecha - Ahora con fondo oscuro para resaltar sobre el blanco */}
          <div
            className={`animate-scale-in ${
              isVisible?.heroImage ? "visible" : ""
            } order-1 lg:order-2`}
            data-animate
            id="heroImage"
          >
            <div className="relative group p-4 bg-[#0A1854] rounded-3xl shadow-2xl shadow-gray-700/50"> {/* Contenedor oscuro */}
              
              <div className="absolute -inset-4 bg-cyan-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

              <div className="relative rounded-2xl overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
                <img
                  src={flucsahero}
                  alt="Instalaciones o proyecto profesional"
                  // Borde interno blanco para mayor contraste
                  className="w-full h-[500px] object-cover rounded-2xl border-2 border-white/90"
                />

                {/* Overlay sutil para el texto */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white">
                  <div className="w-10 h-1 bg-orange-400 mb-2 rounded-full"></div>
                  <p className="font-semibold text-lg drop-shadow-lg font-sans text-gray-100">
                    Transformando su visión en realidad con **ingeniería de precisión**.
                  </p>
                </div>
              </div>

              {/* Floating badge (Texto blanco sobre fondo de color) */}
              <div className="absolute -top-4 -right-4 bg-cyan-600 text-white px-5 py-2 rounded-xl shadow-lg font-semibold text-sm transition-all duration-300 border-2 border-white/50 transform rotate-3 hover:rotate-0">
                <div className="flex items-center gap-2 font-sans">
                  <span>✅</span>
                  Certificación ISO
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Animaciones sin cambios */
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;