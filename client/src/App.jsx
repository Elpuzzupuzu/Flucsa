import React, { useState, useEffect } from 'react'; // ⬅️ Importamos useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ServicesPage from './pages/Servicios/ServicesPage';
import ServiceMenuPage from './pages/serviceMenu/serviceMenuPage';
import ContactPage from './pages/Contact/ContactPage';
import Footer from './components/Footer/Footer';
import ScrollToTop from './hooks/Scrolltop';

// Importaciones de Redux
import { useDispatch } from 'react-redux'; // ⬅️ Importamos useDispatch
import { checkAuthStatus } from './features/user/usersSlice'; // ⬅️ Importamos la Thunk

// Importaciones de Autenticación
import Login from './pages/Auth/login';
// import Register from './pages/Auth/Register';

// Import del admin (dummy por ahora)
import AdminProducts from './admin/products/AdminProducts';

function App() {
  // --- Lógica de persistencia de sesión ---
  const dispatch = useDispatch();
  
  // Ejecuta la verificación de la cookie al montar el componente App
  useEffect(() => {
    // Esto hace la llamada al backend para ver si la cookie HttpOnly es válida.
    dispatch(checkAuthStatus());
  }, [dispatch]);
  // ----------------------------------------
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onCartToggle = () => setIsCartOpen(prev => !prev);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
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
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />

            {/* RUTAS DE AUTENTICACIÓN */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            <Route path="/acerca-de-nosotros" element={<AboutUsPage />} />
            <Route path="/servicios" element={<ServicesPage />} />
            <Route path="/servicios/:category" element={<ServiceMenuPage />} />
            <Route path="/contacto" element={<ContactPage />} />

            {/* Ruta dummy para admin */}
            <Route path="/admin/products" element={<AdminProducts />} />
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