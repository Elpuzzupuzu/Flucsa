import React from 'react';
import { Truck, Wrench, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Imágenes de ejemplo - reemplaza con tus imports reales
import domesticoImg from '../../assets/imgs/domestico.jpg';
import piscinaImg from '../../assets/imgs/piscina-playa.jpg';
import ferreteriaImg from '../../assets/imgs/ferreteria.jpg';
import industrialImg from '../../assets/imgs/industrial.jpg';

// CategoryCard simulado - mantén tu componente original
const CategoryCard = ({ title, image }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      </div>
      <div className="p-5 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
};

// CategoryGrid con diseño profesional
function CategoryGrid() {
  // 1. Inicializa el hook de navegación
  const navigate = useNavigate(); 
  
  const categories = [
    {
      title: 'Doméstico',
      image: domesticoImg
    },
    {
      title: 'Piscina',
      image: piscinaImg
    },
    {
      title: 'Ferretería',
      image: ferreteriaImg
    },
    {
      title: 'Industrial',
      image: industrialImg
    },
  ];

  // 2. Función que llama a navigate()
  const handleViewProducts = () => {
    // Redirige a la ruta "/productos"
    navigate("/productos");
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
              Explora por categoría
            </span>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            Principales Categorías
          </h2>
          <p className="text-gray-600 max-w-3xl">
            Descubre nuestra amplia gama de productos organizados por categorías, 
            cada sección está diseñada para satisfacer tus necesidades específicas.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              image={category.image}
              

              
            />
          ))}
        </div>

        {/* Botón CTA */}
        <div className="text-center mb-16">
          <button 
            // 3. Asigna la función de navegación al evento onClick
            onClick={handleViewProducts}  
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Ver Todos los Productos
          </button>
        </div>

        {/* Servicios destacados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Envío</h4>
            <p className="text-gray-600 text-sm">Servicio de entrega nacional</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
              <Wrench className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Ingeniería del plástico</h4>
            <p className="text-gray-600 text-sm">Soluciones técnicas especializadas</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <ShoppingBag className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Venta / Equipamientos</h4>
            <p className="text-gray-600 text-sm">Equipo profesional y comercial</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;