// client/src/components/PdfCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfUrl, clearPdf } from "../../../features/pdfs/pdfSlice";

const PdfCard = ({ catalog }) => {
  const dispatch = useDispatch();

  const pdfDetails = useSelector(
    (state) => state.pdfs?.details?.[catalog.fileName]
  );

  const { url, status, error } = pdfDetails || {
    url: null,
    status: "idle",
    error: null,
  };

  const handleDownload = () => {
    if (status !== "loading" && !url) {
      dispatch(fetchPdfUrl(catalog.fileName));
    }
  };

  const renderButton = () => {
    if (status === "loading")
      return (
        <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/30 shadow-lg">
          <div className="relative">
            <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-5 h-5 border-3 border-transparent border-t-blue-300 rounded-full animate-spin animation-delay-150"></div>
          </div>
          <span className="text-sm text-white font-semibold tracking-wide">Cargando...</span>
        </div>
      );

    if (status === "failed")
      return (
        <button
          className="group/btn px-6 py-3 bg-red-500/20 backdrop-blur-md text-red-100 rounded-xl border border-red-400/40 transition-all duration-300 hover:bg-red-500/30 hover:border-red-400/60 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 text-sm font-semibold flex items-center gap-2"
          onClick={() => dispatch(clearPdf(catalog.fileName))}
        >
          <span className="text-lg group-hover/btn:animate-bounce">⚠️</span>
          <span>Error. Reintentar</span>
        </button>
      );

    if (url)
      return (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link relative px-7 py-3.5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60 active:scale-95 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700"></div>
          <svg className="w-5 h-5 relative z-10 group-hover/link:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="relative z-10 tracking-wide">Descargar PDF</span>
        </a>
      );

    return (
      <button
        onClick={handleDownload}
        className="group/link relative px-7 py-3.5 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/60 active:scale-95 flex items-center gap-3 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/link:translate-x-[100%] transition-transform duration-700"></div>
        <svg className="w-5 h-5 relative z-10 group-hover/link:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="relative z-10 tracking-wide">Descargar PDF</span>
      </button>
    );
  };

  return (
    <div className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform-gpu">
      {/* Efecto de brillo animado en el borde */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 blur-sm animate-pulse"></div>
      </div>

      {/* Contenedor principal con borde */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Imagen con efectos mejorados */}
        <div className="relative overflow-hidden">
          <img
            src={catalog.imageUrl}
            alt={catalog.name}
            className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
          />
          
          {/* Efecto de luz que cruza la imagen */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
          
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        
        {/* Overlay mejorado con glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-all duration-500 backdrop-blur-md">
          {/* Partículas decorativas */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-300"></div>
          </div>
          
          {/* Título con efectos mejorados */}
          <div className="relative transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 mb-6 px-6">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-lg"></div>
            <h3 className="relative text-white text-2xl font-bold drop-shadow-2xl text-center leading-tight tracking-wide">
              {catalog.name}
            </h3>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
          </div>
          
          {/* Botón con animación de entrada retrasada */}
          <div className="relative transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {renderButton()}
          </div>
        </div>

        {/* Borde brillante mejorado */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-400/60 transition-all duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500/0 via-blue-400/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl"></div>
      </div>
    </div>
  );
};

export default PdfCard;