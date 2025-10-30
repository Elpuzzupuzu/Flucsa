import { Download, ExternalLink, X } from 'lucide-react';
import { useEffect } from 'react';

const PDFViewer = ({ catalog, url, onClose }) => {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-0 sm:p-2"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full sm:h-[95vh] sm:max-w-7xl bg-white sm:rounded-lg shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Optimizado para móvil */}
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b bg-white sticky top-0 z-10 shadow-sm">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate pr-2">
            {catalog.name}
          </h3>
          <button 
            onClick={onClose} 
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Cerrar visor"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* PDF iframe - Ajustado para móvil */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <iframe 
            src={url} 
            className="w-full h-full border-0" 
            title={catalog.name}
            loading="lazy"
          />
        </div>

        {/* Footer - Responsive con stack en móvil */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 px-3 py-2 sm:px-4 sm:py-3 border-t bg-gray-50">
          <a
            href={url}
            download={catalog.fileName}
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <Download className="w-4 h-4" /> 
            <span>Descargar PDF</span>
          </a>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            <ExternalLink className="w-4 h-4" /> 
            <span className="hidden sm:inline">Abrir en nueva pestaña</span>
            <span className="sm:hidden">Nueva pestaña</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;