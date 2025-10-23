import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './features/user/usersSlice';

// Componentes base
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './hooks/Scrolltop';

// Páginas
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ServicesPage from './pages/Servicios/ServicesPage';
import ServiceMenuPage from './pages/serviceMenu/serviceMenuPage';
import ContactPage from './pages/Contact/ContactPage';
import PdfPage from './pages/Pdfs/PdfPage';

// Auth
import Login from './pages/Auth/login';
import Register from './pages/Auth/Register';
import ProfilePage from './pages/Auth/ProfilePage/ProfilePage';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import AdminRoute from './pages/Auth/AdminRoute';

// Admin
import AdminProducts from './admin/products/AdminProducts';

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { loading } = useSelector((state) => state.user);

  const [authChecked, setAuthChecked] = useState(false);

  // --- Espera checkAuthStatus antes de montar rutas ---
  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuthStatus()).unwrap().catch(() => {});
      setAuthChecked(true); // Marca que la verificación terminó
    };

    initAuth();
  }, [dispatch]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartToggle = () => setIsCartOpen((prev) => !prev);

  // Render loader mientras checkAuthStatus se ejecuta
  if (!authChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <p className="text-xl text-indigo-500">Verificando sesión...</p>
      </div>
    );
  }

  // --- Funciones para el carrito ---
  const addToCart = (product) => {
    dispatch(addItemToCart({ producto_id: product.id, cantidad: 1 }))
      .unwrap()
      .then(() => setIsCartOpen(true))
      .catch(console.error);
  };

  const updateCartQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity({ itemId: id, cantidad: quantity }));
  };

  const removeFromCart = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleProceedToCheckout = () => {};

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <TopBar />
        <Header cartItems={cartItems} onCartToggle={onCartToggle} />

        <main className="flex-1">
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />
            <Route path="/catalogo-pdfs" element={<PdfPage />} />
            <Route path="/acerca-de-nosotros" element={<AboutUsPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/:category" element={<ServiceMenuPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route path="/mi-cuenta" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
          </Routes>
        </main>

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={onCartToggle}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onProceedToCheckout={handleProceedToCheckout}
        />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
