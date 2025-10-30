import { useDispatch, useSelector } from 'react-redux';
import { fetchPdfUrl, setSelectedPdf, clearSelectedPdf } from '../../../features/pdfs/pdfSlice';
import { Download, Eye, Loader2, FileText } from 'lucide-react';
import PDFViewer from './PDFViewer';

const PDFCard = ({ catalog }) => {
  const dispatch = useDispatch();
  const pdfDetails = useSelector((state) => state.pdfs.details[catalog.fileName]);
  const selectedPdf = useSelector((state) => state.pdfs.selectedPdf);

  const isLoading = pdfDetails?.status === 'loading';
  const hasError = pdfDetails?.status === 'failed';
  const url = pdfDetails?.url;

  const handleView = async () => {
    if (!url) await dispatch(fetchPdfUrl(catalog.fileName));
    dispatch(setSelectedPdf(catalog));
  };

  const handleDownload = async () => {
    if (!url) {
      const result = await dispatch(fetchPdfUrl(catalog.fileName));
      if (result.payload) {
        // En móvil, crear link temporal para forzar descarga
        const link = document.createElement('a');
        link.href = result.payload;
        link.download = catalog.fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      const link = document.createElement('a');
      link.href = url;
      link.download = catalog.fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Imagen con overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <img
            src={catalog.imageUrl}
            alt={catalog.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Overlay oscuro en hover (solo desktop) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" />

          {/* Botones en hover para desktop */}
          <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleView}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />} 
              Ver
            </button>
            <button
              onClick={handleDownload}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} 
              Descargar
            </button>
          </div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate text-base sm:text-lg">
                {catalog.name}
              </h3>
              {/* <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">
                {catalog.fileName}
              </p> */}
            </div>
          </div>

          {/* Botones para móvil - siempre visibles */}
          <div className="flex sm:hidden gap-2 mt-3">
            <button
              onClick={handleView}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors disabled:opacity-50 font-medium text-sm"
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
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50 font-medium text-sm"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              Descargar
            </button>
          </div>

          {/* Mensaje de error */}
          {hasError && (
            <div className="mt-3 p-2 bg-red-50 text-red-600 text-xs rounded-lg flex items-center gap-2">
              <span className="font-medium">Error:</span>
              <span>No se pudo cargar el PDF</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal del visor PDF */}
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

export default PDFCard;