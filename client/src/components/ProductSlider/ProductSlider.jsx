import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from 'lucide-react';

const ProductSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Datos de ejemplo - reemplaza con tus productos reales
const offers = [
  {
    id: 1,
    title: "Tubería PVC hidráulica 1'' (6m)",
    originalPrice: "$280",
    salePrice: "$220",
    discount: "21%",
    image: "https://bedon.mx/wp-content/uploads/2022/06/TUBO-PVC-H.jpg",
    description: "Resistente a presión, ideal para instalaciones de agua potable.",
    rating: 4.8,
    reviews: 154
  },
  {
    id: 2,
    title: "Codo PVC hidráulico 90° de 1''",
    originalPrice: "$25",
    salePrice: "$18",
    discount: "28%",
    image: "https://depotmx.com/wp-content/uploads/2019/02/145Codo-90-PVC-ced-40-scaled.jpg",
    description: "Conexión confiable para redirigir flujo en sistemas hidráulicos.",
    rating: 4.7,
    reviews: 98
  },
  {
    id: 3,
    title: "Válvula esfera PVC hidráulica 1''",
    originalPrice: "$180",
    salePrice: "$140",
    discount: "22%",
    image: "https://plomosa.com.mx/cdn/shop/products/845951----_yeclYcv--_BJpr9Qq.jpg?v=1699059465",
    description: "Duradera y práctica para corte de paso en tuberías de agua.",
    rating: 4.9,
    reviews: 210
  },
  {
    id: 4,
    title: "Bomba periférica 1/2 HP",
    originalPrice: "$2,600",
    salePrice: "$2,150",
    discount: "17%",
    image: "https://hagalo.mx/43179-large_default/bomba-electrica-periferica-para-agua-1-2-hp-10068.jpg",
    description: "Perfecta para aumentar presión en instalaciones domésticas.",
    rating: 4.8,
    reviews: 134
  }
];

  // Auto-play funcionalidad
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, offers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-red-600 via-blue-700 to-red-800 rounded-2xl shadow-2xl">
      {/* Slider Container */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {offers.map((offer, index) => (
          <div key={offer.id} className="min-w-full h-full relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-red-900/90"></div>
            
            {/* Content Grid */}
            <div className="relative z-10 h-full grid grid-cols-1 md:grid-cols-2 items-center px-6 md:px-12">
              {/* Text Content - 50% */}
              <div className="text-white space-y-4 order-2 md:order-1 flex flex-col justify-center h-full py-8">
                <div className="inline-block">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    -{offer.discount} OFF
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {offer.title}
                </h2>
                
                <p className="text-base md:text-lg text-blue-100">
                  {offer.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-white font-medium">{offer.rating}</span>
                  <span className="text-blue-200">({offer.reviews} reseñas)</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center space-x-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {offer.salePrice}
                  </span>
                  <span className="text-xl text-red-300 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                
                {/* CTA Button */}
                <button className="bg-white text-red-600 px-6 py-3 rounded-full font-bold text-base hover:bg-red-50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg w-fit">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Comprar Ahora</span>
                </button>
              </div>
              
              {/* Product Image - 50% del contenedor, ocupa todo el espacio disponible */}
              <div className="order-1 md:order-2 relative h-full">
                <div className="absolute inset-4 group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-red-400 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <img 
                    src={offer.image}
                    alt={offer.title}
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-xs animate-bounce shadow-lg">
                    ¡OFERTA!
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Control */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm hover:bg-white/30 transition-all duration-300 z-20"
      >
        {isAutoPlaying ? 'Pausar' : 'Auto'}
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-red-400 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / offers.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ProductSlider;