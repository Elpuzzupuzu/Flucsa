import { Droplet, Sun, Sprout } from "lucide-react";
import flucsahero from '../../assets/images/F1.jpg';

const HeroSection = ({ isVisible }) => {
  return (
    <section
      className="w-full relative overflow-hidden py-20"
      style={{ backgroundColor: "#0A1854" }}
    >
      {/* Animated decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-400/15 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-orange-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
          {/* Image side - Left - PROTAGONISTA */}
          <div
            className={`animate-scale-in ${
              isVisible?.heroImage ? "visible" : ""
            }`}
            data-animate
            id="heroImage"
          >
            <div className="relative group">
              {/* Multi-layer glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-orange-400 rounded-3xl opacity-30 group-hover:opacity-60 blur-2xl transition-all duration-700 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-400 via-orange-500 to-cyan-500 rounded-3xl opacity-20 group-hover:opacity-40 blur-xl transition-all duration-500"></div>

              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500">
                <img
                  src={flucsahero}
                  alt="Negocio"
                  className="w-full h-[500px] object-cover rounded-3xl"
                />

                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10"></div>

                {/* Animated border shimmer */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-shimmer"></div>
                  <div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent animate-shimmer"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>

                {/* Bottom text with enhanced styling */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8 text-white">
                  <div className="relative">
                    <div className="absolute -top-2 left-0 w-16 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 rounded-full"></div>
                    <p className="font-bold text-xl drop-shadow-2xl mt-2 bg-gradient-to-r from-white via-cyan-100 to-orange-100 bg-clip-text text-transparent">
                      Comprometidos con la excelencia en cada proyecto
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-orange-400 to-amber-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm transform rotate-3 hover:rotate-0 transition-transform duration-300 border-2 border-white/30">
                <div className="flex items-center gap-2">
                  <span className="animate-pulse">⭐</span>
                  Calidad Premium
                </div>
              </div>
            </div>
          </div>

          {/* Text content - Right */}
          <div
            className={`animate-fade-in-up ${
              isVisible?.hero ? "visible" : ""
            }`}
            data-animate
            id="hero"
          >
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent drop-shadow-lg animate-gradient">
                    Nuestros
                  </span>
                  <br />
                  <span className="text-white drop-shadow-2xl">Servicios</span>
                </h1>
                <div className="flex gap-2 items-center">
                  <div className="w-20 h-2 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 rounded-full shadow-lg shadow-orange-500/50 animate-pulse"></div>
                  <div
                    className="w-12 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 animate-pulse"
                    style={{ animationDelay: "0.3s" }}
                  ></div>
                  <div
                    className="w-8 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg shadow-blue-500/50 animate-pulse"
                    style={{ animationDelay: "0.6s" }}
                  ></div>
                </div>
              </div>

              <p className="text-xl text-gray-100 leading-relaxed">
                Soluciones hidráulicas y de construcción{" "}
                <span className="font-bold bg-gradient-to-r from-cyan-300 via-orange-300 to-amber-300 bg-clip-text text-transparent animate-gradient">
                  innovadoras y de alta calidad
                </span>{" "}
                para transformar tu hogar o negocio con la excelencia que mereces
              </p>

              {/* Categories with enhanced animations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                {[
                  {
                    icon: Droplet,
                    title: "Sistemas Hidráulicos",
                    count: "3 servicios",
                    color: "from-cyan-400 to-blue-500",
                    delay: "0s",
                  },
                  {
                    icon: Sun,
                    title: "Mantenimiento",
                    count: "2 servicios",
                    color: "from-orange-400 to-amber-500",
                    delay: "0.1s",
                  },
                  {
                    icon: Sprout,
                    title: "Diseño & Jardines",
                    count: "4 servicios",
                    color: "from-emerald-400 to-teal-500",
                    delay: "0.2s",
                  },
                ].map((category, i) => (
                  <div
                    key={i}
                    className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all duration-500 text-center hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
                    style={{
                      animationDelay: category.delay,
                      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-500`}
                    ></div>

                    <div className="relative">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                      >
                        <category.icon
                          className="w-8 h-8 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <h3 className="font-bold text-white mb-2 text-base group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-orange-300 group-hover:bg-clip-text transition-all duration-300">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-300 group-hover:text-white font-semibold transition-all duration-300">
                        {category.count}
                      </p>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-orange-400 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }

        .animate-scale-in {
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-scale-in.visible {
          opacity: 1;
          transform: scale(1);
        }

        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
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
