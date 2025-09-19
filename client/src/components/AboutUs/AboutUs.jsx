import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-slate-100 py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Sección de Texto */}
        <div className="text-center md:text-left">
          <h2 className="text-5xl font-extrabold text-[#1C2E82] mb-4">Nuestra Historia</h2>
          <div className="w-20 h-1 bg-[#ED0000] mx-auto md:ml-0 mb-12 rounded-full"></div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Fundada en 2015, Flucsa ha sido un pilar en la industria hidráulica,
            ofreciendo soluciones innovadoras y de alta calidad para nuestros
            clientes. Lo que comenzó como un pequeño taller familiar se ha
            convertido en un referente de excelencia, con un compromiso inquebrantable
            con la calidad, la durabilidad y la satisfacción del cliente. A lo largo
            de las décadas, hemos evolucionado con la tecnología, pero nuestra
            misión principal se mantiene: proveer los mejores productos y el
            servicio más confiable en el mercado.
          </p>
        </div>
        
        {/* Sección de Imágenes */}
        <div className="flex flex-col items-center md:items-start space-y-8">
          <img 
            src="https://placehold.co/600x400/1C2E82/FFFFFF?text=Equipo+Fundador"
            alt="Equipo Fundador de Flucsa"
            className="rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 w-full max-w-sm"
          />
          <img
            src="https://placehold.co/600x400/ED0000/FFFFFF?text=Nuestro+equipo"
            alt="Equipo actual de Flucsa"
            className="rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
