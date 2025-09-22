import React, { useState } from 'react';
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Home from './pages/Home/Home';
import ProductsPage from './pages/Products/Products';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ProductDetails from './pages/ProductDetails/ProductDetails'; // 1. Importa el componente ProductDetails
import Footer from './components/Footer/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
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

  // Función de navegación para la vista de detalles
  const handleViewDetails = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('details');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'products':
        // Pasa la función de navegación a ProductsPage
        return <ProductsPage addToCart={addToCart} handleViewDetails={handleViewDetails} />;
      case 'details':
        // Renderiza la página de detalles
        return <ProductDetails productId={selectedProductId} onAddToCart={addToCart} />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
      <TopBar />
      <Header
        setCurrentPage={setCurrentPage}
        cartItems={cartItems}
        onCartToggle={onCartToggle}
      />
      <main className="flex-1">
        {renderPage()}
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
  );
}

export default App;