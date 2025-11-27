import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedProducts } from "../../features/products/productsSlice";

// Icons
import ProductCard from "../Products/ProductCard/ProductCard";

export default function RelatedProductsSlider({ productId, sort = null, onAddToCart }) {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    hasMore,
    limit,
  } = useSelector((state) => state.products.related);

  const sliderRef = useRef(null);
  const observerRef = useRef(null);

  // =============================
  // 1️⃣ Cargar primera página
  // =============================
  useEffect(() => {
    dispatch(fetchRelatedProducts({ productId, sort, limit, offset: 0 }));
  }, [productId, sort, dispatch, limit]);

  // =============================
  // 2️⃣ IntersectionObserver
  // =============================
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          dispatch(
            fetchRelatedProducts({
              productId,
              sort,
              limit,
              offset: items.length,
            })
          );
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, items.length, limit, dispatch, productId, sort]
  );

  // =============================
  // Skeleton loader
  // =============================
  const SkeletonItem = () => (
    <div className="relative flex-shrink-0 w-36 sm:w-44 h-64 sm:h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" 
           style={{ backgroundSize: '200% 100%' }} />
      <div className="p-2 sm:p-3 h-full flex flex-col">
        <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-md mb-2 sm:mb-3" />
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-2 sm:mb-3" />
        <div className="mt-auto h-4 sm:h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );

  return (
    <section className="w-full py-6 sm:py-8 px-3 sm:px-4 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            Productos Relacionados
          </h2>
          <div className="mt-2 h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
        </div>

        <div className="relative group">
          {/* Botón Izquierdo - Solo visible en tablet+ */}
          <button
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 disabled:opacity-50"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón Derecho - Solo visible en tablet+ */}
          <button
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={sliderRef}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 sm:pb-6 px-1 snap-x snap-mandatory scrollbar-hide touch-pan-x"
            style={{ 
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {items.map((product, index) => {
              const isLast = index === items.length - 1;

              return (
                <div
                  key={product.id}
                  ref={isLast ? lastItemRef : null}
                  className="flex-shrink-0 w-36 sm:w-44 snap-start"
                >
                  <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95">
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.nombre,
                        image: product.imagen,
                        price: product.precio,
                      }}
                      viewMode="grid"
                      onAddToCart={(p) => {
                        onAddToCart(p);
                      }}
                    />
                  </div>
                </div>
              );
            })}

            {loading && (
              <>
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
              </>
            )}
          </div>

          {/* Gradient fade effects - Ajustados para móvil */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-6 w-8 sm:w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-6 w-8 sm:w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>

        {/* Indicador de scroll en móvil */}
        <div className="flex sm:hidden justify-center mt-3 gap-1.5">
          {items.length > 0 && Array.from({ length: Math.min(items.length, 10) }).map((_, i) => (
            <div 
              key={i} 
              className="w-1.5 h-1.5 rounded-full bg-gray-300"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Mejora el touch scrolling en iOS */
        @supports (-webkit-touch-callout: none) {
          .scrollbar-hide {
            -webkit-overflow-scrolling: touch;
          }
        }
      `}</style>
    </section>
  );
}