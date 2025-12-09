import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Páginas públicas
import Home from '../pages/Home/Home';
import ProductsPage from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails';
import AboutUsPage from '../pages/AboutUs/AboutUsPage';
import ServicesPage from '../pages/Servicios/ServicesPage';
import ServiceMenuPage from '../pages/serviceMenu/serviceMenuPage';
import ContactPage from '../pages/Contact/ContactPage';
import PDFCatalog from '../pages/Pdfs/PDFPage';
import NatalieCatering from '../pages/Test/Natalie';

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

// Layouts
import UserLayout from '../layouts/userLayout';
import AdminLayout from '../layouts/adminLayout';
import PublicLayout from '../layouts/PublicLayout';

// export default function AppRoutes({ addToCart }) {
//   return (
//     <Routes>
//       {/* ========================================================== */}
//       {/* PÁGINAS PÚBLICAS */}
//       {/* ========================================================== */}
//       <Route path="/" element={<PublicLayout />}>
//         <Route index element={<Home />} />
//         <Route path="productos" element={<ProductsPage addToCart={addToCart} />} />
//         <Route path="productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />
//         <Route path="catalogo-pdfs" element={<PDFCatalog />} />
//         <Route path="acerca-de-nosotros" element={<AboutUsPage />} />
//         <Route path="servicios" element={<ServicesPage />} />
//         <Route path="servicios/:category" element={<ServiceMenuPage />} />
//         <Route path="contacto" element={<ContactPage />} />
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} />
//         <Route path="cotizaciones" element={<QuotationManager />} />
//         <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />
//         {/* <Route path="cotizaciones" element={<QuotationManager />} /> */}
//         {/* <Route path="natalie" element={<NatalieCatering />} /> */}


//       </Route>

//       {/* ========================================================== */}
//       {/* RUTAS DE USUARIO */}
//       {/* ========================================================== */}
//       <Route
//         path="/mi-cuenta"
//         element={
//           <ProtectedRoute>
//             <UserLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<ProfilePage />} />
//         <Route path="cotizaciones" element={<QuotationManager />} />
//         <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />
//       </Route>

//       {/* ========================================================== */}
//       {/* RUTAS ADMIN */}
//       {/* ========================================================== */}
//       <Route
//         path="/admin"
//         element={
//           <AdminRoute>
//             <AdminLayout />
//           </AdminRoute>
//         }
//       >
//         <Route path="products" element={<AdminProducts />} />
//         <Route path="quotations" element={<AdminQuotationManager />} />
//         <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />

//       </Route>
//     </Routes>
//   );
// }


// Al inicio, agregar import
import FacturasList from '../pages/Facturas/user/FacturasList';

export default function AppRoutes({ addToCart }) {
  return (
    <Routes>
      {/* ========================================================== */}
      {/* PÁGINAS PÚBLICAS */}
      {/* ========================================================== */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<ProductsPage addToCart={addToCart} />} />
        <Route path="productos/:id" element={<ProductDetails onAddToCart={addToCart} />} />
        <Route path="catalogo-pdfs" element={<PDFCatalog />} />
        <Route path="acerca-de-nosotros" element={<AboutUsPage />} />
        <Route path="servicios" element={<ServicesPage />} />
        <Route path="servicios/:category" element={<ServiceMenuPage />} />
        <Route path="contacto" element={<ContactPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cotizaciones" element={<QuotationManager />} />
        <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />
      </Route>

      {/* ========================================================== */}
      {/* RUTAS DE USUARIO */}
      {/* ========================================================== */}
      <Route
        path="/mi-cuenta"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ProfilePage />} />
        <Route path="cotizaciones" element={<QuotationManager />} />
        <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />

        {/* NUEVA RUTA PARA FACTURAS */}
        <Route path="mis-facturas" element={<FacturasList />} />
      </Route>

      {/* ========================================================== */}
      {/* RUTAS ADMIN */}
      {/* ========================================================== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="products" element={<AdminProducts />} />
        <Route path="quotations" element={<AdminQuotationManager />} />
        <Route path="cotizaciones/:id" element={<QuotationDetailPage />} />
      </Route>
    </Routes>
  );
}
