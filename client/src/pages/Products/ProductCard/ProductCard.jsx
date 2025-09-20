import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Zap, Award, Tag } from 'lucide-react';

const ProductCard = ({ product, viewMode = 'grid', onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Generate consistent rating based on product ID for demo purposes
  const rating = (4 + (product.id * 0.1) % 1).toFixed(1);
  const reviews = Math.floor((product.id * 7) % 50) + 10;

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
        return 'from-amber-400 to-orange-500';
      case 'nuevo':
        return 'from-emerald-400 to-cyan-500';
      case 'oferta':
        return 'from-pink-400 to-purple-500';
      default:
        return 'from-blue-600 to-purple-600';
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    // Optional: Show a toast notification or animation here
  };

  const handleToggleLike = (e) => {
    e.stopPropagation(); // Prevent card click if wrapped in a link
    setIsLiked(!isLiked);
  };

  const handleViewProduct = (e) => {
    e.stopPropagation();
    // Navigate to product detail page
    console.log('View product:', product.id);
  };

  // List view layout
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Product Image */}
            <div className="relative flex-shrink-0 group/image">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover transition-all duration-300 group-hover/image:scale-105"
                />
                {/* Image overlay on hover */}
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
              
              {/* Badge */}
              {product.badge && (
                <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-xs px-2 py-1 rounded-md font-medium shadow-sm flex items-center gap-1`}>
                  {getBadgeIcon(product.badge)}
                  {product.badge}
                </div>
              )}

              {/* Like button */}
              <button
                onClick={handleToggleLike}
                className={`absolute top-1 right-1 p-1.5 rounded-full transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-50 text-red-500' 
                    : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-400'
                }`}
              >
                <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Product Info */}
            <div className="flex-grow w-full space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
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
                      className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-gray-600">{rating}</span>
                <span className="text-xs text-gray-400">({reviews})</span>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <div className="text-xs text-green-600 font-medium">
                    ✓ Envío gratis disponible
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleViewProduct}
                    className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
                    title="Ver producto"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 font-medium text-sm flex items-center gap-2"
                  >
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

  // Grid view layout
  return (
    <div 
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500"
        />
        
        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
          <button
            onClick={handleToggleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isLiked 
                ? 'bg-red-50 text-red-500' 
                : 'bg-white/80 text-gray-400 hover:bg-white hover:text-red-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button 
            onClick={handleViewProduct}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-400 hover:bg-white hover:text-blue-600 transition-all duration-200"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-sm px-3 py-1 rounded-md font-medium shadow-sm flex items-center gap-1`}>
            {getBadgeIcon(product.badge)}
            {product.badge}
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-5 space-y-4">
        {/* Product Name and Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
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
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">{rating}</span>
          <span className="text-sm text-gray-400">({reviews})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-900 block">
              {product.price}
            </span>
            <div className="text-xs text-green-600 font-medium mt-1">
              ✓ Envío gratis disponible
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 group/button"
          >
            <ShoppingCart className="w-5 h-5 group-hover/button:scale-110 transition-transform" />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;