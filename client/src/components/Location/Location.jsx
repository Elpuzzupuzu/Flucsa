import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

const Location = () => {
  const companyInfo = {
    address: 'Calle 26a entre 47 y 51. Colonia el Roble, Ciudad Industrial Mérida, Yucatán. C.P 97256',
    phone: '+52 9993632630',
    email: 'ventas@flucsa.com.mx',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.6079938646676!2d-89.68317442528853!3d20.91822699156695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5671bd64b9191f%3A0x1ac55c2e725e84a9!2sFLUCSA%20S.A%20DE%20C.V!5e1!3m2!1ses-419!2smx!4v1760195817751!5m2!1ses-419!2smx',
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#1C2E82] via-[#2d4bc7] to-[#4361ee] rounded-2xl mb-6 shadow-2xl ring-4 ring-white/50">
            <MapPin className="w-8 h-8 text-white drop-shadow-lg" />
          </div>

          <h2 className="text-5xl font-black bg-gradient-to-r from-[#1C2E82] via-[#2d4bc7] to-[#4361ee] bg-clip-text text-transparent mb-4 tracking-tight leading-tight">
            Dónde nos ubicamos?
          </h2>

          <p className="text-slate-700 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Visítanos y conoce nuestra sucursal más cercana. Estamos estratégicamente ubicados para brindarte el mejor servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Mapa */}
          <div className="group">
            <div className="bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Mapa Interactivo</h3>
                    <p className="text-white/80 text-sm">Explora nuestra ubicación</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <iframe
                  title="Ubicación de la empresa"
                  src={companyInfo.mapEmbedUrl}
                  className="w-full h-96 transition-all duration-300 group-hover:brightness-105"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-8">
            {/* Dirección */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1C2E82] via-[#2d4bc7] to-[#4361ee] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-[#1C2E82] mb-2 group-hover:text-[#2d4bc7] transition-colors duration-300">Dirección</h3>
                  <p className="text-slate-700 leading-relaxed font-medium">{companyInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Teléfono */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#ED0000] via-[#ff4444] to-[#ff6b6b] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-[#1C2E82] mb-2 group-hover:text-[#ED0000] transition-colors duration-300">Teléfono</h3>
                  <a href={`tel:${companyInfo.phone}`} className="text-slate-700 leading-relaxed font-medium hover:text-[#ED0000] transition-colors duration-300">{companyInfo.phone}</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group bg-white rounded-3xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm">
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1C2E82] via-[#2d4bc7] to-[#4361ee] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-[#1C2E82] mb-2 group-hover:text-[#2d4bc7] transition-colors duration-300">Email</h3>
                  <a href={`mailto:${companyInfo.email}`} className="text-slate-700 leading-relaxed font-medium hover:text-[#1C2E82] transition-colors duration-300">{companyInfo.email}</a>
                </div>
              </div>
            </div>

            {/* Botón Cómo llegar */}
            <div className="text-center lg:text-left pt-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyInfo.address)}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-gradient-to-r from-[#ED0000] via-[#ff4444] to-[#ff6b6b] rounded-3xl px-10 py-5 text-white font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-white/30 backdrop-blur-sm"
              >
                <span className="mr-3 group-hover:mr-4 transition-all duration-300">Cómo llegar</span>
                <Navigation className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
