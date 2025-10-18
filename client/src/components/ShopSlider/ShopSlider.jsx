import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import ProductCard from './components/ProductCard'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './styles/ProductSlider.css';

const products = [
    { id: 1, name: 'Bomba de Agua Hidráulica Industrial de Alto Flujo', price: 1500.00, image: 'https://http2.mlstatic.com/D_996422-MLU78265371020_082024-C.jpg' },
    { id: 2, name: 'Válvula de Control Motorizada de Acero Inoxidable', price: 850.50, image: 'https://www.valfonta.com/wp-content/uploads/2020/02/ok-C1-PROVISIONAL-500x500.jpg' },
    { id: 3, name: 'Filtro de Agua Industrial de Alto Rendimiento', price: 2100.75, image: 'https://www.plantasdeosmosis.com/lib/timThumb/timThumb.php?src=/upload/files/Filtros%20para%20absorver%20mercurio%20%20del%20agua.jpg&w=612&h=612&zc=2' },
    { id: 4, name: 'Manguera de Alta Presión Reforzada 3/8"', price: 450.00, image: 'https://urreastore.com.mx/7139-large_default/108150-manguera-para-aire-de-alta-presion-38-x-15m-surtek.jpg' },
    { id: 5, name: 'Manómetro Digital de Precisión', price: 299.99, image: 'https://midebien.com/wp-content/uploads/2024/03/3.jpg' },
    { id: 6, name: 'Motor de 3HP para Piscina con Certificación ISO', price: 3500.00, image: 'https://bedon.mx/wp-content/uploads/2024/02/PEDROLLO-MGNFICA-600x600.png' },
    { id: 7, name: 'Cemento Epóxico para Reparación de Albercas', price: 1250.00, image: 'https://sika.scene7.com/is/image/sikacs/mx-02-es-mx-adhesivo-albercas-1-1x1-00424194?wid=480&fit=crop%2C1' },
    { id: 8, name: 'Kit de Sellos de Empaque para Válvulas Industriales', price: 50.00, image: 'https://www.ceetpower.com/valvulas.png' },
];

const ProductSlider = () => {
    return (
        <div className="relative py-24 overflow-hidden">
            
            {/* Fondo Blanco */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-white">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,210,255,0.2),rgba(255,255,255,0))]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Encabezado Premium */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-3 mb-6 bg-blue-500/10 backdrop-blur-sm border border-blue-400/30 px-6 py-2 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">Destacados de la Semana</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent mb-6 drop-shadow-lg leading-tight">
                        Productos Destacados
                    </h2>
                    
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        Descubre nuestra colección premium de <span className="text-blue-600 font-semibold">soluciones industriales</span> con garantía de calidad y precios imbatibles
                    </p>

                    {/* Línea decorativa */}
                    <div className="flex justify-center gap-2 mt-8">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    </div>
                </div>

                {/* SLIDER SWIPER */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 6000, 
                            disableOnInteraction: false, 
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 25 },
                            768: { slidesPerView: 3, spaceBetween: 30 },
                            1024: { slidesPerView: 4, spaceBetween: 35 },
                        }}
                        className="mySwiper pb-20"
                    >
                        {products.map(product => (
                            <SwiperSlide key={product.id}>
                                <div className="h-full flex items-center justify-center">
                                    <ProductCard product={product} /> 
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Botones de Navegación Personalizados */}
                    <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110">
                        <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110">
                        <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* CTA Secundario */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 text-sm mb-4">¿Necesitas más productos?</p>
                    <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                        Ver Catálogo Completo →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductSlider;