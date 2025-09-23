import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
// Importar una imagen de alta resolución del logo completo
import LogoCompleto from '../../assets/images/flucsa2.jpg'; // Cambia esta ruta por la imagen correcta

const Header = ({ cartItems, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);

  const totalCartItems = cartItems ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;

  // Detectar cuando se añade un producto al carrito
  useEffect(() => {
    if (totalCartItems > previousCartCount) {
      // Se añadió un producto
      setIsCartAnimating(true);
      setShowAddedBadge(true);
      
      // Quitar la animación después de 600ms
      setTimeout(() => {
        setIsCartAnimating(false);
      }, 600);
      
      // Quitar el badge "+" después de 1.5s
      setTimeout(() => {
        setShowAddedBadge(false);
      }, 1500);
    }
    setPreviousCartCount(totalCartItems);
  }, [totalCartItems, previousCartCount]);

  return (
    <header className="sticky top-0 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] shadow-xl border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* LÍNEA MODIFICADA: Ahora usa justify-start y un espacio entre elementos */}
        <div className="flex justify-start items-center space-x-12">
          {/* Logo Completo - Versión mejorada */}
          <Link
            to="/"
            className="flex items-center group cursor-pointer transition-all duration-300 hover:scale-[1.02] flex-shrink-0"
          >
            {/* Opción 1: Usar imagen completa del logo */}
            <div className="relative">
              <img
                src={LogoCompleto}
                alt="FLUCSA - Soluciones a tu medida"
                className="h-20 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
            
          </Link>

          {/* Menú de navegación, búsqueda y carrito - Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-base">
            {/* Navegación */}
            <Navigation /> 
            
            {/* Separador */}
            <div className="h-6 w-px bg-white/30"></div>
            
            {/* Búsqueda */}
            <Search />
            
            {/* Botón del carrito con animaciones mejoradas */}
            <button
              onClick={onCartToggle}
              className={`relative p-2.5 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                isCartAnimating ? 'animate-bounce scale-110' : ''
              }`}
            >
              {/* Efecto de pulso cuando se añade producto */}
              {isCartAnimating && (
                <>
                  <div className="absolute inset-0 bg-green-400/30 rounded-lg animate-ping"></div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-pulse"></div>
                </>
              )}
              
              <ShoppingCartIcon 
                className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                  isCartAnimating ? 'text-green-300' : ''
                }`} 
              />
              
              {/* Badge del contador principal */}
              {totalCartItems > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium transition-all duration-300 ${
                  isCartAnimating ? 'animate-pulse scale-125 bg-green-500' : ''
                }`}>
                  {totalCartItems}
                </span>
              )}
              
              {/* Badge temporal "+" cuando se añade producto */}
              {showAddedBadge && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce">
                  +
                </span>
              )}
              
              {/* Partículas de celebración */}
              {isCartAnimating && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0ms'}}></div>
                  <div className="absolute top-0 right-0 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{animationDelay: '100ms'}}></div>
                  <div className="absolute bottom-0 left-0 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
                  <div className="absolute bottom-0 right-0 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '300ms'}}></div>
                </div>
              )}
            </button>
          </div>

          {/* Búsqueda, carrito y menú - Tablet/Mobile */}
          <div className="flex lg:hidden items-center space-x-3">
            <div className="hidden md:block">
              <Search />
            </div>
            
            {/* Botón del carrito móvil con animaciones */}
            <button
              onClick={onCartToggle}
              className={`relative p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                isCartAnimating ? 'animate-bounce scale-110' : ''
              }`}
            >
              {/* Efecto de pulso cuando se añade producto */}
              {isCartAnimating && (
                <>
                  <div className="absolute inset-0 bg-green-400/30 rounded-lg animate-ping"></div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-lg animate-pulse"></div>
                </>
              )}
              
              <ShoppingCartIcon 
                className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                  isCartAnimating ? 'text-green-300' : ''
                }`} 
              />
              
              {/* Badge del contador principal */}
              {totalCartItems > 0 && (
                <span className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium text-[10px] transition-all duration-300 ${
                  isCartAnimating ? 'animate-pulse scale-125 bg-green-500' : ''
                }`}>
                  {totalCartItems}
                </span>
              )}
              
              {/* Badge temporal "+" cuando se añade producto */}
              {showAddedBadge && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center font-bold animate-bounce text-[8px]">
                  +
                </span>
              )}
              
              {/* Partículas de celebración (versión móvil más pequeña) */}
              {isCartAnimating && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0ms'}}></div>
                  <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-green-300 rounded-full animate-ping" style={{animationDelay: '100ms'}}></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-0.5 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
                  <div className="absolute bottom-0 right-0 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '300ms'}}></div>
                </div>
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-[#ED0000] transition-all duration-300 hover:scale-105"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`}
                />
                <X
                  size={20}
                  className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`}
                />
              </div>
            </button>
          </div>
        </div>
        
        {/* Navegación desplegable para móviles */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 shadow-2xl">
            <div className="md:hidden mb-4">
              <Search />
            </div>
            {/* Aquí se renderiza la navegación del menú móvil */}
            <Navigation isMobile={true} /> 
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 text-white/80 text-sm">
                <span>📞 +123 456 7890</span>
                <span>✉️ info@flucsa.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea decorativa roja */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#ED0000]"></div>
    </header>
  );
};

export default Header;