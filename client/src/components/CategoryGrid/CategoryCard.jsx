import React from 'react';
import { useNavigate } from 'react-router-dom';

// CategoryCard con diseño estilo Amazon - tarjetas con imagen
function CategoryCard({ title, bgColor, textColor, image }) {
  // Inicializa el hook de navegación
  const navigate = useNavigate();

  // Función handle para la navegación
  const handleClick = (e) => {
    // Es buena práctica detener la propagación, por si hay otros clics en elementos padres
    e.stopPropagation(); 
    
    // Redirige programáticamente a la ruta /catalogos-pdfs
    navigate("/catalogo-pdfs");
    
    // Opcional: Log para verificar que se ejecuta
    // console.log(`Redirigiendo a /catalogos-pdfs desde la tarjeta: ${title}`);
  };

  return (
    // Reemplazamos el div principal por una etiqueta <button>
    // Usamos 'type="button"' para evitar el envío de formularios si estuviera dentro de uno.
    <button 
      type="button"
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col w-full p-0 border-none text-left"
      onClick={handleClick} // Asignamos la función handle al clic
    >
      
      {/* Todo el contenido de la tarjeta dentro del botón */}
      
      {/* Imagen de la categoría */}
      <div className="relative h-48 md:h-64 overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 ${bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Imagen real de la categoría */}
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Título de la categoría */}
      <div className="p-4 bg-white">
        <h3 className="text-gray-900 font-semibold text-lg group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </button>
  );
}

export default CategoryCard;