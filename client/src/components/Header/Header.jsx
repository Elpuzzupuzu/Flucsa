import React from 'react';
import Search from './Search/Search';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  return (
    <header className="bg-white px-8 py-5 flex justify-between items-center relative z-20 shadow-sm">
      {/* Logo */}
      <div className="flex items-center">
        <span className="font-extrabold text-2xl text-blue-600">Flucsa</span>
        <span className="w-2 h-2 bg-red-500 rounded-full ml-1"></span>
      </div>

      {/* Enlaces de navegación y búsqueda */}
      <div className="flex items-center space-x-8">
        <Navigation/>
        <Search />
      </div>
    </header>
  );
}

export default Header;