// src/pages/Facturas/components/FacturaRow.jsx

import React from "react";
import { thTdStyles } from "./FacturasTable";

const FacturaRow = ({ factura, isExpanded, toggleDetails }) => {
  const totalMonto = factura.total_factura || factura.total;
  const fechaFactura = factura.data_json?.created_at
    ? new Date(factura.data_json.created_at).toLocaleDateString()
    : "N/A";

  return (
    <React.Fragment>
      {/* Fila principal de la Factura */}
      <tr style={{
        transition: "all 0.2s ease",
        backgroundColor: isExpanded ? "#f8fafc" : "white"
      }}>
        <td style={thTdStyles}>
          <button
            onClick={() => toggleDetails(factura.factura_id)}
            style={{
              background: isExpanded ? "#3b82f6" : "#e2e8f0",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85em",
              padding: "6px 10px",
              color: isExpanded ? "white" : "#475569",
              transition: "all 0.2s ease",
              fontWeight: "600",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = isExpanded ? "#2563eb" : "#cbd5e1";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = isExpanded ? "#3b82f6" : "#e2e8f0";
              e.target.style.transform = "scale(1)";
            }}
          >
            {isExpanded ? "−" : "+"}
          </button>
        </td>
        <td style={{...thTdStyles, fontWeight: "600", color: "#1e293b"}}>
          {factura.folio_numero}
        </td>
        <td style={{...thTdStyles, color: "#64748b"}}>
          {factura.serie}
        </td>
        <td style={{...thTdStyles, fontWeight: "700", color: "#059669", fontSize: "1.05em"}}>
          ${totalMonto}
        </td>
        <td style={{...thTdStyles, color: "#64748b"}}>
          {fechaFactura}
        </td>
        <td style={thTdStyles}>
          <a
            href={factura.data_json?.verification_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "500",
              padding: "4px 12px",
              borderRadius: "4px",
              transition: "all 0.2s ease",
              display: "inline-block"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#eff6ff";
              e.target.style.color = "#2563eb";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#3b82f6";
            }}
          >
            🔗 Verificar
          </a>
        </td>
      </tr>

      {/* Fila de detalles (Desglose de Ítems) */}
      {isExpanded && (
        <tr>
          <td colSpan="6" style={{ padding: "0", border: "none" }}>
            <div
              style={{
                padding: "20px 30px",
                backgroundColor: "#f8fafc",
                borderTop: "2px solid #e2e8f0",
                borderBottom: "2px solid #e2e8f0",
                animation: "slideDown 0.3s ease"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                gap: "8px"
              }}>
                <div style={{
                  width: "4px",
                  height: "20px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "2px"
                }}></div>
                <strong style={{
                  fontSize: "1.05em",
                  color: "#1e293b",
                  fontWeight: "600"
                }}>
                  Desglose de Ítems
                </strong>
              </div>
              
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0",
                  marginTop: "10px",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
                }}
              >
                <thead>
                  <tr style={{ 
                    backgroundColor: "#f1f5f9",
                    borderBottom: "2px solid #e2e8f0"
                  }}>
                    <th style={{ 
                      ...thTdStyles, 
                      border: "none", 
                      width: "40%",
                      fontWeight: "600",
                      color: "#475569",
                      fontSize: "0.9em",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 16px"
                    }}>
                      Concepto
                    </th>
                    <th style={{ 
                      ...thTdStyles, 
                      border: "none", 
                      width: "15%",
                      fontWeight: "600",
                      color: "#475569",
                      fontSize: "0.9em",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 16px"
                    }}>
                      Cantidad
                    </th>
                    <th style={{ 
                      ...thTdStyles, 
                      border: "none", 
                      width: "15%",
                      fontWeight: "600",
                      color: "#475569",
                      fontSize: "0.9em",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 16px"
                    }}>
                      Precio Unit.
                    </th>
                    <th style={{ 
                      ...thTdStyles, 
                      border: "none", 
                      width: "15%",
                      fontWeight: "600",
                      color: "#475569",
                      fontSize: "0.9em",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      padding: "12px 16px"
                    }}>
                      Descuento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {factura.items && factura.items.length > 0 ? (
                    factura.items.map((item, index) => {
                      const descripcion = item.description || "Concepto no disponible";
                      const precioUnitario =
                        item.price !== undefined
                          ? `$${item.price.toFixed(2)}`
                          : "$0.00";
                      const descuento =
                        item.discount !== undefined
                          ? `$${item.discount.toFixed(2)}`
                          : "$0.00";

                      return (
                        <tr 
                          key={index}
                          style={{
                            borderBottom: index < factura.items.length - 1 ? "1px solid #f1f5f9" : "none",
                            transition: "background-color 0.15s ease"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                        >
                          <td style={{ 
                            ...thTdStyles, 
                            border: "none",
                            padding: "14px 16px",
                            color: "#334155"
                          }}>
                            {descripcion}
                          </td>
                          <td style={{ 
                            ...thTdStyles, 
                            border: "none",
                            padding: "14px 16px",
                            fontWeight: "600",
                            color: "#1e293b"
                          }}>
                            {item.quantity || 0}
                          </td>
                          <td style={{ 
                            ...thTdStyles, 
                            border: "none",
                            padding: "14px 16px",
                            fontWeight: "500",
                            color: "#059669"
                          }}>
                            {precioUnitario}
                          </td>
                          <td style={{ 
                            ...thTdStyles, 
                            border: "none",
                            padding: "14px 16px",
                            fontWeight: "500",
                            color: descuento !== "$0.00" ? "#dc2626" : "#94a3b8"
                          }}>
                            {descuento}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ 
                        ...thTdStyles, 
                        border: "none",
                        padding: "24px 16px",
                        textAlign: "center"
                      }}>
                        <p style={{ 
                          margin: "0",
                          color: "#94a3b8",
                          fontSize: "0.95em",
                          fontStyle: "italic"
                        }}>
                          📋 No hay ítems detallados
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
      
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </React.Fragment>
  );
};

export default FacturaRow;