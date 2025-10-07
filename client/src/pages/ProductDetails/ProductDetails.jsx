// pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, ChevronRight, Heart, Share2, Star } from "lucide-react";
import { fetchAdminProductById } from "../../features/products/adminProductsSlice";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminProducts.products);
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      dispatch(fetchAdminProductById(id))
        .unwrap()
        .then((fetchedProduct) => setProduct(fetchedProduct))
        .catch((err) => console.error("Producto no encontrado:", err));
    }
  }, [id, products, dispatch]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    onAddToCart(product);
    setAddingToCart(false);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-3 h-3 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    return stars;
  };

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <div className="text-4xl mb-4 animate-bounce">😕</div>
          <p className="text-gray-500 text-base">Producto no encontrado.</p>
          <Link
            to="/productos"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-4 px-2 md:px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-4 animate-fadeIn">
          <Link to="/" className="hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:underline">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 animate-pulse" />
          <Link to="/productos" className="hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:underline">
            Productos
          </Link>
          <ChevronRight className="w-3 h-3 animate-pulse" />
          <span className="text-blue-600 font-medium animate-fadeIn">{product.nombre || product.name}</span>
        </div>

        <div className="lg:flex lg:gap-4 lg:items-start">
          {/* Imagen */}
          <div className="lg:w-1/2 mb-4 lg:mb-0 animate-slideInLeft">
            <div className="relative group">
              {product.badge && (
                <div className="absolute top-2 left-2 z-10 animate-bounceIn">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full shadow-lg animate-pulse ${
                      product.badge === 'Oferta'
                        ? 'bg-red-500 text-white'
                        : product.badge === 'Nuevo'
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Botones flotantes */}
              <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                <button
                  onClick={toggleFavorite}
                  className={`p-1 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                    isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-1 rounded-full bg-white/80 shadow-lg backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-xl shadow-lg h-48 sm:h-56">
                {!imageLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl"></div>}
                <img
                  src={product.imagen || product.image}
                  alt={product.nombre || product.name}
                  className={`w-full h-full object-contain transition-all duration-700 transform group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Detalles */}
          <div className="lg:w-1/2 animate-slideInRight">
            <div className="space-y-4">
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 leading-snug">{product.nombre || product.name}</h1>
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-xl text-blue-600 font-bold animate-pulse">
                    {product.precio
                      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product.precio)
                      : 'Precio no disponible'}
                  </p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center space-x-1 mb-2">
                  <div className="flex items-center space-x-1">{renderStars(product.rating ?? 4.5)}</div>
                  <span className="text-xs text-gray-600">{product.rating ?? 4.5} ({product.reviews ?? 20} reseñas)</span>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-2 rounded-lg border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-sm font-semibold text-gray-800 mb-1 flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-1 animate-pulse"></div>
                    Descripción del Producto
                  </h2>
                  <p className="text-gray-600 text-sm leading-snug">{product.descripcion || product.description}</p>
                </div>
              </div>

              <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      addingToCart
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-xl'
                    }`}
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                        Agregando...
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} className="mr-1 animate-bounce" />
                        Añadir al Carrito
                      </>
                    )}
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 hover:shadow-md text-sm">
                    Contactar para más información
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.3); } 50% { opacity: 1; transform: scale(1.05); } 70% { transform: scale(0.9); } 100% { opacity: 1; transform: scale(1); } }

        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out backwards; }
        .animate-bounceIn { animation: bounceIn 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default ProductDetails;
