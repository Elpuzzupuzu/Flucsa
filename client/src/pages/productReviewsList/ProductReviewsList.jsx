// ProductReviewsList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, User } from "lucide-react";
import {
  fetchReviewsByProduct,
  fetchProductRating,
} from "../../features/reviews/reviewSlice";

export default function ProductReviewsList({ productId }) {
  const dispatch = useDispatch();

  const reviewState = useSelector((state) => state.reviews) || {};

  const {
    items: reviews = [],
    productRating: ratingAverage = 0,
    totalReviews = 0,
    loadingReviews = false,
    loadingRating = false,
    error = null,
  } = reviewState;

  // --- 1. CALCULAR DISTRIBUCIÓN DE CALIFICACIONES ---
  const calculateRatingDistribution = (reviewsList, total) => {
    if (!reviewsList || total === 0) {
      return { 5: { count: 0, percentage: 0 }, 4: { count: 0, percentage: 0 }, 3: { count: 0, percentage: 0 }, 2: { count: 0, percentage: 0 }, 1: { count: 0, percentage: 0 } };
    }

    const counts = reviewsList.reduce((acc, review) => {
      const rating = parseInt(review?.calificacion ?? 0);
      if (rating >= 1 && rating <= 5) acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    const distribution = {};
    for (let i = 5; i >= 1; i--) {
      const count = counts[i] || 0;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      distribution[i] = { count, percentage: Math.round(percentage) };
    }
    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution(reviews, totalReviews);

  // --- 2. FETCH RESEÑAS Y RATING ---
  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProduct(productId));
      dispatch(fetchProductRating(productId));
    }
  }, [dispatch, productId]);

  // --- 3. RENDER ESTRELLAS ---
  const renderStars = (count) => {
    const filledStars = Math.round(count ?? 0);
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={i < filledStars ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}
      />
    ));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Reseñas de Clientes</h2>
        <p className="text-gray-600">Opiniones verificadas de compradores reales</p>
      </div>

      {/* LOADING */}
      {(loadingReviews || loadingRating) && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando reseñas...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-red-800 font-medium">Error al cargar las reseñas</h3>
              <p className="text-red-700 text-sm mt-1">{error?.message || String(error)}</p>
            </div>
          </div>
        </div>
      )}

      {/* RATING SUMMARY */}
      {!loadingRating && totalReviews > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="text-5xl font-bold text-gray-900">{ratingAverage?.toFixed(1) ?? '0.0'}</div>
                <div className="flex mt-2 justify-center">{renderStars(ratingAverage)}</div>
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">Excelente</p>
                <p className="text-gray-600 mt-1">
                  Basado en <span className="font-semibold">{totalReviews}</span> {totalReviews === 1 ? 'reseña' : 'reseñas'}
                </p>
              </div>
            </div>

            {/* DISTRIBUCIÓN DE ESTRELLAS */}
            <div className="flex-1 max-w-md">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-12 flex-shrink-0">{star} estrellas</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${ratingDistribution[star]?.percentage ?? 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-6 text-right flex-shrink-0">
                      ({ratingDistribution[star]?.count ?? 0})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LISTA DE RESEÑAS */}
      <div className="space-y-6">
        {reviews?.map((review) => {
          if (!review) return null;

          const userInfo = review.usuarios ?? {};
          return (
            <div
              key={review.id ?? Math.random()}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.calificacion ?? 0)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {review.titulo_reseña ?? "Sin título"}
                  </h3>
                </div>
              </div>

              {/* User Info */}
              {userInfo && (
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  {userInfo.foto_perfil ? (
                    <img
                      src={userInfo.foto_perfil}
                      alt={`${userInfo.nombre ?? ""} ${userInfo.apellido ?? ""}`}
                      className="w-12 h-12 object-cover rounded-full border-2 border-gray-200"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {userInfo.nombre ?? "Usuario"} {userInfo.apellido ?? ""}
                    </p>
                    <p className="text-sm text-gray-500">
                      {review.fecha_reseña
                        ? new Date(review.fecha_reseña).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-gray-700 leading-relaxed">
                {review.contenido_reseña ?? "Sin contenido"}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-1.5 text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compra verificada
                </span>
              </div>
            </div>
          );
        })}

        {/* EMPTY STATE */}
        {!loadingReviews && reviews?.length === 0 && totalReviews === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Star className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aún no hay reseñas</h3>
            <p className="text-gray-600">Sé el primero en compartir tu opinión sobre este producto</p>
          </div>
        )}
      </div>
    </div>
  );
}
