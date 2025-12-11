// src/hooks/useQuotationActions.js

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createFacturaFromQuotation } from '../../../../features/facturas/facturasSlice';
/**
 * Hook personalizado para manejar las acciones (navegación, crear factura, modal)
 * del componente de detalle de cotización.
 * @param {object} quotation - El objeto de cotización actual.
 * @param {object} currentUser - El objeto del usuario actual.
 */
const useQuotationActions = (quotation, currentUser) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Navegación hacia atrás según el rol
    const handleGoBack = useCallback(() => {
        if (currentUser.rol === "admin") {
            navigate('/admin/quotations');
        } else {
            navigate('/cotizaciones');
        }
    }, [navigate, currentUser]);

    // Lógica para crear una factura a partir de la cotización
    const handleCreateInvoice = useCallback(() => {
        console.log("🟦 handleCreateInvoice: quotation actual:", quotation);

        // --- Validaciones ---
        if (!quotation) return alert("No se encontró la cotización.");
        if (quotation.estado_cotizacion === "COMPLETADA") return alert("Esta cotización ya está COMPLETADA.");
        if (quotation.estado_cotizacion !== "GENERADA") return alert(`No se puede generar factura cuando el estado es: ${quotation.estado_cotizacion}`);
        if (!quotation.cotizaciones_items?.length) return alert("La cotización no tiene ítems válidos para generar factura.");

        // --- Preparación del Payload ---
        const itemsFactura = quotation.cotizaciones_items.map(item => ({
            producto_id: item.producto_id,
            nombre: item.nombre_producto,
            cantidad: item.cantidad,
            precio_unitario: item.precio_unitario_aplicado,
        }));

        const invoicePayload = {
            cotizacion_id: quotation.id, 
            usuario_id: quotation.usuario_id,
            total: quotation.total_cotizado,
            items: itemsFactura, 
        };

        console.log("🚚 Payload preparado para crear factura:", invoicePayload);

        // --- Dispatch de la acción de Redux ---
        dispatch(createFacturaFromQuotation(invoicePayload))
            .unwrap()
            .then(response => {
                const newFactura = response.data?.factura;
                if (!newFactura) return alert("Error: No se recibió la factura del servidor.");
                alert(`Factura ${newFactura.id} creada exitosamente.`);
            })
            .catch(err => {
                console.error("❌ Error al crear la factura:", err);
                alert(`Error al crear la factura: ${err.message || 'Ver consola para más detalles.'}`);
            });

    }, [dispatch, quotation]);

    // Manejadores del Modal
    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    // Retorna el estado del modal y las funciones de acción
    return {
        isModalOpen,
        handleGoBack,
        handleCreateInvoice,
        handleOpenModal,
        handleCloseModal,
    };
};

export default useQuotationActions;