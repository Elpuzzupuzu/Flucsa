import React from 'react';

function CategoryCard({ title, iconBgColor, textColor, dotColor, icon }) {
  return (
    <div className={`relative ${iconBgColor} rounded-xl p-6 flex flex-col justify-between items-start min-h-[192px] shadow-md`}>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 ${dotColor} rounded-full`}></div>
        <span className={`font-semibold text-lg ${textColor}`}>{title}</span>
      </div>
      <div className="mt-auto">
        <div className="w-16 h-16 bg-opacity-20 rounded-lg flex items-center justify-center" style={{ backgroundColor: iconBgColor, opacity: 0.3 }}>
          {icon} {/* Renderiza el ícono pasado como prop */}
        </div>
      </div>
    </div>
  );
}

export default CategoryCard;
