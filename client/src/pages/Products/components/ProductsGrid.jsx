// components/ProductsGrid.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductsGrid.css"; // Importa tu CSS

const ProductsGrid = ({ products, viewMode, addToCart }) => {
  return (
    <div className="products-grid-container relative">
      {/* Decorative Background Elements */}
      <div className="bg-circle-red"></div>
      <div className="bg-circle-blue"></div>
      <div className="bg-circle-purple"></div>

      {/* Grid Container */}
      <div className={viewMode === "grid" ? "products-grid" : "products-list"}>
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-wrapper"
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
    </div>
  );
};

export default ProductsGrid;
