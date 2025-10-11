// components/ProductsGrid.jsx
import React from "react";
import AdminProductCard from "../products/AdminProductCard/AdminProductCard";

const AdminProductsGrid = ({ products, viewMode, addToCart, onProductClick }) => {
  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-100 to-red-50 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"></div>
      <div
        className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Grid Container */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 mb-12 relative z-10 auto-rows-max"
            : "space-y-6 mb-12 relative z-10"
        }
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-500 hover:scale-[1.02] w-full"
            style={{
              animation: "fadeInUp 0.6s ease-out forwards",
              animationDelay: `${index * 75}ms`,
              opacity: 0,
            }}
          >
            <AdminProductCard
              product={product}
              onClick={() => onProductClick(product)} // 👈 aquí conectamos el click
            />
          </div>
        ))}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          .grid {
            gap: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminProductsGrid;
