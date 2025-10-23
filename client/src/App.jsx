import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// Importamos fetchUserProfile para la segunda llamada
import { checkAuthStatus, fetchUserProfile } from './features/user/usersSlice'; 
import { addItemToCart, updateCartItemQuantity, removeCartItem } from './features/cart/cartSlice';

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
    
    // Obtenemos 'user' y 'authChecked' del store
    const { user, authChecked: reduxAuthChecked } = useSelector((state) => state.user);

    // Usaremos el estado local para controlar la visualización del loader inicial
    const [isInitialAuthChecked, setIsInitialAuthChecked] = useState(false);

    // --- 1. Ejecutar checkAuthStatus y marcar la verificación inicial ---
    useEffect(() => {
        const initAuth = async () => {
            // Se llama a checkAuthStatus y se usa .catch() para manejar el error de cookie no válida, si existe.
            await dispatch(checkAuthStatus()).unwrap().catch(() => {});
            setIsInitialAuthChecked(true); // Marca que la verificación de Redux terminó
        };

        initAuth();
    }, [dispatch]);

    // 🚩 --- 2. Lógica de DOBLE FETCH para obtener datos completos ---
    useEffect(() => {
        // La condición es: Autenticado && Usuario existe (payload ligero) && Falta el nombre completo
        if (reduxAuthChecked && user && !user.nombre) { 
            console.log("App.jsx: Session verificada, disparando fetchUserProfile para datos completos.");
            dispatch(fetchUserProfile());
        }
    // Dependencias: reduxAuthChecked y user son cruciales para reaccionar al payload ligero.
    }, [reduxAuthChecked, user, dispatch]); 

    const [isCartOpen, setIsCartOpen] = useState(false);
    const onCartToggle = () => setIsCartOpen((prev) => !prev);

    // 🚩 CÓDIGO CLAVE: Render loader mientras la verificación inicial se ejecuta
    if (!isInitialAuthChecked) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-600">
                <p className="text-xl text-indigo-500">Verificando sesión...</p>
            </div>
        );
    }

    // --- Funciones para el carrito (mantener) ---
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
                {/* Header se renderiza solo después de que isInitialAuthChecked es TRUE */}
                <Header cartItems={cartItems} onCartToggle={onCartToggle} />

                <main className="flex-1">
                    <Routes>
                        {/* Páginas públicas */}
                        <Route path="/" element={<Home />} />
                        <Route path="/productos" element={<ProductsPage addToCart={addToCart} />} />
                        <Route path="/productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />
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