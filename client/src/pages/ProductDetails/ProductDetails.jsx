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
      stars.push(<Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />);
    }
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
        </div>
      );
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  // --- Si no hay producto, mostramos animación de carga ---
  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 flex flex-col items-center gap-4">
          {/* Indicador circular giratorio */}
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>

          {/* Texto de carga */}
          <p className="text-gray-500 text-lg font-medium animate-pulse">
            Cargando producto...
          </p>

          {/* Botón para volver */}
          <Link
            to="/productos"
            className="inline-block mt-4 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  // --- Render del producto cuando está disponible ---
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-6 px-3 md:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 p-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 hover:underline transition-all">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link
            to="/productos"
            className="hover:text-blue-600 hover:underline transition-all"
          >
            Productos
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-blue-600 font-medium">{product.nombre || product.name}</span>
        </div>

        <div className="lg:flex lg:gap-8 lg:items-start">
          {/* Imagen principal */}
          <div className="lg:w-1/2 mb-6 lg:mb-0 relative group">
            {/* Badge */}
            {product.badge && (
              <div
                className={`absolute top-3 left-3 bg-gradient-to-r ${
                  product.badge === "Oferta"
                    ? "from-pink-500 to-rose-600"
                    : product.badge === "Nuevo"
                    ? "from-emerald-400 to-cyan-500"
                    : "from-blue-600 to-indigo-700"
                } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-fadeIn`}
              >
                {product.badge}
              </div>
            )}

            {/* Botones flotantes */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={toggleFavorite}
                className={`p-2 rounded-full backdrop-blur-md shadow-md transition-all duration-200 ${
                  isFavorite
                    ? "bg-red-500 text-white scale-110"
                    : "bg-white/90 text-gray-700 hover:bg-red-50 hover:text-red-500 hover:scale-110"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 shadow-md">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Imagen del producto */}
            <div className="overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-inner">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl"></div>
              )}
              <img
                src={product.imagen || product.image}
                alt={product.nombre || product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-80 object-contain transition-transform duration-500 ${
                  imageLoaded ? "scale-100 opacity-100" : "scale-95 opacity-0"
                } group-hover:scale-105`}
              />
            </div>
          </div>

          {/* Detalles */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-1">
                {product.nombre || product.name}
              </h1>
              <p className="text-sm text-gray-500 mb-3">{product.categoria || "Categoría general"}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                {renderStars(product.rating ?? 4.6)}
                <span className="text-xs text-gray-600">
                  {product.rating ?? 4.6} ({product.reviews ?? 24} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {product.precio
                    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(product.precio)
                    : "Precio no disponible"}
                </p>
                {product.precioOriginal && (
                  <span className="text-sm line-through text-gray-400">
                    {new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(product.precioOriginal)}
                  </span>
                )}
              </div>

              <p className="text-xs text-green-600 font-medium mt-1">
                ✓ disponible
              </p>
            </div>

            {/* Descripción */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all">
              <h2 className="text-sm font-semibold text-gray-800 mb-1">
                Descripción del producto
              </h2>
              <p className="text-gray-600 text-sm leading-snug">
                {product.descripcion || product.description}
              </p>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white transition-all duration-300 shadow-sm ${
                  addingToCart
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:scale-[1.02]"
                }`}
              >
                {addingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Agregando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al carrito
                  </>
                )}
              </button>

              <button className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-full font-semibold text-sm hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200">
                Contactar para más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
