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
  const [headerHeight, setHeaderHeight] = useState(0);

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

  // Calcular la altura del header para el offset del contenido
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.getElementById('main-header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
        // Aplicar CSS custom property para usar en otros componentes
        document.documentElement.style.setProperty('--header-height', `${headerElement.offsetHeight}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, [isMenuOpen]); // Re-calcular cuando se abre/cierra el menú

  return (
    <>
      <header 
        id="main-header"
        className="sticky top-0 bg-gradient-to-r from-[#1C2E82] via-[#2147b8] to-[#2d4bc7] shadow-2xl border-b-2 border-white/20 z-50 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(135deg, #1C2E82 0%, #2147b8 50%, #2d4bc7 100%)',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Overlay sutil para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-2 relative z-10">
          <div className="flex items-center justify-between lg:justify-start lg:space-x-16">
            {/* Logo Completo - Versión mejorada con más efectos */}
            <Link
              to="/"
              className="flex items-center group cursor-pointer transition-all duration-500 hover:scale-[1.03] flex-shrink-0 relative"
            >
              <div className="relative overflow-hidden rounded-xl bg-white/5 p-2 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300">
                <img
                  src={LogoCompleto}
                  alt="FLUCSA - Soluciones a tu medida"
                  className="h-14 lg:h-18 w-auto object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
                />
                {/* Brillo animado en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </Link>

            {/* Menú de navegación, búsqueda y carrito - Desktop */}
            <div className="hidden lg:flex items-center space-x-8 text-base">
              {/* Navegación con contenedor mejorado */}
              <div className="bg-white/5 rounded-full px-6 py-2 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <Navigation /> 
              </div>
              
              {/* Separador estilizado */}
              <div className="flex flex-col items-center space-y-1">
                <div className="h-4 w-px bg-gradient-to-b from-white/50 to-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="h-4 w-px bg-gradient-to-t from-white/50 to-white/10"></div>
              </div>
              
              {/* Búsqueda con contenedor */}
              <div className="bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <Search />
              </div>
              
              {/* Botón del carrito con diseño premium */}
              <button
                onClick={onCartToggle}
                className={`relative group p-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border-2 border-white/20 text-white hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  isCartAnimating ? 'animate-bounce scale-110 border-green-400/50' : ''
                }`}
                style={{
                  boxShadow: isCartAnimating 
                    ? '0 0 30px rgba(34, 197, 94, 0.3), 0 10px 25px rgba(0, 0, 0, 0.2)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Efectos de fondo animados */}
                {isCartAnimating && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl animate-ping"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-2xl animate-pulse"></div>
                  </>
                )}
                
                {/* Brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <ShoppingCartIcon 
                  className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                    isCartAnimating ? 'text-green-300' : 'group-hover:text-blue-200'
                  }`} 
                />
                
                {/* Badge del contador principal con mejor diseño */}
                {totalCartItems > 0 && (
                  <span className={`absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white/20 transition-all duration-300 ${
                    isCartAnimating ? 'animate-pulse scale-125 from-green-500 to-green-600' : ''
                  }`}>
                    {totalCartItems}
                  </span>
                )}
                
                {/* Badge temporal "+" mejorado */}
                {showAddedBadge && (
                  <span className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce shadow-lg border border-white/30">
                    +
                  </span>
                )}
                
                {/* Partículas de celebración mejoradas */}
                {isCartAnimating && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping shadow-lg" style={{animationDelay: '0ms'}}></div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full animate-ping shadow-lg" style={{animationDelay: '150ms'}}></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-300 rounded-full animate-ping shadow-lg" style={{animationDelay: '300ms'}}></div>
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-300 rounded-full animate-ping shadow-lg" style={{animationDelay: '450ms'}}></div>
                  </div>
                )}
              </button>
            </div>

            {/* Búsqueda, carrito y menú - Tablet/Mobile mejorado */}
            <div className="flex lg:hidden items-center space-x-2 flex-shrink-0">
              <div className="hidden sm:block flex-shrink-0">
                <div className="bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                  <Search />
                </div>
              </div>
              
              {/* Botón del carrito móvil mejorado */}
              <button
                onClick={onCartToggle}
                className={`relative group p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300 hover:scale-105 flex-shrink-0 ${
                  isCartAnimating ? 'animate-bounce scale-110 border-green-400/50' : ''
                }`}
                style={{
                  boxShadow: isCartAnimating 
                    ? '0 0 20px rgba(34, 197, 94, 0.3)' 
                    : '0 4px 15px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Efectos de fondo animados */}
                {isCartAnimating && (
                  <>
                    <div className="absolute inset-0 bg-green-400/20 rounded-xl animate-ping"></div>
                    <div className="absolute inset-0 bg-green-400/10 rounded-xl animate-pulse"></div>
                  </>
                )}
                
                <ShoppingCartIcon 
                  className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                    isCartAnimating ? 'text-green-300' : 'group-hover:text-blue-200'
                  }`} 
                />
                
                {/* Badge del contador mejorado para móvil */}
                {totalCartItems > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px] shadow-lg border border-white/20 transition-all duration-300 ${
                    isCartAnimating ? 'animate-pulse scale-125 from-green-500 to-green-600' : ''
                  }`}>
                    {totalCartItems}
                  </span>
                )}
                
                {/* Badge temporal "+" para móvil */}
                {showAddedBadge && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce text-[8px] shadow-lg">
                    +
                  </span>
                )}
                
                {/* Partículas móviles */}
                {isCartAnimating && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0ms'}}></div>
                    <div className="absolute top-0 right-0 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{animationDelay: '100ms'}}></div>
                    <div className="absolute bottom-0 left-0 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{animationDelay: '300ms'}}></div>
                  </div>
                )}
              </button>
              
              {/* Botón de menú mejorado */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative group w-12 h-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white hover:border-white/40 hover:border-[#ED0000]/50 transition-all duration-300 hover:scale-105 flex-shrink-0"
                aria-label="Toggle menu"
                style={{
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative w-5 h-5">
                  <Menu
                    size={18}
                    className={`absolute inset-0 transition-all duration-500 ${isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
                  />
                  <X
                    size={18}
                    className={`absolute inset-0 transition-all duration-500 ${isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'}`}
                  />
                </div>
              </button>
            </div>
          </div>
          
          {/* Navegación desplegable para móviles mejorada */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div 
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl relative overflow-hidden"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Efecto de brillo de fondo */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              
              <div className="sm:hidden mb-6">
                <div className="bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                  <Search />
                </div>
              </div>
              
              {/* Aquí se renderiza la navegación del menú móvil */}
              <Navigation isMobile={true} onLinkClick={() => setIsMenuOpen(false)} /> 
              
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-center space-x-4 text-white/80 text-sm">
                  {/* Espacio para contenido adicional si es necesario */}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Línea decorativa roja mejorada con gradiente */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ED0000] to-transparent"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #ED0000 20%, #ff1a1a 50%, #ED0000 80%, transparent 100%)',
            boxShadow: '0 0 10px rgba(237, 0, 0, 0.5)'
          }}
        ></div>
        
        {/* Efecto de brillo superior */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </header>

      {/* Spacer invisible para compensar el header sticky */}
      <div 
        className="block lg:hidden transition-all duration-500"
        style={{ height: isMenuOpen ? `${headerHeight}px` : '0px' }}
      />
    </>
  );
};

export default Header;