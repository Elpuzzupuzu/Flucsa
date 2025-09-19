import React from 'react';
import { Calendar, Users, Award, TrendingUp } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { icon: Calendar, number: '2015', label: 'Año de Fundación' },
    { icon: Users, number: '500+', label: 'Clientes Satisfechos' },
    { icon: Award, number: '15', label: 'Años de Experiencia' },
    { icon: TrendingUp, number: '98%', label: 'Satisfacción del Cliente' },
  ];

  return (
    <section className="bg-slate-100 py-16 px-6 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-64 h-64 bg-[#1C2E82] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#ED0000] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1C2E82] rounded-xl mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-black text-[#1C2E82] mb-3 tracking-tight">
            Nuestra Historia
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-4 rounded-full"></div>
          <p className="text-slate-600 text-lg max-w-xl mx-auto leading-relaxed">
            Una trayectoria de excelencia e innovación en la industria hidráulica
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Sección de Texto */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C2E82] mb-2">Nuestros Inicios</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    Fundada en 2015, Flucsa comenzó como un pequeño taller familiar con una gran visión: 
                    revolucionar la industria hidráulica con soluciones innovadoras y de máxima calidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-500">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ED0000] to-[#ff4444] rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1C2E82] mb-2">Nuestro Crecimiento</h3>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    A lo largo de estos años, hemos evolucionado constantemente, incorporando las últimas 
                    tecnologías sin perder de vista nuestros valores fundamentales: calidad, confiabilidad y excelencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-lg font-bold mb-3">Nuestro Compromiso</h3>
              <p className="text-sm leading-relaxed opacity-90">
                Hoy somos un referente de excelencia en el mercado, manteniendo nuestro compromiso 
                inquebrantable con la satisfacción del cliente y la innovación constante.
              </p>
            </div>
          </div>
          
          {/* Sección de Imágenes */}
          <div className="space-y-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img 
                src="https://placehold.co/600x400/1C2E82/FFFFFF?text=Equipo+Fundador"
                alt="Equipo Fundador de Flucsa"
                className="relative rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 w-full"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                <h4 className="font-bold text-[#1C2E82] mb-1">Equipo Fundador</h4>
                <p className="text-sm text-slate-600">Los visionarios que iniciaron esta gran historia</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-3xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <img
                src="https://placehold.co/600x400/ED0000/FFFFFF?text=Nuestro+Equipo"
                alt="Equipo actual de Flucsa"
                className="relative rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 w-full"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                <h4 className="font-bold text-[#1C2E82] mb-1">Nuestro Equipo Actual</h4>
                <p className="text-sm text-slate-600">Profesionales comprometidos con la excelencia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200/50">
          <h3 className="text-2xl font-bold text-[#1C2E82] text-center mb-12">
            Números que Nos Definen
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1C2E82] to-[#2d4bc7] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-[#1C2E82] mb-2 group-hover:text-[#ED0000] transition-colors">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-2xl px-8 py-4 text-white font-bold hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <span className="mr-2">Conoce más sobre nosotros</span>
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;