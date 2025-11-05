// Ruta sugerida: src/components/AppRoutes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ==========================================================
// IMPORTACIONES DE PÁGINAS (MOVIDAS DESDE App.jsx)
// Asegúrate de que estas rutas sean correctas
// ==========================================================
// Páginas públicas
import Home from '../pages/Home/Home';
import ProductsPage from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import ServicesPage from '../pages/Servicios/ServicesPage';
import ServiceMenuPage from '../pages/serviceMenu/serviceMenuPage';
import ContactPage from '../pages/Contact/ContactPage';
import PDFCatalog from '../pages/Pdfs/PDFPage';

// Auth
import Login from '../pages/Auth/login';
import Register from '../pages/Auth/Register';
import ProfilePage from '../pages/Auth/ProfilePage/ProfilePage';
import ProtectedRoute from '../pages/Auth/ProtectedRoute';
import AdminRoute from '../pages/Auth/AdminRoute';

// Admin
import AdminProducts from '../admin/products/AdminProducts';
import AdminQuotationManager from '../pages/Quotations/AdminQuotationManager';

// Cotizaciones
import QuotationManager from '../pages/Quotations/QuotationManager';
import QuotationDetailPage from '../pages/Quotations/QuotationDetailPage';


/**
 * Componente que define todas las rutas de la aplicación.
 * @param {function} addToCart - Función para agregar un producto al carrito (pasada desde App.jsx).
 */
export default function AppRoutes({ addToCart }) {
  return (
    <Routes>
      {/* ========================================================== */}
      {/* Páginas públicas */}
      {/* ========================================================== */}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<ProductsPage addToCart={addToCart} />} />
      <Route
        path="/productos/:id"
        element={<ProductDetails onAddToCart={addToCart} />}
      />
      <Route path="/catalogo-pdfs" element={<PDFCatalog />} />
      <Route path="/acerca-de-nosotros" element={<AboutUsPage />} />
      <Route path="/servicios" element={<ServicesPage />} />
      <Route path="/servicios/:category" element={<ServiceMenuPage />} />
      <Route path="/contacto" element={<ContactPage />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ========================================================== */}
      {/* Rutas protegidas de Usuario */}
      {/* ========================================================== */}
      <Route
        path="/mi-cuenta"
        element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}
      />

      {/* RUTAS DE COTIZACIONES (USUARIO) */}
      <Route
        path="/cotizaciones"
        element={<ProtectedRoute><QuotationManager /></ProtectedRoute>}
      />
      <Route
        path="/cotizaciones/:id"
        element={<ProtectedRoute><QuotationDetailPage /></ProtectedRoute>}
      />

      {/* ========================================================== */}
      {/* RUTAS ADMIN */}
      {/* ========================================================== */}
      <Route
        path="/admin/products"
        element={<AdminRoute><AdminProducts /></AdminRoute>}
      />
      
      <Route
        path="/admin/quotations"
        element={<AdminRoute><AdminQuotationManager /></AdminRoute>}
      />
    </Routes>
  );
}