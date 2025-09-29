import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import LogoCompleto from '../../assets/images/flucsa2.jpg';

const Header = ({ cartItems, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);

  const totalCartItems = cartItems
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Detectar animación carrito
  useEffect(() => {
    if (totalCartItems > previousCartCount) {
      setIsCartAnimating(true);
      setShowAddedBadge(true);

      setTimeout(() => setIsCartAnimating(false), 600);
      setTimeout(() => setShowAddedBadge(false), 1500);
    }
    setPreviousCartCount(totalCartItems);
  }, [totalCartItems, previousCartCount]);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-gradient-to-r from-[#1C2E82] via-[#2147b8] to-[#2d4bc7] shadow-2xl border-b-2 border-white/20 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 relative z-10 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl bg-white/5 p-2 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300">
              <img
                src={LogoCompleto}
                alt="FLUCSA"
                className="h-14 w-auto object-contain transition-all duration-500 group-hover:brightness-110 group-hover:contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          </Link>

          {/* Desktop nav + search + cart */}
          <div className="hidden lg:flex items-center space-x-8">
            <Navigation />
            <div className="bg-white/5 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <Search />
            </div>
            <button
              onClick={onCartToggle}
              className={`relative group p-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-2xl border-2 border-white/20 text-white hover:border-white/40 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isCartAnimating ? 'animate-bounce scale-110 border-green-400/50' : ''
              }`}
            >
              {isCartAnimating && (
                <>
                  <div className="absolute inset-0 bg-green-400/20 rounded-2xl animate-ping"></div>
                  <div className="absolute inset-0 bg-green-400/10 rounded-2xl animate-pulse"></div>
                </>
              )}
              <ShoppingCart
                className={`w-5 h-5 relative z-10 ${
                  isCartAnimating ? 'text-green-300' : 'text-white'
                }`}
              />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white/20">
                  {totalCartItems}
                </span>
              )}
              {showAddedBadge && (
                <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce shadow-lg border border-white/30">
                  +
                </span>
              )}
            </button>
          </div>

          {/* Mobile icons */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="hidden sm:block">
              <div className="bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
                <Search />
              </div>
            </div>

            <button
              onClick={onCartToggle}
              className="relative p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg border border-white/20">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Botón abrir menú móvil */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md rounded-xl border border-white/20 text-white hover:border-white/40 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay - PORTAL COMPLETAMENTE SEPARADO */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] w-72 max-w-[85vw] shadow-2xl overflow-y-auto">
            {/* Header del menú */}
            <div className="sticky top-0 bg-gradient-to-r from-[#1C2E82] to-[#2147b8] p-4 flex items-center justify-between border-b border-white/10 z-10">
              <span className="text-white font-semibold text-lg">Menú</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido del menú */}
            <div className="p-5">
              <Navigation isMobile={true} onLinkClick={() => setIsMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;