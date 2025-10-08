import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Zap, Award, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const rating = (4 + (product.id * 0.1) % 1).toFixed(1);
  const reviews = Math.floor((product.id * 7) % 50) + 10;

  const getBadgeIcon = (badge) => {
    switch (badge.toLowerCase()) {
      case 'más vendido': return <Award className="w-3 h-3" />;
      case 'nuevo': return <Zap className="w-3 h-3" />;
      case 'oferta': return <Tag className="w-3 h-3" />;
      default: return null;
    }
  };

  const getBadgeColors = (badge) => {
    switch (badge.toLowerCase()) {
      case 'más vendido': return 'from-amber-400 to-orange-500';
      case 'nuevo': return 'from-emerald-400 to-cyan-500';
      case 'oferta': return 'from-pink-400 to-rose-500';
      default: return 'from-blue-600 to-indigo-700';
    }
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price) => {
    const numeric = parseFloat(price);
    if (isNaN(numeric)) return price;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(numeric);
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group relative flex flex-col h-full">
        {/* Imagen */}
        <Link to={`/productos/${product.id}`} className="block relative">
          <div className="relative overflow-hidden bg-gray-50 p-4">
            <div className="aspect-square w-full flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded-lg" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  imageLoaded ? 'scale-100' : 'scale-95 opacity-0'
                } group-hover:scale-105`}
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <div
                className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColors(
                  product.badge
                )} text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1`}
              >
                {getBadgeIcon(product.badge)}
                {product.badge}
              </div>
            )}

            {/* Botón de favoritos */}
            <button
              aria-label="Agregar a favoritos"
              onClick={handleToggleLike}
              className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
                isLiked
                  ? 'bg-red-500 text-white scale-110'
                  : 'bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500 hover:scale-110'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </Link>

        {/* Contenido */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Nombre */}
          <Link to={`/productos/${product.id}`}>
            <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem] hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Descripción */}
          <p className="text-gray-500 text-xs line-clamp-2 mb-3">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(rating)
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-blue-600 font-medium">{rating}</span>
            <span className="text-xs text-gray-500">
              ({reviews.toLocaleString()})
            </span>
          </div>

          {/* Precio */}
          <div className="mb-4 flex-grow">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-green-600 font-semibold">
              ✓ disponible
            </div>
          </div>

          {/* Botón */}
          <button
            aria-label="Agregar al carrito"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAddToCart(product);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 rounded-full transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar al carrito
          </button>
        </div>
      </div>
    );
  }

  // Vista tipo lista
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-5 flex flex-col sm:flex-row gap-5 items-start">
          {/* Imagen */}
          <Link to={`/productos/${product.id}`} className="relative flex-shrink-0">
            <div className="overflow-hidden bg-gray-50 p-3 rounded-lg w-36 h-36 flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain transition-transform duration-500 ${
                  imageLoaded ? 'scale-100' : 'scale-95 opacity-0'
                } group-hover:scale-105`}
              />
            </div>

            {/* Badge */}
            {product.badge && (
              <div
                className={`absolute top-2 left-2 bg-gradient-to-r ${getBadgeColors(
                  product.badge
                )} text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-md flex items-center gap-1`}
              >
                {getBadgeIcon(product.badge)}
                {product.badge}
              </div>
            )}
          </Link>

          {/* Contenido */}
          <div className="flex-grow">
            <Link to={`/productos/${product.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-blue-600">{rating}</span>
              <span className="text-xs text-gray-500">
                ({reviews.toLocaleString()})
              </span>
            </div>

            {/* Precio y botón */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="text-xs text-green-600 font-semibold mt-1">
                  ✓ Envío gratis disponible
                </div>
              </div>

              <button
                aria-label="Agregar al carrito"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onAddToCart(product);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-full transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
