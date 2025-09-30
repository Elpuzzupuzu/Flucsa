import { useParams } from "react-router-dom";
import { services } from "../Servicios/serviceData";

const ServiceMenuPage = () => {
  const { category } = useParams();

  // Buscar la categoría seleccionada
  const selectedCategory = services.find(
    (service) => service.id === category
  );

  if (!selectedCategory) {
    return <div className="p-8 text-center text-red-500">Categoría no encontrada</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{selectedCategory.title}</h1>
      <p className="text-lg text-gray-700 mb-6">{selectedCategory.description}</p>

      {selectedCategory.items && selectedCategory.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {selectedCategory.items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hay subservicios disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ServiceMenuPage;
