import React from 'react';
import { Home, Droplet, Wrench, Factory } from 'lucide-react';

// CategoryCard ajustado al diseño existente
function CategoryCard({ title, bgColor, textColor, icon }) {
  return (
    <div className={`${bgColor} rounded-xl p-4 flex flex-col items-center justify-center min-h-[120px] shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group`}>
      {/* Ícono centrado */}
      <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Título centrado */}
      <h3 className={`${textColor} font-semibold text-base text-center group-hover:scale-105 transition-transform duration-200`}>
        {title}
      </h3>
    </div>
  );
}

// CategoryGrid ajustado al diseño existente
function CategoryGrid() {
  const categories = [
    {
      title: 'Doméstico',
      bgColor: 'bg-gradient-to-br from-orange-400 to-orange-500',
      textColor: 'text-orange-900',
      icon: <Home className="w-8 h-8 text-orange-900" />
    },
    {
      title: 'Piscina',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-cyan-500',
      textColor: 'text-cyan-900',
      icon: <Droplet className="w-8 h-8 text-cyan-900" />
    },
    {
      title: 'Ferretería',
      bgColor: 'bg-gradient-to-br from-pink-400 to-pink-500',
      textColor: 'text-pink-900',
      icon: <Wrench className="w-8 h-8 text-pink-900" />
    },
    {
      title: 'Industrial',
      bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
      textColor: 'text-blue-900',
      icon: <Factory className="w-8 h-8 text-blue-900" />
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-10 px-4 relative overflow-hidden">
      {/* Elementos geométricos decorativos como en tu diseño */}
      <div className="absolute top-16 right-16 w-12 h-12 bg-cyan-400 rounded-lg rotate-12 opacity-80"></div>
      <div className="absolute top-24 right-24 w-6 h-6 bg-yellow-400 rounded-full opacity-90"></div>
      <div className="absolute top-32 right-12 w-8 h-8 bg-green-400 rounded-lg rotate-45 opacity-75"></div>
      <div className="absolute bottom-16 left-16 w-8 h-8 bg-pink-400 rounded-lg -rotate-12 opacity-80"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header que coincide con el diseño existente */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            Nuestras <span className="text-purple-400">Categorías</span>
          </h2>
          <p className="text-blue-200 text-base max-w-2xl mx-auto">
            Descubre nuestra amplia gama de productos organizados por categorías, 
            cada sección está diseñada para satisfacer tus necesidades específicas.
          </p>
        </div>

        {/* Grid de categorías - exactamente como en la imagen */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              title={category.title}
              bgColor={category.bgColor}
              textColor={category.textColor}
              icon={category.icon}
            />
          ))}
        </div>

        {/* Botón que coincide con el estilo del sitio */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm">
            Ver Todos los Productos
          </button>
        </div>

        {/* Footer con información adicional */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center">
          <div>
            <h4 className="font-semibold text-white mb-1 text-sm">Envío / Procurement</h4>
            <p className="text-blue-200 text-xs">Servicio de entrega nacional</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1 text-sm">Ingeniería del plástico</h4>
            <p className="text-blue-200 text-xs">Soluciones técnicas especializadas</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1 text-sm">Venta / Equipamientos</h4>
            <p className="text-blue-200 text-xs">Equipo profesional y comercial</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryGrid;