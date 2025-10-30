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
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header minimalista */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Nuestra Ubicación
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Visítanos en nuestra sucursal o contáctanos por los medios que prefieras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mapa */}
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 h-full shadow-sm">
              <iframe
                title="Ubicación de la empresa"
                src={companyInfo.mapEmbedUrl}
                className="w-full h-96 lg:h-full min-h-96"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Dirección */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-blue-100 transition-colors">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Dirección
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {companyInfo.address}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Teléfono */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-green-100 transition-colors">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Teléfono
                </h3>
                <a 
                  href={`tel:${companyInfo.phone}`} 
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Email */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-purple-100 transition-colors">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1 uppercase tracking-wide">
                  Email
                </h3>
                <a 
                  href={`mailto:${companyInfo.email}`} 
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* Botón Cómo llegar */}
            <div className="pt-6">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(companyInfo.address)}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto"
              >
                <Navigation className="w-4 h-4" />
                <span>Cómo llegar</span>
              </a>
            </div>

            {/* Horarios (opcional) */}
            <div className="pt-4 pb-2">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  Horario de Atención
                </h3>
                <p className="text-sm text-gray-600">
                  Lunes a Viernes: 8:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  Sábado: 9:00 AM - 2:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;