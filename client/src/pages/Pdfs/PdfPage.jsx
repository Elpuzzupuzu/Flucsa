import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfUrl, clearPdf, setSelectedPdf, clearSelectedPdf } from '../../features/pdfs/pdfSlice';
import { Download, Eye, X, Loader2, FileText, ExternalLink } from 'lucide-react';

// Datos de catálogos (simulados aquí, en tu app importarías de catalogData.js)
const catalogos = [
  {
    name: "Flucsa",
    fileName: "flucsa.pdf",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gXRY8CfNzOLmbreIoo0uboEqI6JIUC8P6w&s",
  },
  {
    name: "Catálogo Industrial",
    fileName: "industrial.pdf",
    imageUrl: "https://m.media-amazon.com/images/I/517mwnl1zXL._UF894,1000_QL80_.jpg",
  },
  {
    name: "Productos 2024",
    fileName: "productos-2024.pdf",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
  },
];

// Componente Modal para visualizar PDF
const PDFViewer = ({ catalog, url, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Header del Modal */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{catalog.name}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Visor de PDF */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={url}
            className="w-full h-full"
            title={catalog.name}
          />
        </div>
        
        {/* Footer con acciones */}
        <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50">
          <a
            href={url}
            download={catalog.fileName}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Descargar
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir en nueva pestaña
          </a>
        </div>
      </div>
    </div>
  );
};

// Componente Card para cada catálogo
const PDFCard = ({ catalog }) => {
  const dispatch = useDispatch();
  const pdfDetails = useSelector((state) => state.pdfs.details[catalog.fileName]);
  const selectedPdf = useSelector((state) => state.pdfs.selectedPdf);
  
  const isLoading = pdfDetails?.status === 'loading';
  const hasError = pdfDetails?.status === 'failed';
  const url = pdfDetails?.url;

  const handleView = async () => {
    if (!url) {
      await dispatch(fetchPdfUrl(catalog.fileName));
    }
    dispatch(setSelectedPdf(catalog));
  };

  const handleDownload = async () => {
    if (!url) {
      await dispatch(fetchPdfUrl(catalog.fileName));
      const result = await dispatch(fetchPdfUrl(catalog.fileName));
      if (result.payload) {
        window.open(result.payload, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Imagen del catálogo */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={catalog.imageUrl}
            alt={catalog.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Overlay con acciones */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleView}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Ver
            </button>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Descargar
            </button>
          </div>
        </div>

        {/* Información del catálogo */}
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{catalog.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{catalog.fileName}</p>
            </div>
          </div>

          {hasError && (
            <div className="mt-3 p-2 bg-red-50 text-red-600 text-xs rounded">
              Error al cargar el PDF
            </div>
          )}
        </div>
      </div>

      {/* Modal de visualización */}
      {selectedPdf?.fileName === catalog.fileName && url && (
        <PDFViewer
          catalog={catalog}
          url={url}
          onClose={() => dispatch(clearSelectedPdf())}
        />
      )}
    </>
  );
};

// Componente principal del catálogo
const PDFCatalog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Catálogo de PDFs
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora y descarga nuestros catálogos en formato PDF
          </p>
        </div>

        {/* Grid de catálogos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogos.map((catalog) => (
            <PDFCard key={catalog.fileName} catalog={catalog} />
          ))}
        </div>

        {/* Empty state */}
        {catalogos.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay catálogos disponibles
            </h3>
            <p className="text-gray-500">
              Los catálogos aparecerán aquí cuando estén disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCatalog;