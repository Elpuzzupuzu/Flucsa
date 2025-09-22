import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Zap, Award, Tag } from 'lucide-react';
import ProductQuickView from '../../../components/ProductQuickView/ProductQuickView'; // Importa el nuevo componente

const ProductCard = ({ product, viewMode = 'grid', onAddToCart, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Lógica para ratings y badges
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
    setIsLiked(!isLiked);
  };
  
  if (viewMode === 'grid') {
    return (
      <div
        className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <ProductQuickView
            product={product}
            onAddToCart={onAddToCart}
            // Aquí se pasa la función de navegación para que la llame el mini-modal
            onViewDetails={onViewDetails}
          />
        )}
        <div 
          className="relative overflow-hidden cursor-pointer" 
          onClick={onViewDetails}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.badge && (
            <div className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-sm px-3 py-1 rounded-md font-medium shadow-sm flex items-center gap-1`}>
              {getBadgeIcon(product.badge)}
              {product.badge}
            </div>
          )}
        </div>
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">{rating}</span>
            <span className="text-sm text-gray-400">({reviews})</span>
          </div>
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900 block">{product.price}</span>
              <div className="text-xs text-green-600 font-medium mt-1">✓ Envío gratis disponible</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 group/button"
            >
              <ShoppingCart className="w-5 h-5 group-hover/button:scale-110 transition-transform" />
              <span>Agregar al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden cursor-pointer"
        onClick={onViewDetails} // El clic en toda la tarjeta navega
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0 group/image">
              <div className="relative overflow-hidden rounded-lg">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover transition-all duration-300 group-hover/image:scale-105" />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
              {product.badge && (
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1`}>
                  {getBadgeIcon(product.badge)}
                  {product.badge}
                </div>
              )}
              <button onClick={handleToggleLike} className={`absolute top-1 right-1 p-1.5 rounded-full transition-all duration-200 ${isLiked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400'}`}>
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="flex-grow w-full space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-600">{rating}</span>
                <span className="text-xs text-gray-400">({reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;