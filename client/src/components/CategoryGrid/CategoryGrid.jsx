// src/components/CategoryGrid/CategoryGrid.jsx
import React from 'react';
import CategoryCard from './CategoryCard';

function CategoryGrid() {
  const categories = [
    { 
      title: 'Domestico', 
      iconBgColor: 'bg-yellow-400', 
      textColor: 'text-yellow-800', 
      dotColor: 'bg-yellow-600',
      icon: <svg className="w-8 h-8 text-yellow-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> // Placeholder
    },
    { 
      title: 'Piscina', 
      iconBgColor: 'bg-pink-400', 
      textColor: 'text-pink-800', 
      dotColor: 'bg-pink-600',
      icon: <svg className="w-8 h-8 text-pink-800" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"/></svg> // Placeholder
    },
    { 
      title: 'Ferreteria', 
      iconBgColor: 'bg-red-400', 
      textColor: 'text-red-800', 
      dotColor: 'bg-red-600',
      icon: <svg className="w-8 h-8 text-red-800" fill="currentColor" viewBox="0 0 24 24"><path d="M19 12h-2v4h-2v-4h-2v4h-2v-4H9v4H7v-4H5v4H3V8h16l2-2h-8V2H9v4H7V2H5v4H3v2h2v4h2v-4h2v4h2v-4h2v4h2v-4h2v4h2z"/></svg> // Placeholder
    },
    { 
      title: 'Industrial', 
      iconBgColor: 'bg-blue-400', 
      textColor: 'text-blue-800', 
      dotColor: 'bg-blue-600',
      icon: <svg className="w-8 h-8 text-blue-800" fill="currentColor" viewBox="0 0 24 24"><path d="M22 11h-4.17L15 7.83 17.17 5.66 18.59 7.08 20 5.66 18.59 4.24 17.17 2.83 15.76 4.24 14.34 2.83 12.93 4.24 11.51 2.83 10.1 4.24 8.68 2.83 7.27 4.24 5.85 2.83 4.44 4.24 3.03 2.83 2 4.03 2 11h20zM2 13h20v2H2v-2z"/></svg> // Placeholder
    },
  ];

  const secondaryLinks = [
    { 
      title: 'Engineer and pliwal', 
      iconBgColor: 'bg-pink-200', 
      textColor: 'text-pink-600', 
      icon: <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h7v7.93z"/></svg> // Placeholder
    },
    { 
      title: 'Uxc Aigeeress Pols', 
      iconBgColor: 'bg-blue-200', 
      textColor: 'text-blue-600', 
      icon: <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93h7v7.93z"/></svg> // Placeholder
    },
  ];

  return (
    <div className="bg-white py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
        {/* Tarjetas adicionales para la segunda fila si las hubiera, siguiendo el patrón de la imagen */}
      </div>

      {/* La sección de los 3 enlaces adicionales con íconos debajo de la cuadrícula principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-12">
        {secondaryLinks.map((link, index) => (
          <CategoryCard 
            key={index} 
            title={link.title} 
            iconBgColor={link.iconBgColor} 
            textColor={link.textColor} 
            dotColor="bg-gray-400" // No tienen punto de color según la referencia
            icon={link.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryGrid;