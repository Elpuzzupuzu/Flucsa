import { Droplet, Sun, Sprout } from "lucide-react";
import hero from '../../assets/images/F1.jpg'

const HeroSection = ({ isVisible }) => {
  // Placeholder image - replace with your actual image
  const flucsahero = hero;

  return (
    <section
      className="w-full relative overflow-hidden py-20"
      // CAMBIO 1: Fondo blanco elegante (gris muy claro)
      style={{ backgroundColor: "#F7F8FA" }} // Puedes usar 'white' si lo prefieres, pero este es más suave.
    >
      {/* Sutil efecto de fondo (ajustados para el fondo claro) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gray-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-300/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6">
          {/* Imagen lado izquierdo */}
          <div
            className={`animate-fade-in ${
              isVisible?.heroImage ? "visible" : ""
            }`}
            data-animate
            id="heroImage"
          >
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-xl border border-gray-200">
                <img
                  src={flucsahero}
                  alt="Servicios profesionales"
                  className="w-full h-[500px] object-cover"
                />

                {/* Overlay sutil (ajustado para el fondo claro: oscuro en la imagen) */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>

                {/* Texto inferior */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                  {/* CAMBIO 2: Borde oscuro para contraste */}
                  <div className="border-l-4 border-gray-300 pl-4">
                    <p className="text-white font-semibold text-lg">
                      Compromiso con la excelencia en cada proyecto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido de texto lado derecho */}
          <div
            className={`animate-fade-in ${
              isVisible?.hero ? "visible" : ""
            }`}
            data-animate
            id="hero"
          >
            <div className="space-y-6">
              <div>
                {/* CAMBIO 3: Título oscuro para fondo claro */}
                <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight leading-tight text-gray-900">
                  Nuestros Servicios
                </h1>
                {/* CAMBIO 4: Divisor oscuro para fondo claro */}
                <div className="w-24 h-1 bg-gray-700 mb-6"></div>
              </div>

              {/* CAMBIO 5: Texto de párrafo oscuro para fondo claro */}
              <p className="text-xl text-gray-700 leading-relaxed">
                Soluciones hidráulicas y de construcción con{" "}
                {/* CAMBIO 6: Énfasis de texto oscuro */}
                <span className="font-semibold text-blue-700">
                  estándares de calidad profesional
                </span>{" "}
                para cada necesidad de su proyecto.
              </p>

              {/* Categorías de servicios */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                {[
                  {
                    icon: Droplet,
                    title: "Sistemas Hidráulicos",
                    count: "3 servicios",
                    // Mantener colores específicos en los íconos si se desea
                    color: "bg-blue-600",
                  },
                  {
                    icon: Sun,
                    title: "Mantenimiento",
                    count: "2 servicios",
                    color: "bg-orange-600",
                  },
                  {
                    icon: Sprout,
                    title: "Diseño & Jardines",
                    count: "4 servicios",
                    color: "bg-emerald-600",
                  },
                ].map((category, i) => (
                  <div
                    key={i}
                    // CAMBIO 7: Fondo de las tarjetas blanco sólido y borde más sutil
                    className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className={`w-14 h-14 ${category.color} rounded-lg flex items-center justify-center mb-3 shadow-lg`}
                      >
                        <category.icon
                          className="w-7 h-7 text-white"
                          strokeWidth={2}
                        />
                      </div>
                      {/* CAMBIO 8: Texto de las tarjetas oscuro */}
                      <h3 className="font-semibold text-gray-800 mb-1 text-base">
                        {category.title}
                      </h3>
                      {/* CAMBIO 9: Conteo de servicios oscuro */}
                      <p className="text-sm text-gray-500">
                        {category.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .animate-fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;