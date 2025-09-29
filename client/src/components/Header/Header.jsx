import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart as ShoppingCartIcon, Menu } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import LogoCompleto from '../../assets/images/flucsa2.jpg';

const Header = ({ cartItems, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const totalCartItems = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Detectar cambios en el carrito
  useEffect(() => {
    if (totalCartItems > previousCartCount) {
      setIsCartAnimating(true);
      setShowAddedBadge(true);
      setTimeout(() => setIsCartAnimating(false), 600);
      setTimeout(() => setShowAddedBadge(false), 1500);
    }
    setPreviousCartCount(totalCartItems);
  }, [totalCartItems, previousCartCount]);

  // Calcular altura del header
  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.getElementById('main-header');
      if (headerElement) {
        setHeaderHeight(headerElement.offsetHeight);
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerElement.offsetHeight}px`
        );
      }
    };
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <>
      <header
        id="main-header"
        className="sticky top-0 bg-gradient-to-r from-[#1C2E82] via-[#2147b8] to-[#2d4bc7] shadow-2xl border-b-2 border-white/20 z-50 backdrop-blur-sm"
        style={{
          background:
            'linear-gradient(135deg, #1C2E82 0%, #2147b8 50%, #2d4bc7 100%)',
          boxShadow:
            '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-2 sm:px-6 py-2 relative z-10">
          <div className="flex items-center justify-between lg:justify-start lg:space-x-16">
            {/* Logo */}
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
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </Link>

            {/* Desktop Navigation, Search, Cart */}
            <div className="hidden lg:flex items-center space-x-8 text-base">
              <div className="bg-white/5 rounded-full px-6 py-2 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <Navigation />
              </div>

              <div className="flex flex-col items-center space-y-1">
                <div className="h-4 w-px bg-gradient-to-b from-white/50 to-white/10"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="h-4 w-px bg-gradient-to-t from-white/50 to-white/10"></div>
              </div>

              <div className="bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                <Search />
              </div>

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
                <ShoppingCartIcon
                  className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                    isCartAnimating ? 'text-green-300' : 'group-hover:text-blue-200'
                  }`}
                />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white/20">
                    {totalCartItems}
                  </span>
                )}
                {showAddedBadge && (
                  <span className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce shadow-lg border border-white/30">
                    +
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden items-center space-x-2">
              <div className="hidden sm:block flex-shrink-0">
                <div className="bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                  <Search />
                </div>
              </div>

              <button
                onClick={onCartToggle}
                className={`relative group p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300 hover:scale-105 flex-shrink-0`}
              >
                <ShoppingCartIcon className="w-5 h-5 relative z-10" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold text-[10px] shadow-lg border border-white/20">
                    {totalCartItems}
                  </span>
                )}
              </button>

              {/* Botón menú móvil */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative group w-12 h-12 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-center text-white hover:border-white/40 hover:scale-105 flex-shrink-0"
              >
                <div className="relative w-5 h-5">
                  <Menu
                    size={18}
                    className={`absolute inset-0 transition-all duration-500 ${
                      isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <X
                    size={18}
                    className={`absolute inset-0 transition-all duration-500 ${
                      isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay lateral móvil */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Overlay oscuro */}
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Sidebar */}
            <div className="relative bg-[#1a1a1a] w-64 h-full p-5 z-50 shadow-lg animate-slide-in-left">
              <Navigation
                isMobile={true}
                onLinkClick={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </header>

      {/* Spacer para compensar header sticky */}
      <div
        className="block lg:hidden transition-all duration-500"
        style={{ height: isMenuOpen ? `${headerHeight}px` : '0px' }}
      />
    </>
  );
};

export default Header;
