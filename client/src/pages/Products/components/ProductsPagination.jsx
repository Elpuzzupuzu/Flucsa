// components/ProductsPagination.jsx
import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProductsPagination.css"; // Importamos CSS

const ProductsPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        if (l) {
          if (i - l === 2) rangeWithDots.push(l + 1);
          else if (i - l > 2) rangeWithDots.push("...");
        }
        rangeWithDots.push(i);
        l = i;
      }
    }
    return rangeWithDots;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="pagination-container">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      {/* Números de página */}
      <div className="pagination-numbers">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`pagination-page ${
              page === currentPage ? "active" : page === "..." ? "dots" : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ProductsPagination;
