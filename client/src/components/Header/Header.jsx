import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, MapPin, Menu } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../features/user/usersSlice';

import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import LogoCompleto from '../../assets/images/flucsa2.jpg';
import UserDropdown from './Search/userDropdown';

const Header = ({ onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [previousCartCount, setPreviousCartCount] = useState(0);
  const [showAddedBadge, setShowAddedBadge] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const rol = useSelector((state) => state.user.user?.rol);
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  // ⚡ Estado local sincronizado para evitar "Usuario" al F5
  const [userNameState, setUserNameState] = useState('Usuario');
  const [userProfileState, setUserProfileState] = useState(undefined);
  const [isLoggedInState, setIsLoggedInState] = useState(!!user);

  useEffect(() => {
    setUserNameState(user?.name || user?.nombre || user?.correo || user?.email || 'Usuario');
    setUserProfileState(user?.foto_perfil);
    setIsLoggedInState(!!user);

    console.log('[Header] Estado de usuario actualizado:', {
      userName: user?.name,
      profilePicture: user?.foto_perfil,
      isLoggedIn: !!user
    });
  }, [user]);

  const handleLogout = () => dispatch(logoutUser());

  // Animación al agregar productos
  useEffect(() => {
    if (totalCartItems > previousCartCount) {
      setIsCartAnimating(true);
      setShowAddedBadge(true);

      setTimeout(() => setIsCartAnimating(false), 600);
      setTimeout(() => setShowAddedBadge(false), 1500);
    }
    setPreviousCartCount(totalCartItems);
  }, [totalCartItems, previousCartCount]);

  // Bloqueo scroll al abrir menú móvil
  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 bg-[#131921] shadow-lg z-50">
        <div className="bg-gradient-to-r from-[#1C2E82] via-[#2147b8] to-[#2d4bc7]">
          <div className="max-w-[1500px] mx-auto px-4 py-2 flex items-center gap-4">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-white/5 p-2 backdrop-blur-md border border-white/15 transition-all duration-300 hover:border-white/25 hover:bg-white/10">
                <img
                  src={LogoCompleto}
                  alt="FLUCSA"
                  className="h-12 w-auto object-contain transition-all duration-500 group-hover:brightness-125"
                />
              </div>
            </Link>

            {/* Ubicación */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/20">
              <MapPin className="w-5 h-5 text-white" />
              <div className="flex flex-col">
                <span className="text-xs text-white/70">Enviar a</span>
                <span className="text-sm font-semibold text-white">Mérida, Yucatán</span>
              </div>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-3xl">
              <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Search />
              </div>
            </div>

            {/* Right section */}
            <div className="hidden lg:flex items-center gap-2">

              <UserDropdown
                userName={userNameState}
                isLoggedIn={isLoggedInState}
                onLogout={handleLogout}
                rol={rol}
                profilePicture={userProfileState}
              />

              <div className="px-3 py-2 rounded-md hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/20">
                <div className="flex flex-col">
                  <span className="text-xs text-white/70">Mis</span>
                  <span className="text-sm font-semibold text-white">Pedidos</span>
                </div>
              </div>

              {/* Cart */}
              <button
                onClick={onCartToggle}
                className={`relative group px-3 py-2 rounded-md hover:bg-white/10 transition-all border border-transparent flex items-center gap-2 ${
                  isCartAnimating ? 'animate-bounce border-green-400/50 bg-green-500/10' : ''
                }`}
              >
                {isCartAnimating && (
                  <div className="absolute inset-0 bg-green-400/20 rounded-md animate-ping"></div>
                )}
                <div className="relative">
                  <ShoppingCart
                    className={`w-8 h-8 relative z-10 transition-all ${
                      isCartAnimating ? 'text-green-300' : 'text-white'
                    }`}
                  />
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#f08804] text-[#131921] text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg text-[11px]">
                      {totalCartItems}
                    </span>
                  )}
                  {showAddedBadge && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce shadow-lg border border-white/30">
                      +
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-white/70">Carrito</span>
                  <span className="text-sm font-semibold text-white">
                    {totalCartItems > 0 ? `${totalCartItems} items` : '0'}
                  </span>
                </div>
              </button>
            </div>

            {/* Mobile Icons */}
            <div className="flex lg:hidden items-center gap-2 ml-auto">
              <button onClick={onCartToggle} className="relative p-2 rounded-md hover:bg-white/10 transition-all">
                <ShoppingCart className="w-6 h-6 text-white" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#f08804] text-[#131921] text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {totalCartItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-md hover:bg-white/10 transition-all"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:block bg-[#232F3E] border-t border-white/10">
          <div className="max-w-[1500px] mx-auto px-4">
            <Navigation rol={rol} />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden bg-gradient-to-r from-[#1C2E82] via-[#2147b8] to-[#2d4bc7] px-4 pb-2">
          <div className="bg-white rounded-lg shadow-md">
            <Search />
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 bg-gradient-to-b from-[#1C2E82] to-[#2147b8] w-72 max-w-[85vw] shadow-2xl overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-[#1a2470] to-[#1C2E82] p-4 flex items-center justify-between border-b border-white/10 z-10">
              <span className="text-white font-semibold text-base">Menú</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-5">
              <Navigation
                isMobile
                onLinkClick={() => setIsMenuOpen(false)}
                isLoggedIn={isLoggedInState}
                onLogout={handleLogout}
                rol={rol}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
