import { useState } from 'react';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
    const [isWished, setIsWished] = useState(false);
    const [rating] = useState(4.5);
    
    const toggleWish = () => {
        setIsWished(!isWished);
    };

    const handleShare = () => {
        console.log('Compartir producto:', product.name);
    };
    
    const originalPrice = product.price * 1.2;
    const savingAmount = product.price * 0.2;

    return (
        <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border border-gray-100 relative max-w-xs">
            
            {/* Badge de oferta */}
            <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold rounded-full shadow-md">
                OFERTA
            </div>

            {/* Botones de acción superior */}
            <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
                <button 
                    onClick={toggleWish}
                    className={`p-1.5 rounded-full shadow-md transition-all duration-300 ${
                        isWished 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                >
                    <svg className="w-3.5 h-3.5" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                
                <button 
                    onClick={handleShare}
                    className="p-1.5 bg-white/90 rounded-full shadow-md text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367 2.684z" />
                    </svg>
                </button>
            </div>

            {/* Imagen del producto */}
            <div className="relative w-full h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                    src={product.image || "https://via.placeholder.com/400x400?text=Sin+Imagen"}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Contenido de la tarjeta */}
            <div className="p-3 bg-white">
                
                {/* Rating */}
                <div className="flex items-center justify-between mb-2">
                    <StarRating rating={rating} />
                    <span className="text-xs text-gray-500 ml-1">({rating})</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">ID: {product.id}</span>
                </div>

                {/* Nombre del producto */}
                <h3 className="text-gray-800 text-sm font-bold mb-2 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                </h3>
                
                {/* Precio */}
                <div className="mb-3">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xl font-black text-blue-600">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className="text-xs text-green-600 font-semibold">
                        Ahorra ${savingAmount.toFixed(2)}
                    </div>
                </div>

                {/* Estado de stock */}
                <div className="mb-3">
                    <div className="flex items-center gap-1 text-xs">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-green-600 font-medium">En stock</span>
                    </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex gap-1">
                    <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                        Ver Producto
                    </button>
                    
                    <button className="px-3 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h10m-10 0a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;