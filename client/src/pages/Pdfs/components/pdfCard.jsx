// client/src/components/PdfCard.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPdfUrl, clearPdf } from "../../../features/pdfs/pdfSlice";

const PdfCard = ({ catalog }) => {
  const dispatch = useDispatch();

  // ✅ CORRECCIÓN: Uso de encadenamiento opcional (?.) para evitar el TypeError
  const pdfDetails = useSelector(
    (state) => state.pdfs?.details?.[catalog.fileName]
  );

  // Desestructura, usando un objeto por defecto si el estado aún no existe
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
      return <span className="text-sm text-gray-200">Cargando...</span>;

    if (status === "failed")
      return (
        <button
          className="text-sm text-red-400 bg-red-800/20 p-1 rounded transition hover:bg-red-800/40"
          onClick={() => dispatch(clearPdf(catalog.fileName))}
        >
          Error: {error}. Click para reintentar.
        </button>
      );

    if (url)
      return (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Descargar
        </a>
      );

    return (
      <button
        onClick={handleDownload}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Descargar
      </button>
    );
  };

  return (
    <div className="relative border rounded shadow hover:shadow-lg overflow-hidden cursor-pointer group">
      <img
        src={catalog.imageUrl}
        alt={catalog.name}
        className="w-full h-64 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition">
        <span className="text-white font-semibold mb-2">{catalog.name}</span>
        {renderButton()}
      </div>
    </div>
  );
};

export default PdfCard;
