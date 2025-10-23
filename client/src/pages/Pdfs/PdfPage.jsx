import ProductSlider from '../../components/ShopSlider/ShopSlider';
import PDFCard from './components/pdfCard';
import { catalogos } from '../Pdfs/data/catalogoData';
import { FileText } from 'lucide-react';

const PDFCatalog = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de PDFs</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explora y descarga nuestros catálogos en formato PDF</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogos.map((catalog) => <PDFCard key={catalog.fileName} catalog={catalog} />)}
      </div>

      {catalogos.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay catálogos disponibles</h3>
          <p className="text-gray-500">Los catálogos aparecerán aquí cuando estén disponibles</p>
        </div>
      )}
    </div>
    <ProductSlider/>
  </div>
);

export default PDFCatalog;

////