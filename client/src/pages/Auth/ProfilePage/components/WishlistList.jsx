import { Link } from 'react-router-dom';
import { Heart, ImageOff } from 'lucide-react';

const WishlistList = ({ wishlist, loading }) => {
  if (loading) return <p>Cargando...</p>;
  if (!wishlist || wishlist.length === 0) return <p>No hay productos</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => {
        const producto = item.productos || {};

        return (
          <Link
            key={item.producto_id}
            to={`/productos/${item.producto_id}`} // <--- aquí
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow-sm hover:shadow-md transition-shadow relative"
          >
            {item.deseado && (
              <div className="absolute top-2 right-2 bg-pink-100 rounded-full p-1">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
            )}

            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-32 h-32 object-cover rounded-md mb-2"
              />
            ) : (
              <div className="w-32 h-32 flex items-center justify-center bg-gray-100 rounded-md mb-2">
                <ImageOff className="w-10 h-10 text-gray-400" />
              </div>
            )}

            <p className="text-sm font-semibold text-gray-800 text-center truncate">
              {producto.nombre}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ${producto.precio?.toFixed(2) || '0.00'}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default WishlistList;
