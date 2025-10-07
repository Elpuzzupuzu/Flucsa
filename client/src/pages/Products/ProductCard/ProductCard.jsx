import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Zap, Award, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      case 'oferta': return 'from-pink-400 to-purple-500';
      default: return 'from-blue-600 to-purple-600';
    }
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  // Formatea precio, maneja strings y evita NaN
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
      <div
        className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative flex flex-col h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Imagen del producto */}
        <Link to={`/productos/${product.id}`} className="block">
          <div className="relative overflow-hidden bg-gray-50 p-4">
            <div className="aspect-square w-full flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badge */}
            {product.badge && (
              <div className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center gap-1.5 backdrop-blur-sm`}>
                {getBadgeIcon(product.badge)}
                {product.badge}
              </div>
            )}
            
            {/* Botón de favoritos */}
            <button
              aria-label="Agregar a favoritos"
              onClick={handleToggleLike}
              className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 shadow-lg ${
                isLiked 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </Link>

        {/* Contenido de la tarjeta - flex-grow asegura que ocupe el espacio restante */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Título y descripción */}
          <div className="mb-3 flex-grow">
            <Link to={`/productos/${product.id}`}>
              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[3rem]">
                {product.name}
              </h3>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </p>
          </div>

          {/* Rating - altura fija */}
          <div className="flex items-center gap-2 mb-3 h-5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-xs text-gray-400">({reviews})</span>
          </div>

          {/* Precio y envío - altura fija */}
          <div className="mb-4 min-h-[4rem] flex flex-col justify-center">
            <div className="flex items-baseline gap-2 justify-center mb-1">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            </div>
            <div className="text-center">
              <span className="inline-flex items-center text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">
                <span className="mr-1">✓</span> Envío gratis disponible
              </span>
            </div>
          </div>

          {/* Botón agregar al carrito - siempre al final */}
          <button
            aria-label="Agregar al carrito"
            onClick={(e) => { 
              e.stopPropagation(); 
              e.preventDefault();
              onAddToCart(product); 
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl transition-all duration-200 font-semibold flex items-center justify-center gap-2 group/button shadow-md hover:shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 group-hover/button:scale-110 transition-transform" />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Imagen */}
            <Link to={`/productos/${product.id}`} className="relative flex-shrink-0 group/image">
              <div className="relative overflow-hidden rounded-xl bg-gray-50 p-3">
                <div className="w-32 h-32 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain transition-all duration-300 group-hover/image:scale-110" 
                  />
                </div>
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
              
              {/* Badge */}
              {product.badge && (
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1`}>
                  {getBadgeIcon(product.badge)}
                  {product.badge}
                </div>
              )}
              
              {/* Botón de favoritos */}
              <button
                aria-label="Agregar a favoritos"
                onClick={handleToggleLike}
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-200 shadow-md ${
                  isLiked 
                    ? 'bg-red-500 text-white scale-110' 
                    : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-110'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </Link>

            {/* Contenido */}
            <div className="flex-grow w-full space-y-3">
              <div>
                <Link to={`/productos/${product.id}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">{rating}</span>
                <span className="text-xs text-gray-400">({reviews})</span>
              </div>

              {/* Precio y botón */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  <span className="text-xs text-green-600 font-semibold mt-1">
                    ✓ Envío gratis disponible
                  </span>
                </div>
                <button
                  aria-label="Agregar al carrito"
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    e.preventDefault();
                    onAddToCart(product); 
                  }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;