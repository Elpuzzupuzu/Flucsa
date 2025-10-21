import React from "react";
import { Download, FileText, AlertCircle, Loader2 } from "lucide-react";

const PdfCard = ({ catalog }) => {
  // Simulando estados para el ejemplo
  const [status, setStatus] = React.useState("idle");
  const [url, setUrl] = React.useState(null);
  const [error, setError] = React.useState(null);

  const handleDownload = () => {
    setStatus("loading");
    // Simulación de carga
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
      {/* Imagen con overlay gradiente */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={catalog.imageUrl || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"}
          alt={catalog.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        {/* Gradiente overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      </div>

      {/* Contenido sobre la imagen */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Badge superior */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            CATÁLOGO 2024
          </span>
        </div>

        {/* Título */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:translate-y-0 translate-y-2 transition-transform">
            {catalog.name || "Flucsa"}
          </h3>
          <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Productos industriales de calidad
          </p>
        </div>

        {/* Botón de descarga */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          {renderButton()}
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 group-hover:left-full transition-all duration-1000"></div>
      </div>
    </div>
  );
};

// Demo con múltiples tarjetas
const PdfPageDemo = () => {
  const catalogos = [
    { name: "Flucsa", fileName: "flucsa.pdf", imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80" },
    { name: "Catálogo Industrial", fileName: "industrial.pdf", imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80" },
    { name: "Productos Premium", fileName: "premium.pdf", imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-4">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            📄 DESTACADOS DE LA SEMANA
          </span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 text-center">
          Catálogo de Productos
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
          Descubre nuestra colección premium de <span className="text-blue-600 font-semibold">soluciones industriales</span> con garantía de calidad y precios imbatibles
        </p>
      </div>

      {/* Grid de catálogos */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {catalogos.map((cat, index) => (
          <PdfCard key={index} catalog={cat} />
        ))}
      </div>

      {/* Sección adicional */}
      <div className="max-w-7xl mx-auto mt-16 p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Productos Destacados
        </h2>
        <p className="text-gray-600 text-center">
          Explora nuestra selección de productos más populares
        </p>
      </div>
    </div>
  );
};

export default PdfPageDemo;