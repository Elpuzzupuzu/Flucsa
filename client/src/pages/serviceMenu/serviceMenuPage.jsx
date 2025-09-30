import { useParams, useNavigate } from "react-router-dom";
import { services } from "../Servicios/serviceData";
import { ArrowLeft, Info } from "lucide-react";

const ServiceMenuPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const selectedCategory = services.find(
    (service) => service.id === category
  );

  if (!selectedCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Categoría no encontrada
          </h2>
          <p className="text-gray-600 mb-6">
            La categoría que buscas no existe
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 font-medium"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = selectedCategory.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header mejorado con icono dinámico */}
      <div className={`bg-gradient-to-r ${selectedCategory.color} relative overflow-hidden`}>
        {/* Patrón de fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-32 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
          {/* Botón volver */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-8 transition duration-200 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver</span>
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            {/* Icono grande del servicio */}
            <div className="bg-white/20 backdrop-blur-sm p-6 rounded-3xl shadow-2xl">
              <IconComponent className="text-white" size={56} strokeWidth={1.5} />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-3">
                {selectedCategory.title}
              </h1>
              <p className="text-lg md:text-xl text-white/95 max-w-3xl leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>
          </div>
        </div>

        {/* Onda decorativa */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30C240 10 480 10 720 30C960 50 1200 50 1440 30V60H0V30Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {selectedCategory.items && selectedCategory.items.length > 0 ? (
          <>
            {/* Información de servicios */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b-2 border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  Nuestros Servicios
                </h2>
                <p className="text-gray-600">
                  {selectedCategory.items.length}{" "}
                  {selectedCategory.items.length === 1
                    ? "servicio especializado"
                    : "servicios especializados"}
                </p>
              </div>
              <div className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedCategory.color} text-white font-semibold shadow-lg`}>
                <Info size={18} />
                <span>Calidad Garantizada</span>
              </div>
            </div>

            {/* Grid de servicios con espacio para imágenes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedCategory.items.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
                >
                  {/* Espacio para imagen */}
                  <div className={`relative h-48 bg-gradient-to-br ${selectedCategory.color} overflow-hidden`}>
                    {/* Placeholder para imagen - Reemplazar con <img src={item.image} /> */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent 
                        className="text-white/30" 
                        size={80} 
                        strokeWidth={1.5} 
                      />
                    </div>
                    
                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Número de badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                      <span className={`font-black text-lg bg-gradient-to-r ${selectedCategory.color} bg-clip-text text-transparent`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Indicador de hover */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xl">→</span>
                    </div>
                  </div>
                  
                  {/* Contenido */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:to-gray-900 transition-all duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {item.details}
                    </p>

                    {/* Botón de acción */}
                    <button className={`w-full py-2.5 px-4 bg-gradient-to-r ${selectedCategory.color} text-white rounded-xl font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-md hover:shadow-lg`}>
                      Más información
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to action */}
            <div className={`mt-16 bg-gradient-to-r ${selectedCategory.color} rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  ¿Necesitas asesoría personalizada?
                </h3>
                <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                  Nuestros expertos están listos para ayudarte a elegir la mejor solución para tu proyecto
                </p>
                <button className="bg-white text-gray-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  Contáctanos Ahora
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner">
            <div className="text-7xl mb-6">🚧</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              Próximamente
            </h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Estamos trabajando en agregar servicios especializados a esta categoría
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceMenuPage;