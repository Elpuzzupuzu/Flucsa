import { Wrench, Droplet, Sun, Sprout } from "lucide-react";
import heroImg from '../../assets/images/heroback.png'; // Imagen del negocio

const HeroSection = ({ isVisible }) => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-24 px-6 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text side */}
          <div
            className={`animate-fade-in-up ${isVisible.hero ? "visible" : ""}`}
            data-animate
            id="hero"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-3xl mb-8 sparkle">
              <Wrench className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              <span className="gradient-text">Nuestros</span>
              <br />
              <span className="text-slate-800">Servicios</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mb-8 rounded-full"></div>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Soluciones hidráulicas y de construcción{" "}
              <span className="font-semibold text-[#1C2E82]">
                innovadoras y de alta calidad
              </span>{" "}
              para transformar tu hogar o negocio con la excelencia que mereces
            </p>

            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Droplet, title: "Sistemas Hidráulicos", count: "3 servicios" },
                { icon: Sun, title: "Mantenimiento", count: "2 servicios" },
                { icon: Sprout, title: "Diseño & Jardines", count: "4 servicios" },
              ].map((category, i) => (
                <div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/50 hover-lift text-center"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-xl flex items-center justify-center mb-3 mx-auto">
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[#1C2E82] mb-1 text-sm">{category.title}</h3>
                  <p className="text-xs text-slate-500">{category.count}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div
            className={`animate-scale-in ${isVisible.heroImage ? "visible" : ""}`}
            data-animate
            id="heroImage"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImg}
                alt="Negocio"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent p-6 text-white text-center">
                <p className="font-semibold">
                  "Comprometidos con la excelencia en cada proyecto"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
