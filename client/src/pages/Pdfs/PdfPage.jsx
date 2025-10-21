import React from "react";
import { Download, FileText, AlertCircle, Loader2 } from "lucide-react";
import ProductSlider from "../../components/ShopSlider/ShopSlider";

// ===== COMPONENTE PdfCard =====
const PdfCard = ({ catalog }) => {
  const [status, setStatus] = React.useState("idle");
  const [url, setUrl] = React.useState(null);

  const handleDownload = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setUrl("https://example.com/pdf");
    }, 1500);
  };

  const renderButton = () => {
    if (status === "loading") {
      return (
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white rounded-lg">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm font-medium">Cargando...</span>
        </div>
      );
    }

    if (status === "failed") {
      return (
        <button
          className="flex items-center gap-2 px-4 py-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-all"
          onClick={() => setStatus("idle")}
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-sm font-medium">Reintentar</span>
        </button>
      );
    }

    if (url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-green-600/90 text-white rounded-lg hover:bg-green-700 transition-all hover:scale-105 transform"
        >
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Descargar PDF</span>
        </a>
      );
    }

    return (
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-105 transform"
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm font-medium">Ver Catálogo</span>
      </button>
    );
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative h-80 overflow-hidden">
        <img
          src={catalog.imageUrl}
          alt={catalog.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            CATÁLOGO 2025
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform">
            {catalog.name || "Catálogo"}
          </h3>
          <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {catalog.description}
          </p>
        </div>

        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {renderButton()}
        </div>
      </div>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
      </div>
    </div>
  );
};

// ===== COMPONENTE PdfPage =====
const PdfPage = () => {
  const catalogos = [
    { 
      name: "Sistemas Hidráulicos", 
      fileName: "hidraulicos.pdf", 
      imageUrl: "https://rexroth-hydraulics.com.mx/blog/wp-content/uploads/2023/06/3.jpg",
      description: "Bombas, válvulas y accesorios industriales"
    },
    { 
      name: "Equipos de Piscina", 
      fileName: "piscinas.pdf", 
      imageUrl: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&q=80",
      description: "Filtros, limpieza y mantenimiento"
    },
    { 
      name: "Tratamiento de Agua", 
      fileName: "tratamiento.pdf", 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnqsWm75wfxCxqvq_lZMVoeFumTI2fYGVA9g&s",
      description: "Químicos y sistemas de purificación"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-100">
      
      {/* Grid de catálogos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {catalogos.map((cat) => (
            <PdfCard key={cat.fileName} catalog={cat} />
          ))}
        </div>
      </div>
      <ProductSlider/>

      {/* Separador visual */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent"></div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-cyan-900 via-blue-900 to-blue-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">¿Necesitas asesoría técnica?</h3>
          <p className="text-cyan-100 mb-6">
            Nuestro equipo de especialistas está listo para ayudarte a encontrar la solución perfecta
          </p>
          <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            Contactar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfPage;