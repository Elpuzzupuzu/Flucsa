// pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Heart, Share2, Star } from 'lucide-react';

// Se debe importar los datos de productos o pasarlos como prop
const productsData = [
  {
    id: 1,
    name: 'Acople universal',
    price: '$35.00',
    image: 'https://tuvalrep.com.co/wp-content/uploads/2023/07/Acople-Universal-Apolo.jpg',
    description: 'Conexión versátil para diferentes tipos de tubería.',
    badge: '',
    rating: 4.5,
    reviews: 24
  },
  {
    id: 2,
    name: 'Bomba centrífuga',
    price: '$320.00',
    image: 'https://cms.grupoferrepat.net/assets/img/productos/619697.webp',
    description: 'Bomba de alto rendimiento para sistemas de agua.',
    badge: 'Oferta',
    rating: 4.8,
    reviews: 67
  },
  {
    id: 3,
    name: 'Filtro de sedimentos',
    price: '$45.00',
    image: 'https://www.toolferreterias.com/cdn/shop/files/273000016.jpg?v=1729035010',
    description: 'Filtro eficiente para eliminar impurezas en el agua.',
    badge: '',
    rating: 4.3,
    reviews: 18
  },
  {
    id: 4,
    name: 'Válvula de bola de PVC',
    price: '$50.00',
    image: 'https://bedon.mx/wp-content/uploads/2023/12/MUELLER-VALVULA-ESFERA-CEMENTAR-PVC-H.jpg',
    description: 'Válvula de alta resistencia para control de flujo de agua.',
    badge: 'Más Vendido',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 5,
    name: 'Tubería de cobre',
    price: '$20.00',
    image: 'https://www.surtidor.com/2203683-large_default/tubo-nacobre-l-01000601160.jpg',
    description: 'Tubería duradera y confiable para instalaciones de plomería.',
    badge: '',
    rating: 4.4,
    reviews: 31
  },
  {
    id: 6,
    name: 'Medidor de presión',
    price: '$85.00',
    image: 'https://http2.mlstatic.com/D_NQ_NP_845953-MPE74251680391_012024-O-manometro-de-presion-de-agua-de-14-npt-manometro-.webp',
    description: 'Herramienta de precisión para medir la presión de fluidos.',
    badge: 'Nuevo',
    rating: 4.6,
    reviews: 12
  },
  {
    id: 7,
    name: 'Válvula de retención',
    price: '$75.00',
    image: 'https://valvulasarco.com/wp-content/uploads/2024/03/valvula-retencion-arco.png',
    description: 'Previene el retroceso de fluidos en tuberías.',
    badge: '',
    rating: 4.2,
    reviews: 28
  },
  {
    id: 8,
    name: 'Manómetro digital',
    price: '$120.00',
    image: 'https://static.grainger.com/rp/s/is/image/Grainger/19YM06_AS01?$zmmain$',
    description: 'Medición precisa con pantalla digital.',
    badge: 'Nuevo',
    rating: 4.9,
    reviews: 43
  }
];

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simular un pequeño delay de carga para mostrar la animación
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === Number(id));
      setProduct(foundProduct);
      setIsLoading(false);
    }, 300);
  }, [id]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Simular proceso de agregar al carrito
    await new Promise(resolve => setTimeout(resolve, 800));
    onAddToCart(product);
    setAddingToCart(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 animate-pulse">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-6xl mb-4 animate-bounce">😕</div>
          <p className="text-gray-500 text-lg">Producto no encontrado.</p>
          <Link 
            to="/productos" 
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb animado */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 animate-fadeIn">
          <Link 
            to="/" 
            className="hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:underline"
          >
            Inicio
          </Link>
          <ChevronRight className="w-4 h-4 animate-pulse" />
          <Link 
            to="/productos" 
            className="hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:underline"
          >
            Productos
          </Link>
          <ChevronRight className="w-4 h-4 animate-pulse" />
          <span className="text-blue-600 font-medium animate-fadeIn">{product.name}</span>
        </div>

        <div className="lg:flex lg:gap-12 lg:items-start">
          {/* Columna de la imagen */}
          <div className="lg:w-1/2 mb-8 lg:mb-0 animate-slideInLeft">
            <div className="relative group">
              {/* Badge animado */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 animate-bounceIn">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg animate-pulse ${
                    product.badge === 'Oferta' ? 'bg-red-500 text-white' :
                    product.badge === 'Nuevo' ? 'bg-green-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Botones de acción flotantes */}
              <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 rounded-full bg-white/80 shadow-lg backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Imagen principal con efectos */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={`w-full h-auto rounded-2xl object-contain transition-all duration-700 transform group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Columna de detalles */}
          <div className="lg:w-1/2 animate-slideInRight">
            <div className="space-y-6">
              {/* Título y precio */}
              <div className="animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <p className="text-3xl text-blue-600 font-bold animate-pulse">
                    {product.price}
                  </p>
                  {product.badge === 'Oferta' && (
                    <span className="text-lg text-gray-500 line-through animate-fadeIn">
                      ${(parseFloat(product.price.replace('$', '')) * 1.2).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="animate-fadeInUp" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center space-x-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reseñas)
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <div className="animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></div>
                    Descripción del Producto
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="animate-fadeInUp" style={{animationDelay: '0.5s'}}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className={`flex-1 flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      addingToCart
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-xl'
                    }`}
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Agregando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={20} className="mr-2 animate-bounce" />
                        Añadir al Carrito
                      </>
                    )}
                  </button>
                  <button className="flex-1 px-8 py-4 bg-white text-gray-800 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md">
                    Contactar para más información
                  </button>
                </div>
              </div>

              {/* Información adicional */}
              <div className="animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-2xl mb-1">🚚</div>
                    <p className="text-xs text-gray-600">Envío gratuito</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-2xl mb-1">🔒</div>
                    <p className="text-xs text-gray-600">Compra segura</p>
                  </div>
                  <div className="text-center p-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                    <div className="text-2xl mb-1">↩️</div>
                    <p className="text-xs text-gray-600">30 días garantía</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out backwards;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;