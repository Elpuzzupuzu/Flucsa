// hooks/useProductsLogic.js
import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../features/products/productsSlice";

export const useProductsLogic = () => {
  const dispatch = useDispatch();
  const { items: products, total, loading, error } = useSelector((s) => s.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(14);  // ESTO SE ENCARGA DE LA CARGA INICIAL DEL GRID EN PRODUCTS 
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ categories: [], priceRange: "" });

  // Fetch productos al cargar o al cambiar página/itemsPerPage
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const availableCategories = useMemo(() => {
    const cats = products.map(p => p.categoria_principal_nombre || p.categoria || "");
    return Array.from(new Set(cats)).filter(Boolean);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch =
        p.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat =
        filters.categories.length === 0 ||
        filters.categories.some(cat =>
          (p.categoria_principal_nombre || p.categoria || "")
            .toLowerCase()
            .includes(cat.toLowerCase())
        );
      let matchPrice = true;
      if (filters.priceRange) {
        const price = parseFloat(p.precio) || 0;
        if (filters.priceRange === "0-50") matchPrice = price < 50;
        else if (filters.priceRange === "50-100") matchPrice = price >= 50 && price <= 100;
        else if (filters.priceRange === "100-300") matchPrice = price > 100 && price <= 300;
        else if (filters.priceRange === "300+") matchPrice = price > 300;
      }
      return matchSearch && matchCat && matchPrice;
    });
  }, [products, searchTerm, filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) =>
      sortBy === "price"
        ? (a.precio || 0) - (b.precio || 0)
        : a.nombre.localeCompare(b.nombre)
    );
  }, [filteredProducts, sortBy]);

  // totalPages usando el total real del slice
  const totalPages = Math.ceil(total / itemsPerPage);
  const currentProducts = sortedProducts; // ya son los productos de la página actual

  const getFilterCount = () => filters.categories.length + (filters.priceRange ? 1 : 0);

  return {
    products,
    loading,
    error,
    currentProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    itemsPerPage,
    setItemsPerPage,
    sidebarOpen,
    setSidebarOpen,
    filters,
    setFilters,
    availableCategories,
    sortedProducts,
    getFilterCount
  };
};
