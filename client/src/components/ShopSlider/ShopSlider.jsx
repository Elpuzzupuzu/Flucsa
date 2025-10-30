import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart } from 'lucide-react';

// Componente StarRating
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

// Componente ProductCard
const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  const [rating] = useState(4.5);

  const toggleWish = () => {
    setIsWished(!isWished);
  };

  const handleShare = () => {
    console.log('Compartir producto:', product.name);
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Badge de destacado */}
      <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md">
        DESTACADO
      </div>

      {/* Botones de acción superior */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={toggleWish}
          className={`p-2 rounded-lg shadow-sm transition-all duration-200 ${
            isWished
              ? 'bg-red-50 text-red-600'
              : 'bg-white text-gray-400 hover:text-red-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleShare}
          className="p-2 bg-white rounded-lg shadow-sm text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Imagen del producto */}
      <div className="relative w-full h-56 overflow-hidden bg-gray-50">
        <img
          src={product.image || 'https://via.placeholder.com/400x400?text=Sin+Imagen'}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        {/* Rating y ID */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <StarRating rating={rating} />
            <span className="text-sm text-gray-500">({rating})</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            ID: {product.id}
          </span>
        </div>

        {/* Nombre del producto */}
        <h3 className="text-gray-900 text-sm font-semibold mb-3 leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Estado de stock */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600 font-medium">En stock</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Ver Producto
          </button>

          <button className="px-3 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Principal ProductSlider
const products = [
  {
    id: 1,
    name: 'Bomba de Agua Hidráulica Industrial de Alto Flujo',
    price: 1500.0,
    image: 'https://http2.mlstatic.com/D_996422-MLU78265371020_082024-C.jpg',
  },
  {
    id: 2,
    name: 'Válvula de Control Motorizada de Acero Inoxidable',
    price: 850.5,
    image: 'https://www.valfonta.com/wp-content/uploads/2020/02/ok-C1-PROVISIONAL-500x500.jpg',
  },
  {
    id: 3,
    name: 'Filtro de Agua Industrial de Alto Rendimiento',
    price: 2100.75,
    image: 'https://www.plantasdeosmosis.com/lib/timThumb/timThumb.php?src=/upload/files/Filtros%20para%20absorver%20mercurio%20%20del%20agua.jpg&w=612&h=612&zc=2',
  },
  {
    id: 4,
    name: 'Manguera de Alta Presión Reforzada 3/8"',
    price: 450.0,
    image: 'https://urreastore.com.mx/7139-large_default/108150-manguera-para-aire-de-alta-presion-38-x-15m-surtek.jpg',
  },
  {
    id: 5,
    name: 'Manómetro Digital de Precisión',
    price: 299.99,
    image: 'https://midebien.com/wp-content/uploads/2024/03/3.jpg',
  },
  {
    id: 6,
    name: 'Motor de 3HP para Piscina con Certificación ISO',
    price: 3500.0,
    image: 'https://bedon.mx/wp-content/uploads/2024/02/PEDROLLO-MGNFICA-600x600.png',
  },
  {
    id: 7,
    name: 'Cemento Epóxico para Reparación de Albercas',
    price: 1250.0,
    image: 'https://sika.scene7.com/is/image/sikacs/mx-02-es-mx-adhesivo-albercas-1-1x1-00424194?wid=480&fit=crop%2C1',
  },
  {
    id: 8,
    name: 'Kit de Sellos de Empaque para Válvulas Industriales',
    price: 50.0,
    image: 'https://www.ceetpower.com/valvulas.png',
  },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = React.useState(4);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Destacados
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Productos Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Descubre nuestra colección premium de soluciones industriales con garantía de calidad y precios imbatibles
          </p>
        </div>

        {/* Carrusel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Indicadores de paginación */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-blue-600'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm mb-4">¿Necesitas más productos?</p>
          <button className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Ver Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;