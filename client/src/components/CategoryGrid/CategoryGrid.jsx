import React from 'react';
import CategoryCard from './CategoryCard';
import { Home, Droplet, Wrench, Factory, TrendingUp, Compass } from 'lucide-react';

function CategoryGrid() {
  const categories = [
    { 
      title: 'Domestico', 
      iconBgColor: 'bg-yellow-400', 
      textColor: 'text-yellow-800', 
      dotColor: 'bg-yellow-600',
      icon: <Home className="w-8 h-8 text-yellow-800" />
    },
    { 
      title: 'Piscina', 
      iconBgColor: 'bg-pink-400', 
      textColor: 'text-pink-800', 
      dotColor: 'bg-pink-600',
      icon: <Droplet className="w-8 h-8 text-pink-800" />
    },
    { 
      title: 'Ferreteria', 
      iconBgColor: 'bg-red-400', 
      textColor: 'text-red-800', 
      dotColor: 'bg-red-600',
      icon: <Wrench className="w-8 h-8 text-red-800" />
    },
    { 
      title: 'Industrial', 
      iconBgColor: 'bg-blue-400', 
      textColor: 'text-blue-800', 
      dotColor: 'bg-blue-600',
      icon: <Factory className="w-8 h-8 text-blue-800" />
    },
  ];

  const secondaryLinks = [
    { 
      title: 'Engineer and pliwal', 
      iconBgColor: 'bg-pink-200', 
      textColor: 'text-pink-600', 
      icon: <TrendingUp className="w-8 h-8 text-pink-600" />
    },
    { 
      title: 'Uxc Aigeeress Pols', 
      iconBgColor: 'bg-blue-200', 
      textColor: 'text-blue-600', 
      icon: <Compass className="w-8 h-8 text-blue-600" />
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <CategoryCard 
            key={index} 
            title={category.title} 
            iconBgColor={category.iconBgColor} 
            textColor={category.textColor} 
            dotColor={category.dotColor}
            icon={category.icon}
          />
        ))}
      </div>

      {/* La sección de los 2 enlaces adicionales con íconos debajo de la cuadrícula principal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mt-12">
        {secondaryLinks.map((link, index) => (
          <CategoryCard 
            key={index} 
            title={link.title} 
            iconBgColor={link.iconBgColor} 
            textColor={link.textColor} 
            dotColor="bg-gray-400"
            icon={link.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;
