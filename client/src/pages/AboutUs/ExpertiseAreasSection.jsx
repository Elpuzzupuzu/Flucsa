
const ExpertiseCard = ({ 
  title, 
  description, 
  image, 
  animationClass, 
  id, 
  style 
}) => (
  <div
    id={id}
    className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${animationClass}`}
    data-animate
    style={style}
  >
    {/* Imagen de fondo */}
    <div className="relative h-64 overflow-hidden bg-slate-200">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    </div>

    {/* Contenido */}
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#ED0000] transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
        {description}
      </p>
      <div className="mt-4 inline-block">
        <div className="w-12 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] rounded-full group-hover:w-16 transition-all"></div>
      </div>
    </div>

    {/* Overlay hover adicional */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#ED0000]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </div>
);

const ExpertiseAreasSection = ({ expertiseAreas = [], getAnimationClass = (key, fallback = 'fade-in') => fallback }) => {
  // Datos de ejemplo si no se proporcionan
  const defaultExpertiseAreas = [
    {
      title: "Instalación Hidráulica",
      description: "Sistemas completos de tuberías y conexiones hidráulicas",
      image: "https://rootsmacaronesia.com/wp-content/uploads/2022/05/Descubre-los-3-mejores-sistemas-de-riego-para-tu-huerto-1024x768.jpeg"
    },
    {
      title: "Mantenimiento Preventivo",
      description: "Inspecciones periódicas para evitar problemas futuros",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
    },
    {
      title: "Reparación de Averías",
      description: "Soluciones rápidas para emergencias hidráulicas",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
    },
    {
      title: "Sistemas de Bombeo",
      description: "Instalación y optimización de bombas hidráulicas",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
    },
    {
      title: "Control de Fugas",
      description: "Detección y reparación de fugas en tuberías",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
    },
    {
      title: "Consultoría Técnica",
      description: "Asesoramiento experto en soluciones hidráulicas",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
    }
  ];

  const areas = expertiseAreas.length > 0 ? expertiseAreas : defaultExpertiseAreas;

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div 
          className={`text-center mb-16 ${getAnimationClass('expertise')}`}
          data-animate
          id="expertise"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#ED0000] to-[#ff4444] bg-clip-text text-transparent">
              Nuestras Especialidades
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#ED0000] to-[#ff4444] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ofrecemos una amplia gama de servicios especializados para cubrir todas tus necesidades hidráulicas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => (
            <ExpertiseCard 
              key={index} 
              {...area} 
              animationClass={getAnimationClass(`area-${index}`, 'scale-in')}
              id={`area-${index}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAreasSection;