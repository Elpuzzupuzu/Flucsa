// pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, ChevronRight, Star, Heart } from "lucide-react";
import { fetchProductById } from "../../features/products/productsSlice";

// IMPORTAMOS HOOK WISHLIST
import useWishlist from "../../hooks/wishList/useWishlist";

// IMPORTAMOS RELACIONADOS
import RelatedProductsSlider from "../relatedProducts/RelatedProductsSlider";

// REVIEWS
import ProductReviewsList from "../productReviewsList/ProductReviewsList";
import AddReviewForm from "../productReviewsList/AddReviewForm";

const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.adminProducts.items) || [];

  // USUARIO LOGUEADO
  const user = useSelector((state) => state.user);
  const userId = user?.user?.id ?? null;

  const { wishlist, isInWishlist, toggleWishlist } = useWishlist(userId);

  const [product, setProduct] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(null);

  // Cargar producto
  useEffect(() => {
    if (!products) return;

    const foundProduct = products.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      dispatch(fetchProductById(id))
        .unwrap()
        .then((fetchedProduct) => {
          setProduct(fetchedProduct);
        })
        .catch(() => {
          setError("Producto no encontrado.");
        });
    }
  }, [id, products, dispatch]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    onAddToCart(product);
    setAddingToCart(false);
  };

  // Render estrellas
  const renderStars = (rating = 4.6) => {
    rating = Number(rating) || 0;

    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
      );
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
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // ERROR
  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 flex flex-col items-center gap-4">
          <p className="text-red-500 text-lg font-medium">{error}</p>
          <Link
            to="/productos"
            className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  // LOADING
  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-gray-500 text-lg font-medium animate-pulse">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  const favorite = isInWishlist(product.id);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen py-6 px-3 md:px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 hover:underline">
            Inicio
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link to="/productos" className="hover:text-blue-600 hover:underline">
            Productos
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-blue-600 font-medium">
            {product.nombre}
          </span>
        </div>

        <div className="lg:flex lg:gap-8 lg:items-start">

          {/* Imagen */}
          <div className="lg:w-1/2 mb-6 lg:mb-0 relative group">
            <div className="overflow-hidden rounded-xl bg-gray-50 border shadow-inner">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl"></div>
              )}
              <img
                src={product.imagen}
                alt={product.nombre}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-80 object-contain transition-transform duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                } group-hover:scale-105`}
              />
            </div>

            {/* ❤️ BOTÓN DE WISHLIST */}
            {userId && (
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorite ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
          </div>

          {/* Detalles */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.nombre}
              </h1>

              <div className="flex items-center gap-2 mb-2">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-600">
                  {product.rating ?? 4.6}
                </span>
              </div>

              <p className="text-xs text-green-600">✓ disponible</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
              <h2 className="text-sm font-semibold text-gray-800">
                Descripción
              </h2>
              <p className="text-gray-600 text-sm">
                {product.descripcion}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-white transition ${
                  addingToCart
                    ? "bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {addingToCart ? "Agregando..." : "Agregar al carrito"}
              </button>

              <button className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-800 rounded-full font-semibold text-sm hover:bg-gray-50">
                Contactar información
              </button>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        <div className="mt-10">
          <RelatedProductsSlider
            productId={product.id}
            categoriaId={product.categoria_principal_id}
            onAddToCart={onAddToCart}
          />
        </div>

        {/* Reseñas */}
        <div className="mt-12">
          <ProductReviewsList productId={product.id} />

          {userId && (
            <AddReviewForm productId={product.id} userId={userId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
