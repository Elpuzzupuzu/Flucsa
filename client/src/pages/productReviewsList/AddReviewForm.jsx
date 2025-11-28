import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Star, Send, CheckCircle, AlertCircle } from "lucide-react";
import { createReview, fetchReviewsByProduct } from "../../features/reviews/reviewSlice";

export default function AddReviewForm({ productId, userId }) {
  const dispatch = useDispatch();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [calificacion, setCalificacion] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const payload = {
      usuario_id: userId,
      producto_id: productId,
      titulo_reseña: titulo,
      contenido_reseña: contenido,
      calificacion: Number(calificacion),
    };

    try {
      const resultAction = await dispatch(createReview(payload));

      if (createReview.rejected.match(resultAction)) {
        setErrorMsg(resultAction.error.message || "Error al enviar la reseña");
      } else {
        dispatch(fetchReviewsByProduct(productId));
        setSuccessMsg("¡Reseña publicada exitosamente!");
        setTitulo("");
        setContenido("");
        setCalificacion(5);
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      setErrorMsg("Error al enviar la reseña");
    }

    setLoading(false);
  };

  const renderStarSelector = () => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setCalificacion(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              size={32}
              className={
                star <= (hoverRating || calificacion)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }
            />
          </button>
        ))}
        <span className="ml-3 text-lg font-semibold text-gray-700">
          {calificacion} {calificacion === 1 ? 'estrella' : 'estrellas'}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Escribe tu reseña
            </h3>
            <p className="text-blue-100 text-sm mt-1">
              Comparte tu experiencia con otros compradores
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="px-8 py-6">
        {/* Success Message */}
        {successMsg && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-800 font-semibold">¡Éxito!</h4>
                <p className="text-green-700 text-sm mt-1">{successMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-800 font-semibold">Error</h4>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Rating Selection */}
          <div>
            <div className="block mb-3">
              <span className="text-gray-900 font-semibold text-lg">
                Tu calificación
              </span>
              <p className="text-gray-600 text-sm mt-1 mb-3">
                Selecciona las estrellas para calificar
              </p>
            </div>
            {renderStarSelector()}
          </div>

          {/* Title Input */}
          <div>
            <div className="block">
              <span className="text-gray-900 font-semibold text-lg">
                Título de tu reseña
              </span>
              <p className="text-gray-600 text-sm mt-1 mb-3">
                Resume tu experiencia en pocas palabras
              </p>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ej: Excelente producto, superó mis expectativas"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400"
                required
                maxLength={100}
              />
              <p className="text-gray-500 text-xs mt-2">
                {titulo.length}/100 caracteres
              </p>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <div className="block">
              <span className="text-gray-900 font-semibold text-lg">
                Tu reseña
              </span>
              <p className="text-gray-600 text-sm mt-1 mb-3">
                Cuéntanos más sobre tu experiencia con el producto
              </p>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                placeholder="Describe qué te gustó, cómo lo usaste, y si lo recomendarías a otros..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-400 resize-none"
                rows="6"
                required
                maxLength={1000}
              ></textarea>
              <p className="text-gray-500 text-xs mt-2">
                {contenido.length}/1000 caracteres
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Publicar reseña</span>
                </>
              )}
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="pt-2">
            <p className="text-xs text-gray-500 text-center">
              Al publicar, aceptas que tu reseña sea visible públicamente.
              Asegúrate de no incluir información personal sensible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}