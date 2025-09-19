import React, { useState } from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => setIsAddingToCart(false), 600);
  };

  // Datos de ejemplo si no se pasan props
  const defaultProduct = {
    id: 1,
    name: "MacBook Pro M3",
    description: "La nueva generación de MacBook Pro con chip M3, pantalla Liquid Retina XDR y hasta 22 horas de duración de batería.",
    price: "$2,299",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
    badge: "Nuevo",
    rating: 4.8,
    reviews: 124,
    discount: 15
  };

  const prod = product || defaultProduct;

  return (
    <div className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-3 border border-gray-100/50 backdrop-blur-sm">
      
      {/* Efecto de brillo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>
      
      {/* Badge y botón de favorito */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
        {prod.badge && (
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
            {prod.badge}
          </div>
        )}
        {prod.discount && (
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ml-2">
            -{prod.discount}%
          </div>
        )}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart 
            size={16} 
            className={`transition-all duration-300 ${isLiked ? 'fill-current' : ''}`} 
          />
        </button>
      </div>

      {/* Contenedor de imagen con efectos avanzados */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <img
          src={prod.image}
          alt={prod.name}
          className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        {/* Efecto de partículas flotantes */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/60 rounded-full animate-ping delay-100"></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-500"></div>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6 relative">
        {/* Rating */}
        {prod.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(prod.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  } transition-colors duration-200`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {prod.rating} ({prod.reviews || 0})
            </span>
          </div>
        )}

        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
          {prod.name}
        </h2>
        
        <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed text-sm">
          {prod.description}
        </p>

        {/* Footer con precio y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-gradient-to-r from-transparent via-gray-200 to-transparent">
          <div className="flex flex-col">
            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {prod.price}
            </span>
            {prod.discount && (
              <span className="text-xs text-gray-400 line-through">
                ${(parseFloat(prod.price.replace('$', '').replace(',', '')) * (1 + prod.discount/100)).toFixed(0)}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              isAddingToCart
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
            }`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Agregado
              </>
            ) : (
              <>
                Añadir
                <ShoppingCart 
                  size={18} 
                  className="transform transition-transform duration-200 group-hover:scale-125 group-hover:rotate-12" 
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente de demostración
const Demo = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      description: "El iPhone más avanzado con cámara profesional de 48MP, chip A17 Pro y diseño de titanio ultra resistente.",
      price: "$1,199",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
      badge: "Pro",
      rating: 4.9,
      reviews: 2847,
      discount: 10
    },
    {
      id: 2,
      name: "MacBook Air M2",
      description: "Ultrabook perfecta para trabajo y creatividad con chip M2, pantalla Liquid Retina de 13.6 pulgadas.",
      price: "$1,099",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      badge: "Popular",
      rating: 4.7,
      reviews: 1523,
      discount: 15
    },
    {
      id: 3,
      name: "iPad Pro 12.9\"",
      description: "La tablet más potente con chip M2, pantalla Liquid Retina XDR y compatibilidad con Apple Pencil.",
      price: "$1,099",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      badge: "Nuevo",
      rating: 4.8,
      reviews: 945,
      discount: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            ProductCard Mejorado
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Diseño moderno con efectos visuales avanzados, animaciones fluidas y mejor experiencia de usuario
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Demo;