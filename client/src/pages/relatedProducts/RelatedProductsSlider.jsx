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
              offset: items.length, // evita repetir páginas
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
    <div className="relative flex-shrink-0 w-44 h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" 
           style={{ backgroundSize: '200% 100%' }} />
      <div className="p-3 h-full flex flex-col">
        <div className="w-full h-40 bg-gray-200 rounded-md mb-3" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="mt-auto h-5 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );

  return (
    <section className="w-full py-8 px-4 bg-gradient-to-b from-white to-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Productos Relacionados
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
        </div>

        <div className="relative group">
          {/* Botón Izquierdo */}
          <button
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
              }
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50 disabled:opacity-50"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Botón Derecho */}
          <button
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
              }
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-50"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            ref={sliderRef}
            className="flex gap-5 overflow-x-hidden pb-6 px-1"
            style={{ 
              scrollBehavior: "smooth"
            }}
          >
            {items.map((product, index) => {
              const isLast = index === items.length - 1;

              return (
                <div
                  key={product.id}
                  ref={isLast ? lastItemRef : null}
                  className="flex-shrink-0 w-44 snap-start"
                >
                  <div className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
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

          {/* Gradient fade effects */}
          <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
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
      `}</style>
    </section>
  );
}