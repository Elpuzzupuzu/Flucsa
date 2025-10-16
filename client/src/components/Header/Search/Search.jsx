import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, clearSearchResults } from "../../../features/products/productsSlice";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, X } from "lucide-react";
import debounce from "lodash.debounce";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(clearSearchResults()); // Limpiar el estado de Redux
    // Si el campo de búsqueda está en el móvil, puedes considerar unfocus/cerrar el dropdown también.
  };

  const handleSearchClick = () => {
    if (searchTerm.trim() !== "") {
      // Opcional: navegar a la página de resultados de búsqueda completa
      // navigate(`/search?q=${searchTerm}`); 
      // Por ahora, solo dispara la búsqueda y mantiene el foco para mostrar el dropdown
      dispatch(searchProducts(searchTerm));
      setIsFocused(true);
    }
  };

  const handleProductClick = (id) => {
    setIsFocused(false);
    navigate(`/productos/${id}`);
    // Opcional: Limpiar el campo de búsqueda después de navegar
    setSearchTerm("");
  };

  return (
    // CAMBIO IMPORTANTE: Quitamos el 'md:w-64' y añadimos el padding que antes estaba en el Header
    <div className="relative w-full px-4 py-2.5" ref={containerRef}>
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearchClick();
          }}
          // Ajuste del padding para el icono, ya que el botón de búsqueda está integrado
          className="w-full py-2 pl-4 pr-16 rounded-full text-sm outline-none bg-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
        />
        
        {searchTerm && (
          // Botón para limpiar el campo
          <button
            onClick={handleClear}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        )}
        
        {/* Botón de búsqueda (Integrado en el componente) */}
        <button
          onClick={handleSearchClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-[#febd69] hover:bg-[#f3a847] text-[#131921] transition-colors"
        >
          <SearchIcon size={20} />
        </button>
      </div>

      {/* Dropdown - CONDICIONAL DE RENDERIZADO (VERIFICADO) */}
      {isFocused && searchTerm && searchResults.length > 0 && ( // <--- Agregué 'searchResults.length > 0' para evitar mostrar el div vacío si no hay resultados ni carga.
        // El z-50 y position absolute son correctos.
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-72 overflow-y-auto">
          {searchLoading ? (
            <div className="p-2 text-sm text-gray-500">Buscando...</div>
          ) : (
            // NOTA: La lógica de 'No se encontraron productos' ahora debe ir fuera de este bloque
            // si quieres mostrarlo incluso cuando no haya resultados, pero manteniendo el condicional
            // del bloque principal, es mejor dejarlo como está.
            searchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => handleProductClick(product.id)}
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
      
      {/* Mensaje de no resultados o carga si hay foco y término, pero no hay resultados */}
      {isFocused && searchTerm && !searchLoading && searchResults.length === 0 && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 text-sm text-gray-500">
              No se encontraron productos.
          </div>
      )}
      
      {/* Mensaje de carga si hay foco y término */}
      {isFocused && searchTerm && searchLoading && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 text-sm text-gray-500">
              Buscando...
          </div>
      )}
    </div>
  );
};

export default Search;