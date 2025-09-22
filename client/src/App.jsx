import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. Importa los componentes de enrutamiento
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Footer from './components/Footer/Footer';

function App() {
  // Se elimina la navegación manual con useState.
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const onCartToggle = () => setIsCartOpen(!isCartOpen);
  
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
  };
  
  const updateCartQuantity = (id, quantity) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };
  
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleProceedToCheckout = () => {
    alert('Redirigiendo al checkout...');
  };

  return (
    <BrowserRouter> {/* 2. Envuelve toda la aplicación con BrowserRouter */}
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <TopBar />
        <Header
          cartItems={cartItems}
          onCartToggle={onCartToggle}
        />
        <main className="flex-1">
          <Routes> {/* 3. Define tus rutas dentro de Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductsPage addToCart={addToCart} />} />
            <Route path="/productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />
            {/* 4. Agrega otras rutas aquí si es necesario */}
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