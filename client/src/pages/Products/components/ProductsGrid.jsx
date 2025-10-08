// components/ProductsGrid.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductsGrid = ({ products, viewMode, addToCart }) => {
  return (
    <div className="relative">
      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-red-100 to-red-50 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full blur-3xl opacity-30 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-100 to-pink-50 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Grid Container */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12 relative z-10" // gap reducido
            : "space-y-6 mb-12 relative z-10"
        }
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-500 hover:scale-[1.02] scale-[0.85]" // Escala un poco mayor para no verse demasiado pequeñas
            style={{
              animation: 'fadeInUp 0.6s ease-out forwards',
              animationDelay: `${index * 75}ms`,
              opacity: 0
            }}
          >
            <ProductCard
              product={{
                ...product,
                name: product.nombre,
                price: product.precio ? `$${product.precio}` : "N/A",
                description: product.descripcion || "Sin descripción",
                image: product.imagen || "https://via.placeholder.com/200",
              }}
              viewMode={viewMode}
              onAddToCart={addToCart}
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .grid {
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductsGrid;
