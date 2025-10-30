import ProductSlider from '../../components/ShopSlider/ShopSlider';
import PDFCard from './components/PDFCard';
import { catalogos } from './data/catalogoData';
import { FileText } from 'lucide-react';

const PDFCatalog = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section - Similar a "Principales Categorías" */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Catálogo de PDF
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl">
                        Descubre nuestra amplia gama de catálogos en formato PDF.
                    </p>
                </div>

                {/* Grid de Catálogos */}
                {catalogos.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {catalogos.map((catalog) => (
                                <PDFCard key={catalog.fileName} catalog={catalog} />
                            ))}
                        </div>

                        {/* Botón Ver Todos - Similar al original */}
                        <div className="flex justify-center mt-12">
                            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-md transition-colors duration-200">
                                Ver Todos los Catálogos
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                            No hay catálogos disponibles
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Los catálogos aparecerán aquí cuando estén disponibles
                        </p>
                    </div>
                )}
            </div>

            {/* Productos Destacados Section */}
            {catalogos.length > 0 && (
                <div className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     
                        <ProductSlider />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFCatalog;