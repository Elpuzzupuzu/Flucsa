// src/pages/Facturas/components/FacturasPagination.jsx

import React from "react";

const FacturasPagination = ({ page, totalPages, onPrevPage, onNextPage }) => {
  return (
    <div className="pagination">
      <button onClick={onPrevPage} disabled={page === 1}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button onClick={onNextPage} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default FacturasPagination;