import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log("Buscando productos con el término:", searchTerm);
    // Aquí es donde en el futuro implementarás la lógica para
    // llamar al backend, actualizar el estado de Redux, etc.
  };

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className="w-40 py-2 pl-4 pr-10 rounded-full text-sm outline-none bg-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button 
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-blue-600 transition-colors"
      >
        <SearchIcon size={20} />
      </button>
    </div>
  );
}

export default Search;