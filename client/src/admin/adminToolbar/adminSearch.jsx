import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// Nota: La ruta de importación de productsSlice puede necesitar ajuste según tu estructura final
import { searchProducts, clearSearchResults } from "../../features/products/productsSlice"; 
import { SearchIcon, X } from "lucide-react";
import debounce from "lodash.debounce";

// ⬅️ ACEPTA EL CALLBACK DEL PADRE (handleProductClick del ProductsPage)
const Search = ({ onAdminProductSelect }) => { 
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
    setIsFocused(false); 
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      dispatch(searchProducts(searchTerm));
      setIsFocused(true);
    }
  };

  // ✅ LÓGICA FINAL: Solo activa el callback del overlay
  const handleProductClick = (product) => {
    setIsFocused(false);
    setSearchTerm("");
    // 1. Llama a la función del padre para abrir el Overlay
    if (onAdminProductSelect) {
      onAdminProductSelect(product);
    }
    // 2. Limpiamos los resultados de búsqueda en Redux
    dispatch(clearSearchResults()); 
  };

  return (
    <div className="relative w-full py-0" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Buscar producto para editar..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
          className="w-full py-3 pl-4 pr-16 rounded-xl text-sm outline-none border border-gray-300 bg-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 transition-all shadow-inner"
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors z-10"
          >
            <X size={18} />
          </button>
        )}

        {/* Botón de búsqueda */}
        <button
          onClick={handleSearchClick}
          className="absolute right-0 top-0 bottom-0 px-4 rounded-r-xl bg-red-600 hover:bg-red-700 text-white transition-colors flex items-center justify-center shadow-md"
        >
          <SearchIcon size={20} />
        </button>
      </div>

      {/* Dropdown de Resultados */}
      {isFocused && searchTerm && (searchLoading || searchResults.length > 0) && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-red-300 rounded-lg shadow-2xl z-50 max-h-72 overflow-y-auto">
          {searchLoading ? (
            <div className="p-3 text-sm text-gray-500 flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
              Buscando productos...
            </div>
          ) : searchResults.length > 0 ? (
            searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product)} // LLAMA AL CALLBACK
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {product.imagen && (
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="w-10 h-10 object-cover rounded-md flex-shrink-0 border border-gray-200"
                  />
                )}
                <div className="flex flex-col truncate">
                  <span className="text-sm font-medium text-gray-800 truncate">{product.nombre}</span>
                  {product.precio !== undefined && (
                    <span className="text-xs text-gray-500">${product.precio}</span>
                  )}
                </div>
                <span className="ml-auto text-xs text-red-500 font-bold">EDITAR</span>
              </button>
            ))
          ) : (
            <div className="p-3 text-sm text-gray-500">
              No se encontraron productos que coincidan.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
