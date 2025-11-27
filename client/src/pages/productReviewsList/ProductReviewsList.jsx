import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import {
  fetchReviewsByProduct,
  fetchProductRating,
} from "../../features/reviews/reviewSlice";

export default function ProductReviewsList({ productId }) {
  const dispatch = useDispatch();

  // 📝 NUEVO LOG: Muestra el ID de producto recibido como prop al inicio del render
  console.log("🚀 PRODUCT ID RECIBIDO EN PROP:", productId);
  // -----------------------------------------------------------------------------

  // 📝 LOG: Ver el estado de Redux al renderizar
  const reviewState = useSelector((state) => state.reviews);
  console.log("➡️ Estado de Redux (reviews):", reviewState);

  // 🔄 CAMBIO CLAVE: Renombrando propiedades para que coincidan con el slice
  const {
    items: reviews, // Renombra 'items' del slice a 'reviews' para usarlo en el componente
    productRating: ratingAverage, // Renombra 'productRating' a 'ratingAverage'
    totalReviews, // Propiedad existente ahora en el slice
    loadingReviews, // Propiedad de carga específica
    loadingRating, // Propiedad de carga específica
    error,
  } = reviewState;

  useEffect(() => {
    // 📝 LOG: Ver el valor de productId al inicio del useEffect (ya existía)
    console.log("➡️ useEffect disparado. productId recibido:", productId);

    if (productId) {
      // 📝 LOG: La acción se va a disparar (ya existía)
      console.log("🔥 Disparando fetchReviewsByProduct con productId:", productId);
      dispatch(fetchReviewsByProduct(productId));

      console.log("🔥 Disparando fetchProductRating con productId:", productId);
      dispatch(fetchProductRating(productId));
    } else {
      // 📝 LOG: productId es undefined o null/vacío (ya existía)
      console.log("⚠️ productId no es válido, no se disparan las acciones.", { productId });
    }
  }, [dispatch, productId]);

  /** Renderizar estrellas */
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="mt-10">
      {/* Título */}
      <h2 className="text-2xl font-semibold mb-4">Reseñas sobre este producto</h2>

      {/* Loading global */}
      {(loadingReviews || loadingRating) && (
        <p className="text-gray-500">Cargando reseñas...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500 font-medium">Error al cargar: {error}</p>
      )}

      {/* PROMEDIO GENERAL */}
      {!loadingRating && totalReviews > 0 && (
        <div className="mb-6 p-4 border rounded-xl bg-gray-50">
          <div className="flex items-center gap-2">
            {/* Se usa ratingAverage, que ahora tiene el valor de productRating */}
            {renderStars(Math.round(ratingAverage))}

            <span className="text-lg font-semibold">
              {/* Se usa ratingAverage, que ahora tiene el valor de productRating */}
              {ratingAverage.toFixed(1)}
            </span>

            <span className="text-gray-500 text-sm">
              {/* totalReviews se actualiza en el slice */}
              ({totalReviews} reviews)
            </span>
          </div>
        </div>
      )}

      {/* LISTA DE RESEÑAS */}
      <div className="space-y-4">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded-xl bg-white shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{review.titulo_reseña}</h3>
              <div className="flex">{renderStars(review.calificacion)}</div>
            </div>

            {/* 🔥 CAMBIOS APLICADOS: AVATAR Y DATOS DEL USUARIO */}
            {review.usuarios && (
              <div className="flex items-center gap-3 mb-3">
                
                {/* 🖼️ AVATAR */}
                {review.usuarios.foto_perfil ? (
                    <img
                        src={review.usuarios.foto_perfil}
                        alt={`Foto de perfil de ${review.usuarios.nombre}`}
                        className="w-10 h-10 object-cover rounded-full border border-gray-200"
                    />
                ) : (
                    // Opcional: Renderizar un ícono de usuario por defecto si no hay foto
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full border border-gray-300">
                        <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
                
                {/* 👤 NOMBRE Y APELLIDO */}
                <p className="text-base font-semibold text-gray-800">
                    Por: {review.usuarios.nombre} {review.usuarios.apellido}
                </p>
              </div>
            )}
            
            <p className="text-gray-600 mb-2">{review.contenido_reseña}</p>

            <p className="text-xs text-gray-400 mt-2">
              {new Date(review.fecha_reseña).toLocaleDateString()}
            </p>
          </div>
        ))}

        {!loadingReviews && reviews?.length === 0 && totalReviews === 0 && (
          <p className="text-gray-500">Sé el primero en dejar una reseña.</p>
        )}
      </div>
    </div>
  );
}