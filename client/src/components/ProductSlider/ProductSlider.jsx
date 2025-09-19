import React from 'react';
// Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Nueva importación para las flechas

const offers = [
  {
    title: '50% DE DESCUENTO',
    description: 'En toda nuestra línea de productos industriales.',
    image: 'https://placehold.co/800x400/0000FF/FFFFFF?text=Oferta+Industrial',
    bgColor: 'bg-blue-600',
    btnColor: 'bg-yellow-400',
    btnText: 'Ver Ahora'
  },
  {
    title: 'PROMOCIÓN EXCLUSIVA',
    description: 'En equipos de piscina, solo por este mes.',
    image: 'https://placehold.co/800x400/008000/FFFFFF?text=Oferta+Piscina',
    bgColor: 'bg-green-600',
    btnColor: 'bg-blue-400',
    btnText: 'Comprar'
  },
  {
    title: 'ENVÍO GRATIS',
    description: 'En pedidos mayores a $1000 MXN.',
    image: 'https://placehold.co/800x400/800080/FFFFFF?text=Envio+Gratis',
    bgColor: 'bg-purple-600',
    btnColor: 'bg-red-400',
    btnText: 'Aprovechar'
  },
];

const ProductSlider = () => {
  return (
    <div className="py-12 bg-gray-100">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true} // Activado para mostrar las flechas
        className="mySwiper max-w-7xl mx-auto rounded-xl shadow-lg"
      >
        {offers.map((offer, index) => (
          <SwiperSlide key={index}>
            <div className={`flex flex-col md:flex-row items-center justify-between p-8 md:p-12 text-white rounded-xl ${offer.bgColor}`}>
              <div className="md:w-1/2 text-center md:text-left space-y-4">
                <h2 className="text-3xl md:text-5xl font-black">{offer.title}</h2>
                <p className="text-lg md:text-xl font-medium">{offer.description}</p>
                <button className={`mt-4 px-6 py-3 rounded-full font-bold ${offer.btnColor} text-white hover:opacity-90 transition-opacity`}>
                  {offer.btnText}
                </button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <img src={offer.image} alt={offer.title} className="rounded-xl shadow-2xl" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;