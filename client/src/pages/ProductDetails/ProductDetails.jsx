// pages/ProductDetails/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // 1. Importa useParams y Link
import { ShoppingCart, ChevronRight } from 'lucide-react';

// Se debe importar los datos de productos o pasarlos como prop
const productsData = [
  {
    id: 1,
    name: 'Acople universal',
    price: '$35.00',
    image: 'https://tuvalrep.com.co/wp-content/uploads/2023/07/Acople-Universal-Apolo.jpg',
    description: 'Conexión versátil para diferentes tipos de tubería.',
    badge: ''
  },
  {
    id: 2,
    name: 'Bomba centrífuga',
    price: '$320.00',
    image: 'https://cms.grupoferrepat.net/assets/img/productos/619697.webp',
    description: 'Bomba de alto rendimiento para sistemas de agua.',
    badge: 'Oferta'
  },
  {
    id: 3,
    name: 'Filtro de sedimentos',
    price: '$45.00',
    image: 'https://www.toolferreterias.com/cdn/shop/files/273000016.jpg?v=1729035010',
    description: 'Filtro eficiente para eliminar impurezas en el agua.',
    badge: ''
  },
  {
    id: 4,
    name: 'Válvula de bola de PVC',
    price: '$50.00',
    image: 'https://bedon.mx/wp-content/uploads/2023/12/MUELLER-VALVULA-ESFERA-CEMENTAR-PVC-H.jpg',
    description: 'Válvula de alta resistencia para control de flujo de agua.',
    badge: 'Más Vendido'
  },
  {
    id: 5,
    name: 'Tubería de cobre',
    price: '$20.00',
    image: 'https://www.surtidor.com/2203683-large_default/tubo-nacobre-l-01000601160.jpg',
    description: 'Tubería duradera y confiable para instalaciones de plomería.',
    badge: ''
  },
  {
    id: 6,
    name: 'Medidor de presión',
    price: '$85.00',
    image: 'https://http2.mlstatic.com/D_NQ_NP_845953-MPE74251680391_012024-O-manometro-de-presion-de-agua-de-14-npt-manometro-.webp',
    description: 'Herramienta de precisión para medir la presión de fluidos.',
    badge: 'Nuevo'
  },
  {
    id: 7,
    name: 'Válvula de retención',
    price: '$75.00',
    image: 'https://valvulasarco.com/wp-content/uploads/2024/03/valvula-retencion-arco.png',
    description: 'Previene el retroceso de fluidos en tuberías.',
    badge: ''
  },
  {
    id: 8,
    name: 'Manómetro digital',
    price: '$120.00',
    image: 'https://static.grainger.com/rp/s/is/image/Grainger/19YM06_AS01?$zmmain$',
    description: 'Medición precisa con pantalla digital.',
    badge: 'Nuevo'
  }
];

// 2. Ya no se necesita la prop productId, la obtenemos de la URL
const ProductDetails = ({ onAddToCart }) => {
  const { id } = useParams(); // 3. Usa el hook useParams para obtener el ID de la URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Buscar el producto por ID de la URL
    // Se usa Number(id) porque el ID de la URL es un string
    const foundProduct = productsData.find(p => p.id === Number(id));
    setProduct(foundProduct);
  }, [id]); // 4. El efecto se ejecuta cuando el ID de la URL cambia

  if (!product) {
    return <div className="text-center py-20 text-gray-500">Producto no encontrado.</div>;
  }

  return (
    <div className="bg-white min-h-screen py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb actualizado con Link */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/productos" className="hover:text-blue-600 transition-colors">Productos</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-600 font-medium">{product.name}</span>
        </div>

        <div className="lg:flex lg:gap-10">
          {/* Columna de la imagen */}
          <div className="lg:w-1/2 mb-6 lg:mb-0">
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-xl shadow-lg object-contain" />
          </div>

          {/* Columna de detalles */}
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-2xl text-blue-600 font-bold mb-4">{product.price}</p>

            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Descripción del Producto</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                <ShoppingCart size={20} className="mr-2" />
                Añadir al Carrito
              </button>
              <button className="flex-1 px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                Contactar para más información
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;