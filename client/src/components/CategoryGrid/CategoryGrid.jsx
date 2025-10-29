import React from 'react';
// Importa tus imágenes
import domesticoImg from '../../assets/imgs/domestico.jpg';
import piscinaImg from '../../assets/imgs/piscina-playa.jpg';
import ferreteriaImg from '../../assets/imgs/ferreteria.jpg';
import industrialImg from  '../../assets/imgs/industrial.jpg';

// Importa el componente hijo
import CategoryCard from './CategoryCard';
import { useNavigate } from 'react-router-dom';

// CategoryGrid con diseño 
function CategoryGrid() {
  const categories = [
    {
      title: 'Doméstico',
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-500',
      textColor: 'text-orange-900',
      image: domesticoImg
    },
    {
      title: 'Piscina',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-cyan-500',
      textColor: 'text-cyan-900',
      image: piscinaImg
    },
    {
      title: 'Ferretería',
      bgColor: 'bg-gradient-to-br from-pink-400 to-pink-500',
      textColor: 'text-pink-900',
      image: ferreteriaImg
    },
    {
      title: 'Industrial',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
      textColor: 'text-blue-900',
      image: industrialImg
    },
  ];

  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate("/productos");
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-12 px-4 relative overflow-hidden">
      {/* Elementos geométricos decorativos */}
      <div className="absolute top-16 right-16 w-12 h-12 bg-cyan-400 rounded-lg rotate-12 opacity-80"></div>
      <div className="absolute top-24 right-24 w-6 h-6 bg-yellow-400 rounded-full opacity-90"></div>
      <div className="absolute top-32 right-12 w-8 h-8 bg-green-400 rounded-lg rotate-45 opacity-75"></div>
      <div className="absolute bottom-16 left-16 w-8 h-8 bg-pink-400 rounded-lg -rotate-12 opacity-80"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Principales<span className="text-purple-400">Categorías</span>
          </h2>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            Descubre nuestra amplia gama de productos organizados por categorías, 
            cada sección está diseñada para satisfacer tus necesidades específicas.
          </p>
        </div>

        {/* Grid de categorías estilo Amazon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              bgColor={category.bgColor}
              textColor={category.textColor}
              image={category.image}
            />
          ))}
        </div>

        {/* Botón CTA */}
        <div className="text-center mb-12">
          <button  onClick={handleViewProducts}  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Ver Todos los Productos
          </button>
        </div>

        {/* Footer con información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-blue-700">
          <div className="text-center">
            <h4 className="font-semibold text-white mb-2 text-base">Envío / Procurement</h4>
            <p className="text-blue-200 text-sm">Servicio de entrega nacional</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-white mb-2 text-base">Ingeniería del plástico</h4>
            <p className="text-blue-200 text-sm">Soluciones técnicas especializadas</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-white mb-2 text-base">Venta / Equipamientos</h4>
            <p className="text-blue-200 text-sm">Equipo profesional y comercial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;