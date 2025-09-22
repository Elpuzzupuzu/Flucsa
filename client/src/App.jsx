import React, { useState } from 'react';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products'; // Ahora importas la página de productos corregida
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart'; // Se importará aquí para que sea global

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  // Mueve el estado del carrito a este componente
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mueve las funciones del carrito aquí
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

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        // Pasa las funciones del carrito como props a ProductsPage
        return <ProductsPage addToCart={addToCart} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100">
      <TopBar />
      {/* Pasa el estado del carrito al Header */}
      <Header
        setCurrentPage={setCurrentPage}
        cartItems={cartItems}
        onCartToggle={onCartToggle}
      />
      {renderPage()}

      {/* El carrito ahora se renderiza globalmente aquí */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={onCartToggle}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}

export default App;