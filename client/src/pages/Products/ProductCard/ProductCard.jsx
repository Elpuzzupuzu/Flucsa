import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import useNotification from '../../../hooks/Notify/useNotification';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isAuthenticated = useSelector((state) => !!state.user.user); 
  const { notify } = useNotification(); 
  
  const tempStars = 4;
  const rating = (4 + (product.id * 0.1) % 1).toFixed(1);
  const reviews = Math.floor((product.id * 7) % 50) + 10;

  const handleToggleLike = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isAuthenticated) {
      notify('Debes iniciar sesión para añadir a favoritos. 🔒');
      return; 
    }
    
    setIsLiked(!isLiked);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isAuthenticated) {
      notify('Debes iniciar sesión para agregar a la lista. 🛒');
      return; 
    }
    
    onAddToCart(product);
  }

  const formatPrice = (price) => {
    const numeric = parseFloat(price);
    if (isNaN(numeric)) return price;
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(numeric);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < tempStars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 group relative flex flex-col h-full hover:shadow-lg">
        <Link to={`/productos/${product.id}`} className="block relative">
          <div className="relative overflow-hidden bg-white p-3">
            <div className="aspect-square w-full flex items-center justify-center">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                } group-hover:scale-105`}
              />
            </div>

            {product.badge && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-semibold">
                {product.badge}
              </div>
            )}

            <button
              aria-label="Agregar a favoritos"
              onClick={handleToggleLike}
              className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </Link>

        <div className="p-3 flex flex-col flex-grow border-t border-gray-100">
          <Link to={`/productos/${product.id}`}>
            <h3 className="text-sm text-gray-900 mb-1 line-clamp-2 min-h-[2.5rem] hover:text-blue-600 transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">{renderStars()}</div>
            <span className="text-xs text-blue-600">{rating}</span>
            <span className="text-xs text-gray-400">({reviews})</span>
          </div>

          <div className="text-xs text-green-700 mb-2 font-medium">En stock</div>
          <div className="text-xs text-gray-600 mb-3">Envío disponible</div>

          <button
            aria-label="Agregar al carrito"
            onClick={handleAddToCartClick}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1.5 px-3 rounded-full transition-all duration-200 font-medium text-xs shadow-sm hover:shadow-md flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Agregar a la lista
          </button>
        </div>
      </div>
    );
  }

  // Vista lista - MEJORADA PARA MÓVILES
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* LAYOUT RESPONSIVE: Columna en móvil, fila en desktop */}
        <div className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
          
          {/* IMAGEN - Ajustada para móviles */}
          <Link to={`/productos/${product.id}`} className="relative flex-shrink-0 w-full sm:w-auto">
            <div className="overflow-hidden bg-white rounded-md w-full h-48 sm:w-32 sm:h-32 flex items-center justify-center border border-gray-100">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-50 animate-pulse" />
              )}
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}
              />
            </div>

            {product.badge && (
              <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-sm font-semibold">
                {product.badge}
              </div>
            )}

            {/* Botón de favoritos en móvil (sobre la imagen) */}
            <button
              aria-label="Agregar a favoritos"
              onClick={handleToggleLike}
              className={`sm:hidden absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </Link>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-grow min-w-0 w-full sm:w-auto">
            <Link to={`/productos/${product.id}`}>
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 sm:mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${
                      i < tempStars ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-blue-600">{rating}</span>
              <span className="text-xs text-gray-400">({reviews})</span>
            </div>

            <div className="mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-600">MXN</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatPrice(product.price).replace('MXN', '').trim()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-green-700 font-medium">En stock</span>
                <span className="text-xs text-gray-600">• Envío DISPONIBLE</span>
              </div>
            </div>
          </div>

          {/* BOTONES - Desktop solamente */}
          <div className="hidden sm:flex flex-shrink-0 flex-col items-end gap-2">
            <button
              aria-label="Agregar a favoritos"
              onClick={handleToggleLike}
              className={`p-2 rounded-full transition-all duration-200 ${
                isLiked
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>

            <button
              aria-label="Agregar al carrito"
              onClick={handleAddToCartClick}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center gap-2 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar
            </button>
          </div>

          {/* BOTÓN DE AGREGAR - Móvil solamente (ancho completo) */}
          <button
            aria-label="Agregar al carrito"
            onClick={handleAddToCartClick}
            className="sm:hidden w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2.5 px-4 rounded-full transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar a la lista
          </button>
        </div>
      </div>
    );
  }
};

export default ProductCard;