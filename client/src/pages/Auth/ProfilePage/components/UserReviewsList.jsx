// src/pages/Profile/components/UserReviewsList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Star, ImageOff, MessageSquare } from "lucide-react";
import { fetchUserReviews } from "../../../../features/user/usersSlice";

const UserReviewsList = ({ userId }) => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.user);

  // 🔹 Cargar reseñas al montar
  useEffect(() => {
    if (userId) {
      console.log("[UserReviewsList] Cargando reseñas para userId:", userId);
      dispatch(fetchUserReviews(userId));
    }
  }, [userId, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-slate-600 text-sm font-medium">Cargando reseñas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 text-sm font-medium">Error: {error}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5">
          <MessageSquare className="w-10 h-10 text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-slate-900 font-semibold text-base">Sin reseñas</p>
        <p className="text-slate-500 text-sm mt-1.5">Tus reseñas de productos aparecerán aquí</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review, i) => {
        const producto = review.productos || {};
        const img = producto.imagen;
        const nombre = producto.nombre || "Producto desconocido";
        const titulo = review.titulo_reseña || "Sin título";

        // Aseguramos rango 1-5
        const rating = Math.min(Math.max(review.calificacion || 0, 0), 5);

        console.log("[UserReviewsList] Renderizando review:", review);

        return (
          <div
            key={review.producto_id || i}
            className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all duration-200"
          >
            <div className="p-5">
              <div className="flex items-start gap-4">
                {/* Imagen del producto */}
                {img ? (
                  <img
                    src={img}
                    alt={nombre}
                    className="w-14 h-14 rounded object-cover border border-slate-200 bg-white flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 flex items-center justify-center bg-slate-100 border border-slate-200 rounded flex-shrink-0">
                    <ImageOff className="w-6 h-6 text-slate-400" strokeWidth={2} />
                  </div>
                )}

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">
                        {nombre}
                      </p>
                      <p className="text-slate-600 text-sm font-medium mt-0.5">
                        {titulo}
                      </p>
                    </div>

                    {/* Estrellas */}
                    <div className="flex gap-0.5 flex-shrink-0">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4"
                          fill={idx < rating ? "#f59e0b" : "none"}
                          stroke={idx < rating ? "#f59e0b" : "#cbd5e1"}
                          strokeWidth={2}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Fecha */}
                  <p className="text-xs text-slate-500 font-medium">
                    {review.fecha_reseña
                      ? new Date(review.fecha_reseña).toLocaleDateString('es-MX', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })
                      : "Fecha no disponible"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserReviewsList;