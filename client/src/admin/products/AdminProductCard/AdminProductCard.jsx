// src/admin/products/AdminProductCard.jsx
import React from 'react';
import { Star, Award, Zap, Tag } from 'lucide-react';

const AdminProductCard = ({ product, onClick }) => {
  // Rating dummy basado en id
  const rating = (4 + (parseInt(product.id.slice(0, 2), 16) * 0.1) % 1).toFixed(1);
  const reviews = Math.floor((parseInt(product.id.slice(0, 2), 16) * 7) % 50) + 10;

  const getBadgeIcon = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'más vendido': return <Award className="w-3 h-3" />;
      case 'nuevo': return <Zap className="w-3 h-3" />;
      case 'oferta': return <Tag className="w-3 h-3" />;
      default: return null;
    }
  };

  const getBadgeColors = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'más vendido': return 'from-amber-400 to-orange-500';
      case 'nuevo': return 'from-emerald-400 to-cyan-500';
      case 'oferta': return 'from-pink-400 to-purple-500';
      default: return 'from-blue-600 to-purple-600';
    }
  };

  const formatPrice = (price) => {
    const numeric = parseFloat(price);
    if (isNaN(numeric)) return 'S/P';
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(numeric);
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer relative"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imagen || 'https://via.placeholder.com/300x200?text=Sin+imagen'}
          alt={product.nombre || 'Sin nombre'}
          className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-500"
        />
        {product.badge && (
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${getBadgeColors(product.badge)} text-white text-sm px-3 py-1 rounded-md font-medium shadow-sm flex items-center gap-1`}>
            {getBadgeIcon(product.badge)}
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{product.nombre || 'Sin nombre'}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.descripcion || 'Sin descripción'}</p>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-1">{rating}</span>
          <span className="text-sm text-gray-400">({reviews})</span>
        </div>
        <span className="text-2xl font-bold text-gray-900 block mt-2">{formatPrice(product.precio)}</span>
      </div>
    </div>
  );
};

export default AdminProductCard;
