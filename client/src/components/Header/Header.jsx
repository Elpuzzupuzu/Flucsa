import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import Search from './Search/Search';
import Logo from '../../assets/images/logoc.jpg';

const Header = ({ setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-gradient-to-r from-[#1C2E82] to-[#2d4bc7] shadow-xl border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-6 py-1"> {/* Cambio aquí: de py-4 a py-3 */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center group cursor-pointer transition-all duration-300 hover:scale-105"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative flex-shrink-0">
              {/* Contenedor del logo con efectos - Aumentado a w-20 h-20 */}
              <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={Logo}
                  alt="Flucsa Logo"
                  className="w-12 h-12 object-contain rounded-lg" // Imagen del logo aumentada
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Texto del logo */}
            <div className="ml-4"> {/* Margen ajustado */}
              <span className="font-['Archivo'] font-black text-3xl text-white tracking-tight drop-shadow-lg"> {/* Tamaño de texto aumentado */}
                FLUCSA
              </span>
              <div className="mt-1">
                <span className="font-['Archivo'] font-bold text-xs text-white/90 uppercase tracking-wider">
                  SOLUCIONES A TU MEDIDA
                </span>
              </div>
            </div>
          </div>

          {/* Menú de navegación y búsqueda - Desktop */}
          <div className="hidden lg:flex items-center space-x-10 text-lg"> {/* space-x y text-lg añadidos */}
            <Navigation isMobile={false} setCurrentPage={setCurrentPage} />
            <div className="h-6 w-px bg-white/30"></div>
            <Search />
          </div>

          {/* Búsqueda y menú - Tablet/Mobile */}
          <div className="flex lg:hidden items-center space-x-4">
            <div className="hidden md:block">
              <Search />
            </div>
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
            <Navigation isMobile={true} setCurrentPage={setCurrentPage} />
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