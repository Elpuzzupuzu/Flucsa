import React, { useState } from 'react';

import Search from './Search/Search';
import Navigation from '../Navigation/Navigation';
import { Menu } from 'lucide-react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white px-8 py-5 flex justify-between items-center relative z-20 shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-extrabold text-2xl text-blue-600">Flucsa</span>
        <span className="w-2 h-2 bg-red-500 rounded-full ml-1"></span>
      </div>

      {/* Menú de navegación y búsqueda */}
      <div className="hidden md:flex items-center space-x-8">
        <Navigation isMobile={false} />
        <Search />
      </div>

      {/* Menú para móviles */}
      <div className="flex md:hidden items-center">
        <Search />
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-4 text-gray-700 hover:text-blue-600 transition-colors">
          <Menu size={24} />
        </button>
      </div>

      {/* Navegación desplegable para móviles */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 md:hidden">
          <Navigation isMobile={true} />
        </div>
      )}
    </header>
  );
};

export default Header;