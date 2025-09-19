import React from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Zap, Gift, Truck } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: '50% DE DESCUENTO',
    subtitle: 'MEGA OFERTA',
    description: 'En toda nuestra línea de productos industriales. No pierdas esta oportunidad única.',
    image: 'https://es.dombor.com/wp-content/uploads/2021/09/image-edited.png',
    bgGradient: 'from-blue-600 via-blue-700 to-indigo-800',
    btnColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    btnText: 'Ver Ofertas',
    icon: <Zap className="w-6 h-6" />,
    badge: 'LIMITADO'
  },
  {
    id: 2,
    title: 'PROMOCIÓN EXCLUSIVA',
    subtitle: 'SOLO ESTE MES',
    description: 'Equipos de piscina con la mejor tecnología. Transforma tu espacio.',
    image: 'https://piscinaselifra.com/wp-content/uploads/2021/05/piscina-8x4-piscinas-elifra_de-dia.jpeg',
    bgGradient: 'from-cyan-500 via-blue-600 to-blue-800',
    btnColor: 'bg-gradient-to-r from-cyan-400 to-blue-500',
    btnText: 'Comprar Ahora',
    icon: <Gift className="w-6 h-6" />,
    badge: 'EXCLUSIVO'
  },
  {
    id: 3,
    title: 'ENVÍO GRATIS',
    subtitle: 'SIN COSTO ADICIONAL',
    description: 'En pedidos mayores a $1000 MXN. Recibe tus productos en la comodidad de tu hogar.',
    image: 'https://marketing4ecommerce.mx/wp-content/uploads/2019/07/env%C3%ADo-gratis-ecommerce.jpg',
    bgGradient: 'from-purple-600 via-purple-700 to-indigo-800',
    btnColor: 'bg-gradient-to-r from-purple-400 to-pink-500',
    btnText: 'Aprovechar',
    icon: <Truck className="w-6 h-6" />,
    badge: 'POPULAR'
  },
];

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentOffer = offers[currentSlide];

  return (
    <div className="relative py-20 bg-gradient-to-b from-blue-900 to-blue-800 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/20 rounded-lg blur-2xl rotate-45"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-1000"></div>

      <div className="w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-xs font-semibold mb-2">
            Ofertas Especiales
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            No Te Pierdas Nuestras <span className="text-cyan-400">Promociones</span>
          </h2>
        </div>

        {/* Main Slider */}
        <div className="relative">
          <div className={`bg-gradient-to-r ${currentOffer.bgGradient} rounded-3xl shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-7xl`}>
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {/* Content Side */}
              <div className="lg:w-1/2 p-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold mb-2">
                  {currentOffer.icon}
                  {currentOffer.badge}
                </div>

                {/* Subtitle */}
                <p className="text-cyan-300 text-sm font-medium mb-1">{currentOffer.subtitle}</p>

                {/* Main Title */}
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                  {currentOffer.title}
                </h3>

                {/* Description */}
                <p className="text-blue-100 text-sm md:text-base mb-4 leading-relaxed max-w-md">
                  {currentOffer.description}
                </p>

                {/* CTA Button */}
                <button 
                  className={`inline-flex items-center gap-2 ${currentOffer.btnColor} text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group text-sm`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {currentOffer.btnText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Rating */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-blue-200 text-xs">4.9 (2,341 reseñas)</span>
                </div>
              </div>

              {/* Image Side */}
              <div className="lg:w-1/2 p-6">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-white/10 rounded-xl blur-lg group-hover:bg-white/20 transition-all duration-300"></div>
                  <img 
                    src={currentOffer.image} 
                    alt={currentOffer.title}
                    className="relative w-full h-40 md:h-48 object-cover rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay decorativo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {offers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? 'w-6 h-2 bg-cyan-400 rounded-full'
                  : 'w-2 h-2 bg-white/30 rounded-full hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-1 mt-2">
          <div 
            className="bg-cyan-400 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / offers.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
