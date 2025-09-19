import React from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Zap, Gift, Truck, Play, Pause } from 'lucide-react';

const offers = [
  {
    id: 1,
    title: '50% DE DESCUENTO',
    subtitle: 'MEGA OFERTA',
    description: 'En toda nuestra línea de productos industriales. No pierdas esta oportunidad única.',
    image: 'https://es.dombor.com/wp-content/uploads/2021/09/image-edited.png',
    icon: <Zap className="w-6 h-6" />,
    badge: 'LIMITADO'
  },
  {
    id: 2,
    title: 'PROMOCIÓN EXCLUSIVA',
    subtitle: 'SOLO ESTE MES',
    description: 'Equipos de piscina con la mejor tecnología. Transforma tu espacio.',
    image: 'https://piscinaselifra.com/wp-content/uploads/2021/05/piscina-8x4-piscinas-elifra_de-dia.jpeg',
    icon: <Gift className="w-6 h-6" />,
    badge: 'EXCLUSIVO'
  },
  {
    id: 3,
    title: 'ENVÍO GRATIS',
    subtitle: 'SIN COSTO ADICIONAL',
    description: 'En pedidos mayores a $1000 MXN. Recibe tus productos en la comodidad de tu hogar.',
    image: 'https://marketing4ecommerce.mx/wp-content/uploads/2019/07/env%C3%ADo-gratis-ecommerce.jpg',
    icon: <Truck className="w-6 h-6" />,
    badge: 'POPULAR'
  },
];

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  // Auto-play functionality with progress
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentSlide(current => (current + 1) % offers.length);
          return 0;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentOffer = offers[currentSlide];

  return (
    <div className="relative py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Elementos decorativos simplificados */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-red-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gray-100/40 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Header simplificado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold mb-3 shadow-lg">
            <Zap className="w-4 h-4" />
            Ofertas Especiales
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-2">
            No Te Pierdas Nuestras{' '}
            <span className="text-red-500">Promociones</span>
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            Descubre las mejores ofertas en productos industriales y equipos especializados
          </p>
        </div>

        {/* Main Slider Card - Altura reducida, foco en imagen */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="bg-white shadow-xl overflow-hidden border-y border-gray-200">
            <div className="flex flex-col lg:flex-row h-[400px]">
              {/* Content Side - Más compacto */}
              <div className="lg:w-1/3 p-6 lg:p-8 flex flex-col justify-center relative bg-gray-50">
                <div className="relative z-10 max-w-sm">
                  {/* Badge con rojo */}
                  <div className="inline-flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {currentOffer.icon}
                    {currentOffer.badge}
                  </div>

                  {/* Subtitle */}
                  <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                    {currentOffer.subtitle}
                  </p>

                  {/* Main Title - Ajustado */}
                  <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    {currentOffer.title}
                  </h3>

                  {/* Description - Más compacta */}
                  <p className="text-gray-600 text-base mb-5 leading-relaxed">
                    {currentOffer.description}
                  </p>

                  {/* CTA Button con rojo */}
                  <button 
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 group text-base mb-4"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  >
                    Ver Ofertas
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  {/* Rating compacto */}
                  <div className="flex items-center gap-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-900 font-bold">4.9</span>
                    <span className="text-gray-500 text-sm">(2,341 reseñas)</span>
                  </div>
                </div>
              </div>

              {/* Image Side - Protagonista visual */}
              <div className="lg:w-2/3 relative group overflow-hidden">
                {/* Overlay sutil para contraste */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent z-10"></div>
                
                <img 
                  src={currentOffer.image} 
                  alt={currentOffer.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge flotante con rojo */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">%</span>
                  </div>
                </div>
                
                {/* Texto flotante */}
                <div className="absolute bottom-4 right-4 z-20">
                  <div className="bg-white/95 px-3 py-1 rounded-full shadow-lg">
                    <span className="text-gray-900 font-bold text-sm">¡Oferta Limitada!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Simplificados y sobre la imagen */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-6 z-30">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="bg-white/90 text-gray-700 p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {offers.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 h-2 bg-red-500 rounded-full'
                    : 'w-2 h-2 bg-white/60 rounded-full hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={nextSlide}
            className="bg-white/90 text-gray-700 p-2 rounded-lg shadow-md hover:bg-white hover:shadow-lg transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Auto-play control */}
          <button
            onClick={toggleAutoPlay}
            className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-200 ml-2"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>

        {/* Progress Bar - Con rojo */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden max-w-sm mx-auto">
          <div 
            className="bg-red-500 h-1 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Slide counter */}
        <div className="text-center mt-2">
          <span className="text-gray-600 text-sm font-medium">
            {currentSlide + 1} de {offers.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;