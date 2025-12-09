// src/pages/Facturas/components/FacturasTable.jsx

import React, { useState } from "react";
import FacturaRow from "./FacturaRow";

// Estilos de tabla mejorados
const tableStyles = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0",
  tableLayout: "fixed",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

export const thTdStyles = {
  padding: "12px 16px",
  border: "1px solid #e2e8f0",
  whiteSpace: "nowrap",
  textAlign: "left",
};

const FacturasTable = ({ items }) => {
  const [expandedFacturaId, setExpandedFacturaId] = useState(null);

  const toggleDetails = (facturaId) => {
    setExpandedFacturaId(expandedFacturaId === facturaId ? null : facturaId);
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      border: "1px solid #e2e8f0"
    }}>
      <table style={tableStyles}>
        <thead>
          <tr style={{
            backgroundColor: "#f8fafc",
            borderBottom: "2px solid #e2e8f0"
          }}>
            <th style={{ 
              ...thTdStyles, 
              width: "5%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none",
              borderLeft: "none"
            }}>
            </th>
            <th style={{ 
              ...thTdStyles, 
              width: "10%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none"
            }}>
              Folio
            </th>
            <th style={{ 
              ...thTdStyles, 
              width: "10%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none"
            }}>
              Serie
            </th>
            <th style={{ 
              ...thTdStyles, 
              width: "15%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none"
            }}>
              Total
            </th>
            <th style={{ 
              ...thTdStyles, 
              width: "25%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none"
            }}>
              Fecha
            </th>
            <th style={{ 
              ...thTdStyles, 
              width: "35%",
              fontWeight: "600",
              color: "#475569",
              fontSize: "0.85em",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              borderTop: "none",
              borderRight: "none"
            }}>
              Verificación
            </th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((factura) => (
              <FacturaRow
                key={factura.factura_id}
                factura={factura}
                isExpanded={expandedFacturaId === factura.factura_id}
                toggleDetails={toggleDetails}
              />
            ))
          ) : (
            <tr>
              <td 
                colSpan="6" 
                style={{
                  ...thTdStyles,
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#94a3b8",
                  fontSize: "1em",
                  fontStyle: "italic",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "none"
                }}
              >
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "2.5em" }}>📄</span>
                  <span>No se encontraron facturas</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacturasTable;