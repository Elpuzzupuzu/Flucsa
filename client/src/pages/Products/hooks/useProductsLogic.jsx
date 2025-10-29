// hooks/useProductsLogic.js
import { useState, useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productsSlice";

export const useProductsLogic = () => {
    const dispatch = useDispatch();
    // 🎯 Obtenemos los productos paginados/filtrados y el total del Redux store
    const { items: products, total, loading, error, limit: reduxLimit } = useSelector((s) => s.products);

    // Estados locales (sincronizados con la API)
    const [currentPage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPageState] = useState(14); 
    
    // Otros estados
    const [viewMode, setViewMode] = useState("grid");
    const [searchTerm, setSearchTermState] = useState("");
    const [sortBy, setSortBy] = useState("name"); 
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    // 🎯 Filtros: Usamos la estructura ajustada (mainCategoryId)
    const [filters, setFiltersState] = useState({ mainCategoryId: null, priceRange: "" });

    // =========================================================================
    // LÓGICA UNIFICADA DE LLAMADA A LA API
    // =========================================================================

    const loadProducts = useCallback((page, currentFilters, currentSearch, currentItemsPerPage) => {
        // Parsear priceRange a minPrice/maxPrice (preparado para el backend)
        const [minStr, maxStr] = currentFilters.priceRange.split('-');
        const minPrice = minStr ? parseFloat(minStr) : undefined;
        const maxPrice = maxStr && maxStr !== '+' ? parseFloat(maxStr) : undefined;

        // Disparar la acción con TODOS los parámetros
        dispatch(fetchProducts({
            page: page,
            limit: currentItemsPerPage, 
            mainCategoryId: currentFilters.mainCategoryId, // Filtro de categoría
            searchQuery: currentSearch, // Búsqueda de texto
            minPrice: minPrice, // Filtro de precio (mínimo)
            maxPrice: maxPrice, // Filtro de precio (máximo)
            // Agrega 'sortBy' aquí si el backend soporta ordenamiento
        }));
    }, [dispatch]);


    // =========================================================================
    // WRAPPERS DE INTERACCIÓN (Disparan la carga y cambian la página)
    // =========================================================================

    // 1. Manejo del cambio de PÁGINA (mantiene filtros)
    const handleSetCurrentPage = (page) => {
        setPage(page);
        // Llama a la API manteniendo el estado de filtros y búsqueda
        loadProducts(page, filters, searchTerm, itemsPerPage);
    };

    // 2. Manejo de la BÚSQUEDA (resetea página)
    const handleSetSearchTerm = (term) => {
        setPage(1); // Resetear a la página 1
        setSearchTermState(term);
        // Llama a la API con la nueva búsqueda
        loadProducts(1, filters, term, itemsPerPage);
    };

    // 3. Manejo de FILTROS (resetea página)
    const handleSetFilters = (newFilters) => {
        setPage(1); // Resetear a la página 1
        setFiltersState(newFilters); 
        // Llama a la API con los nuevos filtros
        loadProducts(1, newFilters, searchTerm, itemsPerPage);
    };
    
    // 4. Manejo de Items por página (resetea página)
    const handleSetItemsPerPage = (limit) => {
        setPage(1); // Resetear a la página 1
        setItemsPerPageState(limit);
        loadProducts(1, filters, searchTerm, limit);
    };


    // =========================================================================
    // LÓGICA DE MONTAJE Y MEMORIZACIÓN
    // =========================================================================

    // Carga inicial al montar el componente
    useEffect(() => {
        loadProducts(currentPage, filters, searchTerm, itemsPerPage);
    }, [loadProducts]);


    // La ordenación por FE (Front-End) sigue siendo necesaria si la API no ordena
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) =>
            sortBy === "price"
                ? (a.precio || 0) - (b.precio || 0)
                : a.nombre.localeCompare(b.nombre)
        );
    }, [products, sortBy]);

    // totalPages usando el total real del slice
    const totalPages = Math.ceil(total / itemsPerPage);
    const currentProducts = sortedProducts; // Los productos actuales ya están paginados/filtrados por el backend

    const availableCategories = useMemo(() => {
        // En un entorno de producción, esto debería cargarse desde una API separada.
        // Aquí se devuelve una lista vacía para evitar la lógica de FE obsoleta.
        return []; 
    }, []);

    // Calcula cuántos filtros están activos (Categoría o Rango de Precio)
    const getFilterCount = () => (filters.mainCategoryId ? 1 : 0) + (filters.priceRange ? 1 : 0);

    return {
        products,
        loading,
        error,
        currentProducts,
        totalPages,
        currentPage,
        setCurrentPage: handleSetCurrentPage, // 👈 Función que dispara la carga con filtros
        viewMode,
        setViewMode,
        searchTerm,
        setSearchTerm: handleSetSearchTerm, // 👈 Función que resetea la página y carga
        sortBy,
        setSortBy,
        itemsPerPage,
        setItemsPerPage: handleSetItemsPerPage, // 👈 Función que resetea la página y carga
        sidebarOpen,
        setSidebarOpen,
        filters,
        setFilters: handleSetFilters, // 👈 Función que resetea la página y carga
        availableCategories,
        sortedProducts,
        getFilterCount
    };
};