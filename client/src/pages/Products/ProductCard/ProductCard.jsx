import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Zap, Award, Tag } from 'lucide-react';

const ProductCard = ({ product, viewMode }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate random rating for demo purposes
  const rating = (4 + Math.random()).toFixed(1);
  const reviews = Math.floor(Math.random() * 50) + 10;

  const getBadgeIcon = (badge) => {
    switch (badge.toLowerCase()) {
      case 'más vendido':
        return <Award className="w-3 h-3" />;
      case 'nuevo':
        return <Zap className="w-3 h-3" />;
      case 'oferta':
        return <Tag className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getBadgeColors = (badge) => {
    switch (badge.toLowerCase()) {
      case 'más vendido':
        return 'from-amber-400 via-orange-500 to-red-500';
      case 'nuevo':
        return 'from-emerald-400 via-cyan-500 to-blue-500';
      case 'oferta':
        return 'from-pink-400 via-purple-500 to-indigo-500';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative flex-shrink-0 group/image">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 object-cover transition-all duration-500 group-hover/image:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
              
              {product.badge && (
                <div className={`absolute -top-3 -right-3 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs px-3 py-2 rounded-full font-bold shadow-lg flex items-center gap-1 animate-pulse`}>
                  {getBadgeIcon(product.badge)}
                  {product.badge}
                </div>
              )}

              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500/90 text-white scale-110' 
                    : 'bg-white/70 text-gray-600 hover:bg-white/90 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="flex-grow w-full space-y-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{rating}</span>
                <span className="text-sm text-gray-500">({reviews} reseñas)</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {product.price}
                  </span>
                  <div className="text-xs text-green-600 font-medium">
                    ✓ Envío gratis disponible
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-110">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-sm flex items-center gap-2 relative overflow-hidden group/button">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                    <ShoppingCart className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white/80 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" style={{padding: '1px'}}>
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl h-full" />
      </div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-t-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 object-cover group-hover:scale-110 transition-all duration-700"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
          
          {/* Floating action buttons */}
          <div className={`absolute top-4 right-4 flex flex-col gap-2 transition-all duration-500 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-110 ${
                isLiked 
                  ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30' 
                  : 'bg-white/70 text-gray-600 hover:bg-white/90 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 rounded-full bg-white/70 backdrop-blur-lg text-gray-600 hover:bg-white/90 hover:text-blue-600 transition-all duration-300 hover:scale-110">
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <div className={`absolute top-4 left-4 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 animate-bounce`}>
              {getBadgeIcon(product.badge)}
              {product.badge}
            </div>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <span className="text-sm text-gray-500">({reviews})</span>
          </div>

          {/* Price and action */}
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                {product.price}
              </span>
              <div className="text-xs text-green-600 font-medium mt-1">
                ✓ Envío gratis disponible
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 relative overflow-hidden group/button">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
              <ShoppingCart className="w-5 h-5 relative z-10 group-hover/button:animate-bounce" />
              <span className="relative z-10">Agregar al Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;