
// src/controllers/facturaController.js
import { FacturaService } from '../services/facturaService.js';
import { getQuotationDetails,updateQuotationStatus } from "../services/quotationService.js";

export const FacturaController = {

 

  
  
  
  
  
  
//  crearFactura: async (req, res) => {
//   try {
//     const userAuth = req.user; // viene del authMiddleware

//     if (!userAuth) {
//       return res.status(401).json({ ok: false, message: "No autenticado" });
//     }

//     if (userAuth.rol !== "admin") {
//       return res.status(403).json({
//         ok: false,
//         message: "No tienes permisos para crear facturas"
//       });
//     }

//     const { usuario_id, items, customer, payment_form, cotizacion_id } = req.body;

//     if (!usuario_id) {
//       return res.status(400).json({
//         ok: false,
//         message: "usuario_id del cliente es requerido"
//       });
//     }

//     if (!items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({
//         ok: false,
//         message: "items es requerido y debe ser un array con elementos"
//       });
//     }

//     if (!cotizacion_id) {
//       return res.status(400).json({
//         ok: false,
//         message: "cotizacion_id es requerido"
//       });
//     }

//     // Validar estado de la cotización
//     const quotation = await getQuotationDetails(cotizacion_id);
//     if (!quotation) {
//       return res.status(404).json({
//         ok: false,
//         message: "La cotización no existe"
//       });
//     }

//     if (quotation.estado_cotizacion === "COMPLETADA") {
//       return res.status(400).json({
//         ok: false,
//         message: "Esta cotización ya fue COMPLETADA y no puede generar factura"
//       });
//     }

//     if (quotation.estado_cotizacion !== "GENERADA") {
//       return res.status(400).json({
//         ok: false,
//         message: `No se puede generar factura porque la cotización está en estado: ${quotation.estado_cotizacion}`
//       });
//     }

//     // Crear factura
//     const factura = await FacturaService.crearFactura(
//       usuario_id,
//       items,
//       customer ?? null,
//       payment_form ?? undefined
//     );

//     if (!factura) {
//       return res.status(500).json({
//         ok: false,
//         message: "No se pudo crear la factura"
//       });
//     }

//     // Actualizar estado de la cotización → COMPLETADO
//     const cotizacionActualizada = await updateQuotationStatus(
//       cotizacion_id,
//       "COMPLETADA"
//     );

//     // RESPUESTA FINAL con estructura `data` compatible con frontend
//     return res.status(201).json({
//       ok: true,
//       message: "Factura generada correctamente",
//       data: {
//         factura,
//         cotizacion: cotizacionActualizada
//       }
//     });

//   } catch (error) {
//     console.error("FacturaController.crearFactura error:", error);

//     const knownErrors = [
//       "userId is required",
//       "userId es requerido",
//       "Usuario no encontrado",
//       "Falta el nombre fiscal (razón social).",
//       "Falta el RFC del cliente.",
//       "Falta el régimen fiscal del cliente.",
//       "Falta el código postal del cliente.",
//       "Cada ítem debe incluir productId o producto_id",
//       "Producto no encontrado"
//     ];

//     if (knownErrors.includes(error.message)) {
//       return res.status(400).json({ ok: false, message: error.message });
//     }

//     return res.status(500).json({ ok: false, message: error.message });
//   }
// },


  crearFactura: async (req, res) => {
  try {
    const userAuth = req.user; // viene del authMiddleware

    if (!userAuth) {
      return res.status(401).json({ ok: false, message: "No autenticado" });
    }

    // 🔹 Validar que sea ADMIN
    if (userAuth.rol !== "admin") {
      return res.status(403).json({
        ok: false,
        message: "No tienes permisos para crear facturas"
      });
    }

    const { usuario_id, items, customer, payment_form, cotizacion_id } = req.body;

    // 🔹 Validar usuario_id
    if (!usuario_id) {
      return res.status(400).json({
        ok: false,
        message: "usuario_id del cliente es requerido"
      });
    }

    // 🔹 Validar items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        ok: false,
        message: "items es requerido y debe ser un array con elementos"
      });
    }

    // 🔹 Validar cotizacion_id
    if (!cotizacion_id) {
      return res.status(400).json({
        ok: false,
        message: "cotizacion_id es requerido"
      });
    }

    // =========================================================
    // Validación del estado de la cotización
    // =========================================================

    console.log("🟦 Buscando cotización para validar estado...", cotizacion_id);

    const quotation = await getQuotationDetails(cotizacion_id);

    if (!quotation) {
      return res.status(404).json({
        ok: false,
        message: "La cotización no existe"
      });
    }

    console.log("🟨 Estado actual de la cotización:", quotation.estado_cotizacion);

    if (quotation.estado_cotizacion === "COMPLETADA") {
      return res.status(400).json({
        ok: false,
        message: "Esta cotización ya fue COMPLETADA y no puede generar factura"
      });
    }

    if (quotation.estado_cotizacion !== "GENERADA") {
      return res.status(400).json({
        ok: false,
        message: `No se puede generar factura porque la cotización está en estado: ${quotation.estado_cotizacion}`
      });
    }

    // =========================================================
    // Crear factura
    // =========================================================
    console.log("🧾 Creando factura...");

    const factura = await FacturaService.crearFactura(
      usuario_id,
      items,
      customer ?? null,
      payment_form ?? undefined
    );

    if (!factura) {
      return res.status(500).json({
        ok: false,
        message: "No se pudo crear la factura"
      });
    }

    // =========================================================
    // Actualizar estado de cotización → COMPLETADO
    // =========================================================
    console.log("🔄 Actualizando estado de cotización a COMPLETADO...");

    const cotizacionActualizada = await updateQuotationStatus(
      cotizacion_id,
      "COMPLETADA"
    );

    // =========================================================
    // Respuesta final con compatibilidad para frontend
    // =========================================================
    return res.status(201).json({
      ok: true,
      message: "Factura generada correctamente",
      data: {
        factura,
        cotizacion: cotizacionActualizada
      }
    });

  } catch (error) {
    console.error("FacturaController.crearFactura error:", error);

    const knownErrors = [
      "userId is required",
      "userId es requerido",
      "Usuario no encontrado",
      "Falta el nombre fiscal (razón social).",
      "Falta el RFC del cliente.",
      "Falta el régimen fiscal del cliente.",
      "Falta el código postal del cliente.",
      "Cada ítem debe incluir productId o producto_id",
      "Producto no encontrado"
    ];

    if (knownErrors.includes(error.message)) {
      return res.status(400).json({ ok: false, message: error.message });
    }

    return res.status(500).json({ ok: false, message: error.message });
  }
},

  
  getFactura: async (req, res) => {
    try {
      const { id } = req.params;
      const factura = await FacturaService.obtenerFactura(id);

      return res.status(200).json({
        ok: true,
        data: factura
      });

    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  getFacturasUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const filter = req.query.filter || 'default'; // 'default', 'reciente', 'antigua'
      const date = req.query.date || null; // 'YYYY-MM-DD'

      const facturas = await FacturaService.obtenerFacturasDeUsuario(userId, page, pageSize, filter, date);

      return res.status(200).json(facturas);

    } catch (error) {
      console.error("FacturaController.getFacturasUser error:", error);
      return res.status(500).json({ ok: false, message: error.message });
    }
  }

};
