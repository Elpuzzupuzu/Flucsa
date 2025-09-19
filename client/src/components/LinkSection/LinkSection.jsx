// src/components/LinkSection/LinkSection.jsx
import React from 'react';

function LinkSection() {
  return (
    <div className="bg-white py-16 px-4">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start space-y-6 md:space-y-0 md:space-x-12 max-w-4xl mx-auto text-center md:text-left">
        <div className="space-y-2">
          <p className="text-xl font-bold">Conto / Prowaltcering</p>
          <a href="#" className="text-gray-600 hover:underline">Flusure</a>
          <br/>
          <a href="#" className="text-gray-600 hover:underline">Hydactive</a>
        </div>
        
        <div className="space-y-2">
          <p className="text-xl font-bold">Engineer and pliwal</p>
          <a href="#" className="text-gray-600 hover:underline">Lactics</a>
          <br/>
          <a href="#" className="text-gray-600 hover:underline">Phydrox</a>
        </div>
        
        <div className="space-y-2">
          <p className="text-xl font-bold">Wate / Reciguiments</p>
          <a href="#" className="text-gray-600 hover:underline">Contact</a>
        </div>
      </div>
    </div>
  );
}

export default LinkSection;