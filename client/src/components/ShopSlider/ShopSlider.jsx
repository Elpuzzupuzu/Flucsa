import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importa los estilos de Swiper. Asegúrate de que estén disponibles en tu proyecto.
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative w-full h-52 sm:h-64 overflow-hidden">
        <img
          src={product.image || "https://via.placeholder.com/400x400?text=Sin+Imagen"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-md">
          OFERTA
        </div>
      </div>
      <div className="p-5 flex flex-col items-center">
        <h3 className="text-gray-800 text-lg font-semibold truncate mb-2 text-center">
          {product.name}
        </h3>
        <p className="text-blue-700 text-2xl font-extrabold mb-3">
          ${product.price.toFixed(2)}
        </p>
        <button className="mt-auto w-full px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300">
          Ver Producto
        </button>
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
    <div className="py-20 bg-red-500">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-10 text-center md:text-left">
          Productos Destacados
        </h2>
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
          className="mySwiper"
        >
          {products.map(product => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSliderPrototype;
