import React from 'react';

/**
 * Componente Presentacional: Muestra una interfaz de error a pantalla completa.
 */
const ErrorDisplay = ({ error }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
            <div className="max-w-2xl mx-auto mt-20">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-red-800">Error al cargar cotizaciones</h3>
                            <p className="text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorDisplay;