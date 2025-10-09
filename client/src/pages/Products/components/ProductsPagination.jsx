import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductsPagination = ({ totalPages, currentPage, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
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
    <div className="flex items-center justify-center gap-3 flex-wrap bg-white px-6 py-5 rounded-2xl border border-gray-100 shadow-sm animate-fadeInUp">
      {/* Botón Anterior */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
          currentPage === 1
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:text-red-600 active:scale-95"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Anterior
      </button>

      {/* Números de página */}
      <div className="flex gap-1 flex-wrap justify-center">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`min-w-[40px] h-10 px-3 text-sm font-medium transition-all duration-300 ${
              page === currentPage
                ? "text-red-600 border-b-2 border-red-600"
                : page === "..."
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:text-red-600 hover:border-b-2 hover:border-red-600"
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
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 ${
          currentPage === totalPages
            ? "text-gray-300 cursor-not-allowed"
            : "text-gray-600 hover:text-red-600 active:scale-95"
        }`}
      >
        Siguiente
        <ChevronRight className="w-4 h-4" />
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductsPagination;