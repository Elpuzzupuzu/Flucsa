import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { LogIn, User, Power, List, Truck, UserPlus } from "lucide-react";

// Función auxiliar para obtener las iniciales del nombre
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  let initials = "";

  if (parts.length > 0) {
    initials += parts[0].charAt(0).toUpperCase();
  }
  if (parts.length > 1) {
    initials += parts[1].charAt(0).toUpperCase();
  } else if (initials.length === 1 && name.length > 1) {
    initials += name.charAt(1).toUpperCase();
  }

  return initials.substring(0, 2);
};

const UserDropdown = ({ userName, isLoggedIn, onLogout }) => {
  // ===============================================
  // LOG PARA VERIFICAR LAS PROPS DE REDUX
  // ===============================================
  console.log("UserDropdown Props:", { 
    userName: userName, 
    isLoggedIn: isLoggedIn, 
    initials: getInitials(userName) // Calcula aquí también para el log
  });
  // ===============================================

  const [isOpen, setIsOpen] = useState(false);

  // Calcula las iniciales solo cuando el nombre cambia
  const userInitials = useMemo(() => getInitials(userName), [userName]);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  
  const handleLogout = () => {
    onLogout();
    setIsOpen(false);
  };

  const handleLinkClick = () => setIsOpen(false);

  const TriggerContent = () => (
    <div className="flex items-center space-x-2">
      {isLoggedIn && (
        // Avatar de Iniciales
        <div className="w-8 h-8 flex items-center justify-center bg-white text-[#131921] font-bold text-sm rounded-full shadow-inner">
          {userInitials}
        </div>
      )}
      <div className="flex flex-col leading-none">
        <span className="text-xs text-white/70">
          Hola, {isLoggedIn ? userName.split(' ')[0] : "visitante"}
        </span>
        <span className="text-sm font-bold text-white whitespace-nowrap">
          {isLoggedIn ? "Tu Cuenta" : "Identifícate"}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="relative flex items-center h-full group transition-all"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger visible */}
      <div
        className={`p-2 rounded-md transition-all cursor-pointer ${
          isOpen ? "bg-white/20 border-white/20" : "border border-transparent hover:border-white/20"
        }`}
      >
        <TriggerContent />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className={`absolute top-[calc(100%+5px)] right-0 bg-white shadow-2xl border border-gray-100 p-4 z-40 transform origin-top-right ${isLoggedIn ? 'w-[450px] rounded-xl' : 'w-[400px] rounded-lg'}`}>
          
          {/* Flecha superior decorativa */}
          <div className={`absolute -top-2 right-6 w-4 h-4 bg-white transform rotate-45 border-t border-l ${isLoggedIn ? 'border-gray-100 right-8' : 'border-gray-200 right-4'}`}></div>

          {/* Contenido del Dropdown */}
          {!isLoggedIn ? (
            // ESTADO NO LOGUEADO (ORIGINAL - INTACTO)
            <div className="flex flex-col items-center p-2">
              <p className="text-sm text-gray-700 mb-3">
                Accede o regístrate para una mejor experiencia.
              </p>

              <Link
                to="/login"
                onClick={handleLinkClick}
                className="w-full text-center bg-[#f08804] hover:bg-[#eb9a27] text-[#131921] font-bold py-2 rounded-md transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <LogIn size={20} /> Iniciar Sesión
              </Link>

              <Link
                to="/register"
                onClick={handleLinkClick}
                className="w-full text-center mt-2 text-sm text-[#1C2E82] hover:text-[#2d4bc7] flex items-center justify-center gap-1"
              >
                <UserPlus size={16} /> Crear una cuenta
              </Link>
            </div>
          ) : (
            // ESTADO LOGUEADO (MEJORADO)
            <>
              <h3 className="text-lg font-extrabold text-[#131921] mb-4 border-b pb-2">
                ¡Bienvenido, {userName.split(' ')[0]}!
              </h3>
              <div className="flex justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">
                    Tu Cuenta
                  </h4>
                  <ul className="space-y-2">
                    <LinkItem to="/mi-cuenta" onClick={handleLinkClick} Icon={User}>
                      Mi Perfil
                    </LinkItem>
                    <LinkItem to="/listas/crear" onClick={handleLinkClick} Icon={List}>
                      Mis Listas de Deseos
                    </LinkItem>
                  </ul>
                </div>

                <div className="w-px bg-gray-200"></div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wider">
                    Pedidos y Acciones
                  </h4>
                  <ul className="space-y-2">
                    <LinkItem to="/pedidos" onClick={handleLinkClick} Icon={Truck}>
                      Historial de Pedidos
                    </LinkItem>
                    <li className="text-sm">
                      <button
                        onClick={handleLogout}
                        className="text-red-600 hover:text-red-800 transition-colors flex items-center gap-3 py-1 w-full text-left font-medium hover:bg-red-50 rounded-md px-2 -mx-2"
                      >
                        <Power size={18} className="text-red-500" />
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

const LinkItem = ({ to, onClick, Icon, children }) => (
  <li className="text-sm group">
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-700 hover:text-[#f08804] transition-colors flex items-center gap-3 py-1 font-medium hover:bg-gray-100 rounded-md px-2 -mx-2"
    >
      <Icon
        size={18}
        className="text-gray-500 group-hover:text-[#f08804] transition-colors"
      />
      {children}
    </Link>
  </li>
);

export default UserDropdown;