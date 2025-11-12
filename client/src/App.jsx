import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

// === Hooks Personalizados ===
import { useAppInitialization } from './hooks/App/useAppInitialitation'; 
import { useRealtimeQuotation } from './hooks/useRealtimeQuotation/useRealtimeQuotation';
import { useCartActions } from './hooks/Cart/useCartActions'; 
import { useSocketManager } from './hooks/Socket/useSocketManager'; // 👈 IMPORTACIÓN REQUERIDA

// === Componentes Base y Rutas ===
import Header from './components/Header/Header';
import TopBar from './components/TopBar/TopBar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './hooks/Scrolltop';
import ShoppingCart from './pages/Products/ShoppingCart/ShoppingCart';
import ToastNotification from './components/ToastComponent/ToastNotification';
import ReduxToast from './components/ReduxToast/ReduxToast';
import AppRoutes from './AppRoutes/appRoutes'; 
import SessionLoader from './components/LoadingScreen/sesionLoader';

function App() {
  // === Lógica Central ===
  const { isAuthenticated, user, reduxAuthChecked } = useAppInitialization();

  // 1. GESTIONAR LA CONEXIÓN GLOBAL DEL SOCKET (NUEVO PASO)
  // Se conecta solo si el usuario está autenticado.
  const socketInstance = useSocketManager(isAuthenticated); 

  // 2. Ejecutar Lógica de Sockets (Tiempo Real)
  // Ahora se le pasa la instancia del socket y el objeto user.
  useRealtimeQuotation(socketInstance, user); 

  // Usa el nuevo hook para obtener las funciones del carrito
  const { addToCart, updateCartQuantity, removeFromCart, handleProceedToCheckout } = useCartActions(); 

  // --- Estado Local UI ---
  const cartItems = useSelector((state) => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const onCartToggle = () => setIsCartOpen((prev) => !prev);

  // Render loader mientras se verifica la sesión
  if (!reduxAuthChecked) {
    return (
      <SessionLoader/>
     
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-sans min-h-screen bg-gray-100 flex flex-col">
        <TopBar />
        <Header cartItems={cartItems} onCartToggle={onCartToggle} />

        <main className="flex-1">
          <AppRoutes addToCart={addToCart} />
        </main>

        <ShoppingCart
          isOpen={isCartOpen}
          onClose={onCartToggle}
          cartItems={cartItems}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onProceedToCheckout={handleProceedToCheckout}
        />

        {/* Notificaciones Globales */}
        <ToastNotification />
        <ReduxToast /> 

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;