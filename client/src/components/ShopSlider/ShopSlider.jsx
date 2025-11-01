import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSellingProducts } from '../../features/products/productsSlice'; 
// 🟢 IMPORTA TU ACCIÓN DE CARRITO (Verifica la ruta)
import { addItemToCart } from '../../features/cart/cartSlice'; 
import ProductCard from './components/ProductCard'; 
import useItemsPerView from './hooks/useItemsPerView';
import { Link } from "react-router-dom"

/**
 * Componente Principal ProductSlider.
 * Carga productos destacados de Redux y los muestra en un carrusel adaptable.
 */
const ProductSlider = () => {
    // 🟢 REEMPLAZO: Usamos el Custom Hook para obtener itemsPerView
    const itemsPerView = useItemsPerView(); 
    
    // Lógica de Redux
    const dispatch = useDispatch();
    const { 
        topSellingItems: products, 
        topSellingLoading: loading, 
        topSellingError: error 
    } = useSelector((state) => state.products);

    // Lógica del Slider
    const [currentIndex, setCurrentIndex] = useState(0);

    // EFECTO 1: Carga de datos
    useEffect(() => {
        dispatch(fetchTopSellingProducts({ pageSize: 8 })); 
    }, [dispatch]);

    // Lógica de navegación del carrusel
    const maxIndex = Math.max(0, products?.length - itemsPerView);
    
    // 🟢 EFECTO 2: Corregir el índice cuando itemsPerView cambia
    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [itemsPerView, currentIndex, maxIndex]); 

    // 🚩 FUNCIÓN CORREGIDA: Ajusta el payload que se envía a Redux/API.
    const handleAddToCart = (productToAdd) => {
        const productId = productToAdd.id; 
        
        // 💥 CORRECCIÓN CLAVE: Envía el ID del producto mapeado a 'producto_id' y una cantidad.
        // Esto coincide con el formato que tu API espera para añadir/actualizar el carrito.
        dispatch(addItemToCart({ producto_id: productId, cantidad: 1 }));
        
        console.log(`[ProductSlider] Despachando addItemToCart con producto_id: ${productId}`);
    };


    // --- Renderizado Condicional (Carga y Errores) ---
    if (loading) {
        return (
            <section className="flex justify-center items-center py-16">
                <Loader className="w-8 h-8 animate-spin text-blue-600" />
                <p className="ml-3 text-lg text-gray-600">Cargando productos destacados...</p>
            </section>
        );
    }
    
    if (error) {
        return (
            <section className="text-center py-16">
                <p className="text-red-600 font-semibold text-lg">
                    ⚠️ Error al cargar productos: {error.message || "Inténtelo de nuevo más tarde."}
                </p>
            </section>
        );
    }
    
    if (!products || products.length === 0) {
        return (
            <section className="text-center py-16">
                <p className="text-gray-500 text-lg">No hay productos destacados disponibles en este momento.</p>
            </section>
        );
    }

    // --- Funciones de Navegación ---
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // --- Renderizado Principal ---
    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Encabezado */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                            Top Ventas
                        </span>
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                        Productos con Mejor Desempeño Anual
                    </h2>
                    <p className="text-gray-600 max-w-2xl">
                        Estos son los productos más vendidos de nuestra colección, garantizando calidad y demanda.
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
                            {/* Renderizado de las tarjetas */}
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
                                >
                                    {/* 🤝 Pasamos el producto y la función corregida */}
                                    <ProductCard 
                                        product={product} 
                                        onAddToCart={handleAddToCart}
                                    /> 
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de navegación */}
                    {maxIndex > 0 && (
                        <>
                            <button
                                onClick={prevSlide}
                                disabled={currentIndex === 0} 
                                aria-label="Anterior"
                                className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center z-10 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={nextSlide}
                                disabled={currentIndex === maxIndex} 
                                aria-label="Siguiente"
                                className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white border border-gray-200 text-gray-700 rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center z-10 ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>

                {/* Indicadores de paginación */}
                {maxIndex > 0 && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Ir a la página ${index + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    index === currentIndex
                                        ? 'w-8 bg-blue-600'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                )}
                
                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-sm mb-4">¿Necesitas más productos?</p>
                    <Link  to="/catalogo-pdfs"  className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200">
                        Ver Catálogo Completo
                    </Link>
                </div>
                
            </div>
        </section>
    );
};

export default ProductSlider;