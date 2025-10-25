// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus, fetchUserProfile } from './features/user/usersSlice';
import { addItemToCart, updateCartItemQuantity, removeCartItem } from './features/cart/cartSlice';

// Componentes base
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './hooks/Scrolltop';

// 🚩 Notificación
import ToastNotification from './components/ToastComponent/ToastNotification';
import ReduxToast from './components/ReduxToast/ReduxToast';
import useNotification from './hooks/Notify/useNotification';

// Páginas
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ServicesPage from './pages/Servicios/ServicesPage';
import ServiceMenuPage from './pages/serviceMenu/serviceMenuPage';
import ContactPage from './pages/Contact/ContactPage';
import PDFCatalog from './pages/Pdfs/PDFPage';

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

  // 🚩 Hook de notificación (react-toastify)
  const { notify } = useNotification();

  // Obtenemos 'user' y 'authChecked' del store
  const { user, authChecked: reduxAuthChecked } = useSelector((state) => state.user);
  const isAuthenticated = !!user;

  const [isInitialAuthChecked, setIsInitialAuthChecked] = useState(false);

  // --- 1. Ejecutar checkAuthStatus y marcar la verificación inicial ---
  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuthStatus()).unwrap().catch(() => {});
      setIsInitialAuthChecked(true);
    };
    initAuth();
  }, [dispatch]);

  // --- 2. Fetch de datos completos si es necesario ---
  useEffect(() => {
    if (reduxAuthChecked && user && !user.nombre) {
      dispatch(fetchUserProfile());
    }
  }, [reduxAuthChecked, user, dispatch]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartToggle = () => setIsCartOpen((prev) => !prev);

  // Render loader mientras se verifica la sesión
  if (!isInitialAuthChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
        <p className="text-xl text-indigo-500">Verificando sesión...</p>
      </div>
    );
  }

  // --- Funciones para el carrito ---
  const addToCart = (product) => {
    if (!isAuthenticated) {
      notify('Debes iniciar sesión para agregar productos al carrito. 🛒', 'error');
      return;
    }

    dispatch(addItemToCart({ producto_id: product.id, cantidad: 1 }))
      .unwrap()
      .then(() => {
        notify(`✔️ "${product.nombre}" agregado al carrito`, 'success');
      })
      .catch((error) => {
        console.error(error);
        notify('❌ Error al agregar el producto al carrito', 'error');
      });
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
            <Route path="/catalogo-pdfs" element={<PDFCatalog />} />
            <Route path="/acerca-de-nosotros" element={<AboutUsPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/:category" element={<ServiceMenuPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas protegidas */}
            <Route
              path="/mi-cuenta"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <AdminProducts />
                </AdminRoute>
              }
            />
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

        {/* 🚩 COMPONENTE DE NOTIFICACIÓN GLOBAL */}
        <ToastNotification />
        <ReduxToast /> {/* Escucha los mensajes de Redux y dispara toast */}

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
