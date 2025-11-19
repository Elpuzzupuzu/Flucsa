const WhyChooseUs = ({ whyChooseUs, isVisible }) => {
  return (
    <section
      // CAMBIO 1: Fondo blanco puro para elegancia
      className="py-20 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 animate-fade-in-up ${
            isVisible.whyUs ? "visible" : ""
          }`}
          data-animate
          id="whyUs"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900">
            {/* CAMBIO 2: Título oscuro y simple (eliminado el gradiente) */}
            ¿Por Qué Elegirnos?
          </h2>
          {/* CAMBIO 3: Divisor sutil y profesional (gris oscuro) */}
          <div className="w-20 h-1 bg-gray-700 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            La combinación perfecta de experiencia, calidady compromiso con nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className={`text-center group animate-scale-in ${
                isVisible[`why-${i}`] ? "visible" : ""
              }`}
              data-animate
              id={`why-${i}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Contenedor exterior del icono: Fondo blanco con sombra sutil */}
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform border border-gray-100">
                {/* CAMBIO 4: Fondo del icono más sutil o utilizando un color de acento corporativo (por ejemplo, azul oscuro/negro) */}
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              {/* CAMBIO 5: Título de la tarjeta oscuro */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              {/* CAMBIO 6: Descripción de la tarjeta oscura */}
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;