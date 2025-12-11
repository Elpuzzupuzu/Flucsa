import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, clearSearchResults } from "../../../features/products/productsSlice";
import { SearchIcon, X } from "lucide-react";
import debounce from "lodash.debounce";

const Search = ({ onProductSelect }) => {
  const dispatch = useDispatch();
  const { searchResults, searchLoading } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Limpiar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce para búsqueda
  const debouncedSearch = useRef(
    debounce((value) => {
      if (value.trim() === "") {
        dispatch(clearSearchResults());
      } else {
        dispatch(searchProducts(value));
      }
    }, 300)
  ).current;

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    dispatch(clearSearchResults());
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm));
      setIsFocused(true);
    }
  };

  const handleProductClick = (product) => {
    setIsFocused(false);
    if (onProductSelect) {
      onProductSelect(product); // <-- Llama al modal para agregar producto
    }
    setSearchTerm("");
    dispatch(clearSearchResults());
  };

  return (
    <div className="relative w-full px-4 py-2.5" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
          className="w-full py-2 pl-4 pr-16 rounded-full text-sm outline-none bg-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        )}
        
        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-[#febd69] hover:bg-[#f3a847] text-[#131921] transition-colors"
        >
          <SearchIcon size={20} />
        </button>
      </div>

      {isFocused && searchTerm && searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {searchLoading ? (
            <div className="p-2 text-sm text-gray-500">Buscando...</div>
          ) : (
            searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-10 h-10 object-cover rounded-sm"
                  />
                )}
                <div className="flex flex-col">
                  <span className="text-sm">{product.nombre}</span>
                  {product.precio !== undefined && (
                    <span className="text-xs text-gray-500">${product.precio}</span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {isFocused && searchTerm && !searchLoading && searchResults.length === 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 text-sm text-gray-500">
          No se encontraron productos.
        </div>
      )}
      
      {isFocused && searchTerm && searchLoading && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 text-sm text-gray-500">
          Buscando...
        </div>
      )}
    </div>
  );
};

export default Search;
