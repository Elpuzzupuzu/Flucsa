import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa los estilos de Swiper. Asegúrate de que estén disponibles en tu proyecto.
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductCard = ({ product }) => {
  const [isWished, setIsWished] = useState(false);
  const [rating] = useState(4.5); // Rating ejemplo

  const toggleWish = () => {
    setIsWished(!isWished);
  };

  const handleShare = () => {
    // Función de compartir (ejemplo)
    console.log('Compartir producto:', product.name);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-fill">
              <stop offset="50%" stopColor="currentColor"/>
              <stop offset="50%" stopColor="transparent"/>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-gray-100 relative">
      {/* Badge de oferta */}
      <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-md">
        OFERTA
      </div>

      {/* Botones de acción superior */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button 
          onClick={toggleWish}
          className={`p-2 rounded-full shadow-md transition-all duration-300 ${
            isWished 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
          }`}
        >
          <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        <button 
          onClick={handleShare}
          className="p-2 bg-white/90 rounded-full shadow-md text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>

      {/* Imagen del producto */}
      <div className="relative w-full h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image || "https://via.placeholder.com/400x400?text=Sin+Imagen"}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-5 bg-white">
        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-sm text-gray-500 ml-1">({rating})</span>
          </div>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">ID: {product.id}</span>
        </div>

        {/* Nombre del producto */}
        <h3 className="text-gray-800 text-lg font-bold mb-3 leading-tight min-h-[3rem] flex items-center group-hover:text-blue-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Precio */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ${(product.price * 1.2).toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-green-600 font-semibold">
            Ahorra ${(product.price * 0.2).toFixed(2)}
          </div>
        </div>

        {/* Estado de stock */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">En stock</span>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
            Ver Producto
          </button>
          
          <button className="px-4 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10m-10 0a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const products = [
  { id: 1, name: 'Bomba de Agua Hidráulica', price: 1500.00, image: 'https://http2.mlstatic.com/D_996422-MLU78265371020_082024-C.jpg' },
  { id: 2, name: 'Válvula de Control', price: 850.50, image: 'https://www.valfonta.com/wp-content/uploads/2020/02/ok-C1-PROVISIONAL-500x500.jpg' },
  { id: 3, name: 'Filtro de Agua Industrial', price: 2100.75, image: 'https://www.plantasdeosmosis.com/lib/timThumb/timThumb.php?src=/upload/files/Filtros%20para%20absorver%20mercurio%20%20del%20agua.jpg&w=612&h=612&zc=2' },
  { id: 4, name: 'Manguera de Alta Presión', price: 450.00, image: 'https://urreastore.com.mx/7139-large_default/108150-manguera-para-aire-de-alta-presion-38-x-15m-surtek.jpg' },
  { id: 5, name: 'Manómetro Digital', price: 299.99, image: 'https://midebien.com/wp-content/uploads/2024/03/3.jpg' },
  { id: 6, name: 'Motor para Piscina', price: 3500.00, image: 'https://bedon.mx/wp-content/uploads/2024/02/PEDROLLO-MGNIFICA-600x600.png' },
  { id: 7, name: 'Cemento para piscina', price: 1250.00, image: 'https://sika.scene7.com/is/image/sikacs/mx-02-es-mx-adhesivo-albercas-1-1x1-00424194?wid=480&fit=crop%2C1' },
  { id: 8, name: 'Sellos de Empaque', price: 50.00, image: 'https://www.ceetpower.com/valvulas.png' },
];

const ProductSliderPrototype = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl transform translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100/20 to-blue-100/20 rounded-full blur-3xl transform -translate-x-40 translate-y-40"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-100/20 rounded-full blur-2xl transform -translate-x-32 -translate-y-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 drop-shadow-sm">
            Productos Destacados
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra selección de productos industriales con la mejor calidad y precios competitivos
          </p>
        </div>

        <Swiper
          // Módulos que habilitan la navegación, paginación y ahora la reproducción automática
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          // Configuración de reproducción automática
          autoplay={{
            delay: 5000, // 5 segundos
            disableOnInteraction: false, // La reproducción automática no se detiene después de la interacción del usuario
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 30 },
            768: { slidesPerView: 3, spaceBetween: 35 },
            1024: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="mySwiper pb-16"
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #3b82f6 !important;
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 50% !important;
          width: 50px !important;
          height: 50px !important;
          backdrop-filter: blur(10px) !important;
          border: 2px solid rgba(59, 130, 246, 0.2) !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #3b82f6 !important;
          color: white !important;
          transform: scale(1.1) !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.3) !important;
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: bold !important;
        }
        
        .swiper-pagination {
          bottom: 0 !important;
        }
        
        .swiper-pagination-bullet {
          background: rgba(59, 130, 246, 0.3) !important;
          width: 12px !important;
          height: 12px !important;
          transition: all 0.3s ease !important;
          border: 2px solid transparent !important;
        }
        
        .swiper-pagination-bullet-active {
          background: #3b82f6 !important;
          transform: scale(1.3) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4) !important;
        }
      `}</style>
    </div>
  );
};

export default ProductSliderPrototype;