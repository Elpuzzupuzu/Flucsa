// src/pages/Facturas/user/FacturasList.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFacturas,
  setFacturasFilter,
  setFacturasPage,
} from "../../../features/facturas/facturasSlice";

// Importamos los componentes de presentación modularizados
import FacturasFilters from "../user/components/FacturasFilters";
import FacturasTable from "../user/components/FacturasTable";
import FacturasPagination from "../user/components/FacturasPagination";

const FacturasList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, page, totalPages, filter, date } = useSelector(
    (state) => state.facturas
  );

  const [fechaFiltro, setFechaFiltro] = useState(date || "");

  // ******* Lógica de Efecto (Fetch Data) *******
  useEffect(() => {
    dispatch(fetchFacturas({ page, filter, date: fechaFiltro }));
  }, [dispatch, page, filter, fechaFiltro]);

  // ******* Handlers de Filtros *******

  const handleFilterChange = (newFilter) => {
    dispatch(setFacturasFilter({ filter: newFilter, date: fechaFiltro }));
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFechaFiltro(newDate);
    dispatch(setFacturasFilter({ filter, date: newDate }));
  };

  // ******* Handlers de Paginación *******

  const handlePrevPage = () => {
    if (page > 1) dispatch(setFacturasPage(page - 1));
  };

  const handleNextPage = () => {
    if (page < totalPages) dispatch(setFacturasPage(page + 1));
  };

  // ******* Renderizado *******

  return (
    <div style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "32px 24px",
      backgroundColor: "#f8fafc",
      minHeight: "100vh"
    }}>
      {/* Header */}
      <div style={{
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        gap: "12px"
      }}>
        <div style={{
          width: "4px",
          height: "36px",
          backgroundColor: "#3b82f6",
          borderRadius: "2px"
        }}></div>
        <h2 style={{
          fontSize: "2em",
          fontWeight: "700",
          color: "#1e293b",
          margin: "0",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          Mis Facturas
          <span style={{ fontSize: "0.9em" }}>📑</span>
        </h2>
      </div>

      {/* Filtros */}
      <FacturasFilters
        filter={filter}
        fechaFiltro={fechaFiltro}
        onFilterChange={handleFilterChange}
        onDateChange={handleDateChange}
      />
      
      {/* Contenido Principal */}
      {loading ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #3b82f6",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}></div>
          <p style={{
            marginTop: "20px",
            fontSize: "1.05em",
            color: "#64748b",
            fontWeight: "500"
          }}>
            Cargando facturas...
          </p>
        </div>
      ) : error ? (
        <div style={{
          padding: "40px 20px",
          backgroundColor: "#fef2f2",
          border: "2px solid #fecaca",
          borderRadius: "12px",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "3em",
            marginBottom: "12px"
          }}>❌</div>
          <p style={{
            fontSize: "1.1em",
            color: "#991b1b",
            fontWeight: "600",
            margin: "0"
          }}>
            Error al cargar facturas
          </p>
          <p style={{
            fontSize: "0.95em",
            color: "#dc2626",
            marginTop: "8px"
          }}>
            {error}
          </p>
          <button
            onClick={() => dispatch(fetchFacturas({ page, filter, date: fechaFiltro }))}
            style={{
              marginTop: "20px",
              padding: "10px 24px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "0.95em",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#dc2626";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#ef4444";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Reintentar
          </button>
        </div>
      ) : items.length === 0 ? (
        <div style={{
          padding: "60px 20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          border: "2px dashed #e2e8f0"
        }}>
          <div style={{
            fontSize: "4em",
            marginBottom: "16px",
            opacity: "0.5"
          }}>🔎</div>
          <p style={{
            fontSize: "1.2em",
            color: "#64748b",
            fontWeight: "600",
            margin: "0"
          }}>
            No se encontraron facturas
          </p>
          <p style={{
            fontSize: "0.95em",
            color: "#94a3b8",
            marginTop: "8px"
          }}>
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <>
          {/* Información de resultados */}
          <div style={{
            marginBottom: "16px",
            padding: "12px 16px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            fontSize: "0.9em",
            color: "#64748b"
          }}>
            <span style={{ fontWeight: "500" }}>
              📊 Mostrando {items.length} factura{items.length !== 1 ? "s" : ""}
            </span>
            <span style={{ 
              backgroundColor: "#f1f5f9",
              padding: "4px 12px",
              borderRadius: "6px",
              fontWeight: "600",
              color: "#475569"
            }}>
              Página {page} de {totalPages}
            </span>
          </div>

          {/* Tabla */}
          <FacturasTable items={items} />
          
          {/* Paginación */}
          <FacturasPagination
            page={page}
            totalPages={totalPages}
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
          />
        </>
      )}

      {/* Estilos para la animación */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FacturasList;