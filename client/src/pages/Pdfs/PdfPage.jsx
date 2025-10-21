// client/src/components/PdfPage.jsx
import React from "react";
import PdfCard from "../../pages/Pdfs/components/pdfCard.jsx";
import { catalogos } from "../../pages/Pdfs/data/catalogoData.js";
import ProductSliderPrototype from "../../components/ShopSlider/ShopSlider.jsx";

const PdfPage = () => {
  return (
    <>
      {/* Contenedor para las tarjetas PDF (GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {catalogos.map((cat) => (
          <PdfCard key={cat.fileName} catalog={cat} />
        ))}
      </div>

      {/* Contenedor para el Slider (ANCHO COMPLETO) */}
      {/* Añade un padding si es necesario */}
      <div className="p-4">
        <ProductSliderPrototype />
      </div>
    </>
  );
};

export default PdfPage;
