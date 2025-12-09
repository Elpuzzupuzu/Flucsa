// src/pages/Facturas/components/FacturasFilters.jsx

import React from "react";

const FacturasFilters = ({ filter, fechaFiltro, onFilterChange, onDateChange }) => {
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      marginBottom: "20px",
      flexWrap: "wrap"
    }}>
      {/* Filtro de Ordenamiento */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: "200px"
      }}>
        <label style={{
          fontSize: "0.85em",
          fontWeight: "600",
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          📊 Ordenar por
        </label>
        <select 
          value={filter} 
          onChange={(e) => onFilterChange(e.target.value)}
          style={{
            padding: "10px 14px",
            fontSize: "0.95em",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            color: "#1e293b",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontWeight: "500",
            outline: "none"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.backgroundColor = "#ffffff";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.backgroundColor = "#f8fafc";
          }}
          onMouseEnter={(e) => {
            if (document.activeElement !== e.target) {
              e.target.style.borderColor = "#cbd5e1";
            }
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.target) {
              e.target.style.borderColor = "#e2e8f0";
            }
          }}
        >
          <option value="default">Por defecto</option>
          <option value="reciente">Más reciente</option>
          <option value="antigua">Más antigua</option>
        </select>
      </div>

      {/* Filtro de Fecha */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        minWidth: "200px"
      }}>
        <label style={{
          fontSize: "0.85em",
          fontWeight: "600",
          color: "#475569",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          📅 Filtrar por fecha
        </label>
        <input 
          type="date" 
          value={fechaFiltro} 
          onChange={onDateChange}
          style={{
            padding: "10px 14px",
            fontSize: "0.95em",
            border: "2px solid #e2e8f0",
            borderRadius: "8px",
            backgroundColor: "#f8fafc",
            color: "#1e293b",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontWeight: "500",
            outline: "none"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#3b82f6";
            e.target.style.backgroundColor = "#ffffff";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#e2e8f0";
            e.target.style.backgroundColor = "#f8fafc";
          }}
          onMouseEnter={(e) => {
            if (document.activeElement !== e.target) {
              e.target.style.borderColor = "#cbd5e1";
            }
          }}
          onMouseLeave={(e) => {
            if (document.activeElement !== e.target) {
              e.target.style.borderColor = "#e2e8f0";
            }
          }}
        />
      </div>

      {/* Indicador de filtros activos */}
      {(filter !== "default" || fechaFiltro) && (
        <div style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          backgroundColor: "#eff6ff",
          borderRadius: "8px",
          border: "1px solid #bfdbfe"
        }}>
          <span style={{
            fontSize: "0.85em",
            color: "#1e40af",
            fontWeight: "600"
          }}>
            {filter !== "default" && fechaFiltro 
              ? "2 filtros activos" 
              : "1 filtro activo"}
          </span>
          <button
            onClick={() => {
              onFilterChange("default");
              onDateChange({ target: { value: "" } });
            }}
            style={{
              background: "none",
              border: "none",
              color: "#3b82f6",
              cursor: "pointer",
              fontSize: "0.85em",
              fontWeight: "600",
              padding: "2px 6px",
              borderRadius: "4px",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#dbeafe";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            ✕ Limpiar
          </button>
        </div>
      )}
    </div>
  );
};

export default FacturasFilters;