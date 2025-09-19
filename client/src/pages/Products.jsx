import React from 'react';

const products = [
  {
    id: 1,
    name: 'Válvula de bola de PVC',
    price: '$50.00',
    image: 'https://placehold.co/400x300/F0F0F0/000000?text=Producto+1',
    description: 'Válvula de alta resistencia para control de flujo de agua.',
  },
  {
    id: 2,
    name: 'Tubería de cobre',
    price: '$20.00/m',
    image: 'https://placehold.co/400x300/F0F0F0/000000?text=Producto+2',
    description: 'Tubería duradera y confiable para instalaciones de plomería.',
  },
  {
    id: 3,
    name: 'Medidor de presión',
    price: '$85.00',
    image: 'https://placehold.co/400x300/F0F0F0/000000?text=Producto+3',
    description: 'Herramienta de precisión para medir la presión de fluidos.',
  },
  {
    id: 4,
    name: 'Filtro de sedimentos',
    price: '$45.00',
    image: 'https://placehold.co/400x300/F0F0F0/000000?text=Producto+4',
    description: 'Filtro eficiente para eliminar impurezas en el agua.',
  },
];

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Nuestros Productos
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
