import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Package,
  Settings,
  Users,
  Phone,
  LogIn,
  LogOut,
  User,
  LayoutDashboard,
  ListChecks,
  FileText,
  Handshake, // ⬅️ NUEVO: Ícono para Cotizaciones (representa acuerdo/transacción)
} from 'lucide-react';

// =========================================================
// 1. DEFINICIÓN DE RUTAS POR ROL
// =========================================================

// Rutas generales que siempre deberían mostrarse
const COMMON_NAV_ITEMS = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/productos', label: 'Productos', icon: Package },
  { path: '/servicios', label: 'Servicios', icon: Settings },
  { path: '/acerca-de-nosotros', label: 'Nosotros', icon: Users },
  { path: '/contacto', label: 'Contacto', icon: Phone },
  // RUTA AÑADIDA: Catálogos PDF
  { path: '/catalogo-pdfs', label: 'Catálogos', icon: FileText },
];

// Rutas específicas para usuarios autenticados (no admin)
const USER_NAV_ITEMS = [
  { path: '/cotizaciones', label: 'Cotizaciones', icon: Handshake }, // 🚨 RUTA DE USUARIO
];

// Rutas específicas para un usuario Administrador (Admin)
const ADMIN_NAV_ITEMS = [
  { path: '/admin/products', label: 'Admin Productos', icon: LayoutDashboard },
  { path: '/admin/quotations', label: 'Gestionar Cotizaciones', icon: ListChecks }, // 🚨 RUTA DE ADMIN
  { path: '/admin/manage', label: 'Administración General', icon: Settings },
];

// =========================================================
// 2. COMPONENTE NAVIGATION
// =========================================================

const Navigation = ({
  isMobile = false,
  onLinkClick,
  isLoggedIn = false,
  onLogout,
  rol,
}) => {
  const commonClasses = 'font-medium transition-all duration-300 relative group';
  const desktopClasses = 'text-white hover:text-white/90 whitespace-nowrap';

  // Determina la lista completa de enlaces para la vista móvil/tablet
  let allNavItems = [...COMMON_NAV_ITEMS];

  if (isLoggedIn) {
    allNavItems = [...allNavItems, ...USER_NAV_ITEMS];
  }

  if (rol === 'admin') {
    allNavItems = [...allNavItems, ...ADMIN_NAV_ITEMS];
  }

  // ---------------------------------------------------------
  // VISTA MÓVIL
  // ---------------------------------------------------------
  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-4">
        {/* Enlaces de navegación principales y de rol */}
        {allNavItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-white/10 text-[#ED0000]'
                  : 'text-white/80 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}

        {/* Separador y Opciones de Sesión */}
        <div className="border-t border-white/10 my-4" />

        {isLoggedIn ? (
          <>
            <NavLink
              to="/mi-cuenta"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white/80 hover:bg-white/5 hover:text-white"
            >
              <User size={20} />
              <span className="font-medium">Mi Cuenta</span>
            </NavLink>

            <button
              onClick={() => {
                onLogout();
                onLinkClick();
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-red-300 hover:bg-red-500/10 hover:text-red-100"
            >
              <LogOut size={20} />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            onClick={onLinkClick}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white/80 hover:bg-white/5 hover:text-white"
          >
            <LogIn size={20} />
            <span className="font-medium">Iniciar Sesión</span>
          </NavLink>
        )}
      </nav>
    );
  }

  // ---------------------------------------------------------
  // VISTA ESCRITORIO
  // ---------------------------------------------------------
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {/* 1. Enlaces Comunes */}
      {COMMON_NAV_ITEMS.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${commonClasses} ${desktopClasses} ${
              isActive ? 'text-white font-semibold' : ''
            }`
          }
        >
          {label}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ED0000] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
        </NavLink>
      ))}

      {/* 1.5 Enlaces de Usuario (Solo si está logueado y no es admin) */}
      {isLoggedIn &&
        rol !== 'admin' &&
        USER_NAV_ITEMS.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `${commonClasses} ${desktopClasses} text-indigo-300 hover:text-indigo-100 ${
                isActive ? 'font-semibold' : ''
              }`
            }
          >
            {label}
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
          </NavLink>
        ))}

      {/* 2. Enlaces de Administrador (Solo si el rol es 'admin') */}
      {rol === 'admin' && (
        <>
          <span className="text-white/50">|</span>
          {ADMIN_NAV_ITEMS.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `${commonClasses} ${desktopClasses} font-bold text-yellow-300 hover:text-yellow-100 ${
                  isActive ? 'border-b-2 border-yellow-400' : ''
                }`
              }
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
            </NavLink>
          ))}
        </>
      )}
    </nav>
  );
};

export default Navigation;
