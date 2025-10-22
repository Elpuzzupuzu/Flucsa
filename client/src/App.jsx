import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componentes base
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './hooks/Scrolltop';

// Páginas principales
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ServicesPage from './pages/Servicios/ServicesPage';
import ServiceMenuPage from './pages/serviceMenu/serviceMenuPage';
import ContactPage from './pages/Contact/ContactPage';

// PDFs
import PdfPage from './pages/Pdfs/PdfPage';

// Autenticación y protección de rutas
import Login from './pages/Auth/login';
import Register from './pages/Auth/Register';
import ProfilePage from './pages/Auth/ProfilePage/ProfilePage';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import AdminRoute from './pages/Auth/AdminRoute';

// Admin
import AdminProducts from './admin/products/AdminProducts';

// Importaciones de Redux
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './features/user/usersSlice';
import { addItemToCart, updateCartItemQuantity, removeCartItem } from './features/cart/cartSlice';

function App() {
  // --- Lógica de persistencia de sesión ---
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  // ----------------------------------------

  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartToggle = () => setIsCartOpen((prev) => !prev);

  // --- Función para agregar productos al carrito usando Redux ---
  const addToCart = (product) => {
    console.log('Intentando agregar al carrito:', product);

    dispatch(addItemToCart({ producto_id: product.id, cantidad: 1 }))
      .unwrap()
      .then((item) => {
        console.log('Producto agregado con éxito:', item);
        setIsCartOpen(true);
      })
      .catch((error) => {
        console.error('Error al agregar producto al carrito:', error);
      });
  };

  const updateCartQuantity = (id, quantity) => {
    console.log(`Actualizando cantidad del producto ID ${id} a ${quantity}`);
    dispatch(updateCartItemQuantity({ itemId: id, cantidad: quantity }));
  };

  const removeFromCart = (id) => {
    console.log(`Eliminando producto del carrito ID ${id}`);
    dispatch(removeCartItem(id));
  };

  const handleProceedToCheckout = () => {
    console.log('Redirigiendo al checkout...');
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <TopBar />
        <Header cartItems={cartItems} onCartToggle={onCartToggle} />

        <main className="flex-1">
          <Routes>
            {/* Páginas principales */}
            <Route path="/" element={<Home />} />
            <Route
              path="/productos"
              element={<ProductsPage addToCart={addToCart} />}
            />
            <Route
              path="/productos/:id"
              element={<ProductDetails onAddToCart={addToCart} />}
            />

            {/* Catálogo PDF */}
            <Route path="/catalogo-pdfs" element={<PdfPage />} />

            {/* Rutas de autenticación */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Perfil protegido */}
            <Route
              path="/mi-cuenta"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Otras páginas */}
            <Route path="/acerca-de-nosotros" element={<AboutUsPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/:category" element={<ServiceMenuPage />} />
            <Route path="/contacto" element={<ContactPage />} />

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

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
