import ServiceCard from "./serviceCard";

const ServicesGrid = ({ services, isVisible }) => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-20 animate-fade-in-up ${
            isVisible.servicesHeader ? "visible" : ""
          }`}
          data-animate
          id="servicesHeader"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="gradient-text">Servicios Especializados</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Cada servicio está diseñado para superar tus expectativas con
            tecnología avanzada y mano de obra especializada
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isVisible={isVisible[`service-${index}`]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
