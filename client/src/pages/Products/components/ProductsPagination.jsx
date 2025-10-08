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
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++)
      range.push(i);
    if (currentPage - delta > 2) rangeWithDots.push(1, "...");
    else rangeWithDots.push(1);
    rangeWithDots.push(...range);
    if (currentPage + delta < totalPages - 1) rangeWithDots.push("...", totalPages);
    else if (totalPages > 1) rangeWithDots.push(totalPages);
    return rangeWithDots;
  };

  // Al cambiar de página, desplazarse suavemente hacia arriba
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap bg-white p-4 rounded-2xl shadow-md border border-gray-100 animate-fadeInUp">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-2.5 text-gray-700 font-medium bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-[#2172B0] hover:to-[#2B21B0] hover:border-[#2B21B0] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm transform hover:scale-105"
      >
        <ChevronLeft className="w-4 h-4" /> Anterior
      </button>

      <div className="flex gap-1 flex-wrap justify-center">
        {getPageNumbers().map((page, idx) => (
          <button
            key={idx}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`min-w-[44px] px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-sm transform ${
              page === currentPage
                ? "bg-gradient-to-br from-[#2B21B0] to-[#2172B0] text-white shadow-lg scale-105"
                : page === "..."
                ? "text-gray-400 cursor-not-allowed bg-transparent"
                : "text-gray-700 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 hover:from-[#2172B0] hover:to-[#2B21B0] hover:border-[#2B21B0] hover:text-white hover:scale-105"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-2.5 text-gray-700 font-medium bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl hover:from-[#2172B0] hover:to-[#2B21B0] hover:border-[#2B21B0] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm transform hover:scale-105"
      >
        Siguiente <ChevronRight className="w-4 h-4" />
      </button>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductsPagination;
