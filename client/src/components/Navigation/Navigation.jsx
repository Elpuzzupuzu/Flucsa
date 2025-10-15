import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Package,
  Settings,
  Users,
  Phone,
  LogIn,   // Nuevo ícono
  LogOut,  // Nuevo ícono
  User     // Nuevo ícono
} from 'lucide-react';

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/productos", label: "Productos", icon: Package },
  { path: "/servicios", label: "Servicios", icon: Settings },
  { path: "/acerca-de-nosotros", label: "Nosotros", icon: Users },
  { path: "/contacto", label: "Contacto", icon: Phone }
];

const Navigation = ({
  isMobile = false,
  onLinkClick,
  isLoggedIn = false, // ⬅️ Nueva prop
  onLogout            // ⬅️ Nueva prop
}) => {
  const commonClasses = "font-medium transition-all duration-300 relative group";
  const desktopClasses = "text-white hover:text-white/90 whitespace-nowrap";

  if (isMobile) {
    // --- MOBILE NAV (Añadimos opciones de cuenta/sesión) ---
    return (
      <nav className="flex flex-col space-y-4">
        {/* Enlaces de navegación principales */}
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-white/10 text-[#ED0000]"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}

        {/* Separador */}
        <div className="border-t border-white/10 my-4" />

        {/* Opciones de Usuario/Sesión */}
        {isLoggedIn ? (
          <>
            {/* Enlace a Mi Cuenta/Perfil */}
            <NavLink
              to="/mi-cuenta"
              onClick={onLinkClick}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-white/80 hover:bg-white/5 hover:text-white"
            >
              <User size={20} />
              <span className="font-medium">Mi Cuenta</span>
            </NavLink>

            {/* Botón de Cerrar Sesión */}
            <button
              onClick={() => {
                onLogout();    // Llama a la acción de logout
                onLinkClick(); // Cierra el menú
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-red-300 hover:bg-red-500/10 hover:text-red-100"
            >
              <LogOut size={20} />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </>
        ) : (
          // Opción de Iniciar Sesión si no está logueado (solo si es necesario)
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

  // --- DESKTOP NAV ---
  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `${commonClasses} ${desktopClasses} ${
              isActive ? "text-white font-semibold" : ""
            }`
          }
        >
          {label}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#ED0000] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
