const WhyChooseUs = ({ whyChooseUs, isVisible }) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-100 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 animate-fade-in-up ${
            isVisible.whyUs ? "visible" : ""
          }`}
          data-animate
          id="whyUs"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="gradient-text">¿Por Qué Elegirnos?</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            La combinación perfecta de experiencia, calidad y compromiso con
            nuestros clientes
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
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1C2E82] mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
