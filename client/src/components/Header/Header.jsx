import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import Logo from '../../assets/images/logoc.jpg';

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
      <div className="max-w-7xl mx-auto px-6 py-1">
        <div className="flex justify-between items-center">
          {/* Logo - Usa Link para navegar */}
          <Link
            to="/"
            className="flex items-center group cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={Logo}
                  alt="Flucsa Logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="ml-4">
              <span className="font-['Archivo'] font-black text-3xl text-white tracking-tight drop-shadow-lg">
                FLUCSA
              </span>
              <div className="mt-1">
                <span className="font-['Archivo'] font-bold text-xs text-white/90 uppercase tracking-wider">
                  SOLUCIONES A TU MEDIDA
                </span>
              </div>
            </div>
          </Link>

          {/* Menú de navegación, búsqueda y carrito - Desktop */}
          <div className="hidden lg:flex items-center space-x-10 text-lg">
            {/* Aquí se renderiza la navegación */}
            <Navigation /> 
            <div className="h-6 w-px bg-white/30"></div>
            <Search />
            
            {/* Botón del carrito con animaciones mejoradas */}
            <button
              onClick={onCartToggle}
              className={`relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                isCartAnimating ? 'animate-bounce scale-110' : ''
              }`}
            >
              {/* Efecto de pulso cuando se añade producto */}
              {isCartAnimating && (
                <>
                  <div className="absolute inset-0 bg-green-400/30 rounded-xl animate-ping"></div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-xl animate-pulse"></div>
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
          <div className="flex lg:hidden items-center space-x-4">
            <div className="hidden md:block">
              <Search />
            </div>
            
            {/* Botón del carrito móvil con animaciones */}
            <button
              onClick={onCartToggle}
              className={`relative p-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 ${
                isCartAnimating ? 'animate-bounce scale-110' : ''
              }`}
            >
              {/* Efecto de pulso cuando se añade producto */}
              {isCartAnimating && (
                <>
                  <div className="absolute inset-0 bg-green-400/30 rounded-xl animate-ping"></div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-xl animate-pulse"></div>
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
              className="relative w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-[#ED0000] transition-all duration-300 hover:scale-105"
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
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="md:hidden mb-6">
              <Search />
            </div>
            {/* Aquí se renderiza la navegación del menú móvil */}
            <Navigation isMobile={true} /> 
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 text-white/80 text-sm">
                <span>📞 +123 456 7890</span>
                <span>✉️ info@flucsa.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#ED0000]"></div>
    </header>
  );
};

export default Header;