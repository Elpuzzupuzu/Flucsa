const CTASection = ({ isVisible }) => {
  return (
    <section
      className={`py-20 px-6 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] text-white text-center animate-fade-in-up ${
        isVisible.cta ? "visible" : ""
      }`}
      data-animate
      id="cta"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black mb-6">
          ¿Listo para mejorar tu hogar?
        </h2>
        <p className="text-lg mb-8 text-blue-100">
          Contáctanos hoy mismo y recibe una cotización personalizada sin costo
        </p>
        <button className="bg-white text-[#1C2E82] font-semibold py-3 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300">
          Solicitar Cotización
        </button>
      </div>
    </section>
  );
};

export default CTASection;
