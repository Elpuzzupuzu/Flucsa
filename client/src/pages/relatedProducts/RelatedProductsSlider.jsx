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
    <div className="w-36 h-52 bg-gray-200 rounded-xl animate-pulse mx-2" />
  );

  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-semibold mb-3">Productos relacionados</h3>

      <div
        ref={sliderRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-2 pb-3"
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((product, index) => {
          const isLast = index === items.length - 1;

          return (
            <div
              key={product.id}
              ref={isLast ? lastItemRef : null}
              className="min-w-[160px] max-w-[160px]"
            >
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
    </div>
  );
}
