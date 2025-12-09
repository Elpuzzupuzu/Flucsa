// // src/controllers/facturaController.js
// import { FacturaService } from '../services/facturaService.js';

// export const FacturaController = {

//   crearFactura: async (req, res) => {
//     try {
//       const userId = req.user?.id; // viene del authMiddleware
//       const { items, customer, payment_form } = req.body;

//       if (!items || !Array.isArray(items)) {
//         return res.status(400).json({ ok: false, message: "items es requerido y debe ser un array" });
//       }

//       // pasa customer (puede ser null) y payment_form al service
//       const factura = await FacturaService.crearFactura(userId, items, customer ?? null, payment_form ?? undefined);

//       return res.status(201).json({
//         ok: true,
//         message: "Factura generada correctamente",
//         data: factura
//       });

//     } catch (error) {
//       console.error("FacturaController.crearFactura error:", error);
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },

//   getFactura: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const factura = await FacturaService.obtenerFactura(id);

//       return res.status(200).json({
//         ok: true,
//         data: factura
//       });

//     } catch (error) {
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },

// getFacturasUser: async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const facturas = await FacturaService.obtenerFacturasDeUsuario(userId);

//     return res.status(200).json({
//       ok: true,
//       data: facturas  // Siempre un array
//     });

//   } catch (error) {
//     return res.status(500).json({ ok: false, message: error.message });
//   }
// }

// };



//////+


// src/controllers/facturaController.js
import { FacturaService } from '../services/facturaService.js';

export const FacturaController = {

  crearFactura: async (req, res) => {
    try {
      const userId = req.user?.id; // viene del authMiddleware
      const { items, customer, payment_form } = req.body;

      if (!items || !Array.isArray(items)) {
        return res.status(400).json({ ok: false, message: "items es requerido y debe ser un array" });
      }

      const factura = await FacturaService.crearFactura(
        userId,
        items,
        customer ?? null,
        payment_form ?? undefined
      );

      return res.status(201).json({
        ok: true,
        message: "Factura generada correctamente",
        data: factura
      });

    } catch (error) {
      console.error("FacturaController.crearFactura error:", error);
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
