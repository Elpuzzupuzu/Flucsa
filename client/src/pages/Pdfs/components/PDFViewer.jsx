import { Download, ExternalLink, X } from 'lucide-react';

const PDFViewer = ({ catalog, url, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
    <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">{catalog.name}</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 overflow-hidden">
        <iframe src={url} className="w-full h-full" title={catalog.name} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50">
        <a
          href={url}
          download={catalog.fileName}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" /> Descargar
        </a>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Abrir en nueva pestaña
        </a>
      </div>
    </div>
  </div>
);

export default PDFViewer;
