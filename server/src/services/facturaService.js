// // src/services/facturaService.js
// import pkg from "facturapi";
// const { default: Facturapi, PaymentForm } = pkg;

// import { FacturaRepository } from '../repositories/facturaRepository.js';
// import { ProductsRepository } from '../repositories/productsRepository.js';
// import { UserRepository } from '../repositories/userRepository.js';

// const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY);

// export const FacturaService = {

//   /**
//    * userId: id del usuario autenticado (UUID)
//    * items: [{ productId, quantity }]
//    * customerOverride: optional { legal_name, email, tax_id, tax_system, address:{zip} }
//    * paymentForm: optional string o PaymentForm enum
//    */
//  crearFactura: async (userId, items, customerOverride = null, paymentForm = PaymentForm.EFECTIVO) => {

//   console.log("📌 [crearFactura] userId recibido:", userId);
//   console.log("📌 [crearFactura] items recibidos:", items);
//   console.log("📌 [crearFactura] customerOverride recibido:", customerOverride);

//   if (!userId) throw new Error("userId is required");

//   // obtener usuario DB (si hace falta campos por defecto)
//   const user = await UserRepository.getUserById(userId);
//   if (!user) throw new Error(`Usuario no encontrado: ${userId}`);
//   console.log("📌 [crearFactura] usuario encontrado:", user);

//   // construir customer final (preferir override)
//   const customer = customerOverride ? {
//     legal_name: customerOverride.legal_name,
//     email: customerOverride.email ?? user.correo,
//     tax_id: customerOverride.tax_id,
//     tax_system: customerOverride.tax_system,
//     address: {
//       zip: customerOverride.address?.zip ?? customerOverride.zip
//     }
//   } : {
//     legal_name: user.nombre_fiscal,
//     email: user.correo,
//     tax_id: user.rfc,
//     tax_system: user.regimen_fiscal,
//     address: { zip: user.cp }
//   };

//   console.log("📌 [crearFactura] customer final armado:", customer);

//   // valida customer mínimo para Facturapi
//   if (!customer.legal_name || !customer.tax_id || !customer.tax_system || !customer.address?.zip) {
//     throw new Error("Faltan datos fiscales del cliente. Provee customerOverride o rellena campos fiscales en la tabla usuarios.");
//   }

//   // convertir items -> formato que Facturapi espera
//   const itemsForFacturapi = [];
//   for (const item of items) {
//     if (!item.productId) throw new Error("item.productId es requerido");
//     const producto = await ProductsRepository.getProductById(item.productId);
//     if (!producto) throw new Error(`Producto no encontrado: ${item.productId}`);

//     if (!producto.sat_clave_prodserv) {
//       throw new Error(`Producto ${producto.id} no tiene sat_clave_prodserv configurada.`);
//     }

//     const itemFacturapi = {
//       quantity: item.quantity,
//       product: {
//         description: producto.nombre || producto.descripcion || "Producto",
//         product_key: producto.sat_clave_prodserv,
//         price: Number(producto.precio)
//       }
//     };
//     console.log("📌 [crearFactura] item convertido:", itemFacturapi);
//     itemsForFacturapi.push(itemFacturapi);
//   }

//   console.log("📌 [crearFactura] itemsForFacturapi final:", itemsForFacturapi);

//   // construir body EXACTO para Facturapi
//   const invoiceBody = {
//     customer,
//     items: itemsForFacturapi,
//     payment_form: paymentForm
//   };
//   console.log("📌 [crearFactura] body Facturapi a enviar:", invoiceBody);

//   // llamar a Facturapi
//   const factura = await facturapi.invoices.create(invoiceBody);
//   console.log("📌 [crearFactura] respuesta Facturapi:", factura);

//   // guardar en supabase
//   const facturaDB = await FacturaRepository.createFactura({
//     usuario_id: userId,
//     factura_id: factura.id,
//     serie: factura.series ?? null,
//     folio_numero: factura.folio_number ?? null,
//     subtotal: factura.subtotal ?? null,
//     impuesto_total: factura.taxes ?? null,
//     total: factura.total ?? null,
//     pdf_url: factura.pdf_url ?? null,
//     xml_url: factura.xml_url ?? null,
//     estado: factura.status ?? "valid",
//     data_json: factura
//   });

//   console.log("📌 [crearFactura] factura guardada en DB:", facturaDB);

//   return facturaDB;
// },


//   obtenerFactura: async (id) => {
//     return await FacturaRepository.getFacturaById(id);
//   },

// // Servicio para obtener facturas de usuario
// obtenerFacturasDeUsuario : async (userId) => {
//   console.log("Servicio: obtenerFacturasDeUsuario llamado con userId:", userId);

//   // Llamada al repositorio
//   const facturas = await FacturaRepository.getFacturasByUser(userId);
//   console.log("Repositorio: data obtenida:", facturas);

//   // Transformamos los items para aplanarlos
//   const facturasAplanadas = facturas.map(factura => {
//     const itemsAplanados = factura.data_json.items.map(item => ({
//       factura_id: factura.factura_id,
//       uuid: factura.data_json.uuid,
//       serie: factura.serie,
//       folio_numero: factura.folio_numero,
//       total_factura: factura.total,
//       verification_url: factura.data_json.verification_url,

//       // Campos del item
//       description: item.product.description,
//       unit_key: item.product.unit_key,
//       unit_name: item.product.unit_name,
//       price: item.product.price,
//       quantity: item.quantity,
//       tax_included: item.product.tax_included,
//       taxes: item.product.taxes,
//       discount: item.discount
//     }));

//     return {
//       ...factura,
//       items: itemsAplanados
//     };
//   });

//   console.log("Servicio: facturas aplanadas:", facturasAplanadas);
//   return {
//     ok: true,
//     data: facturasAplanadas
//   };
// },



// };


// src/services/facturaService.js
import pkg from "facturapi";
const { default: Facturapi, PaymentForm } = pkg;

import { FacturaRepository } from '../repositories/facturaRepository.js';
import { ProductsRepository } from '../repositories/productsRepository.js';
import { UserRepository } from '../repositories/userRepository.js';

const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY);

export const FacturaService = {

  crearFactura: async (userId, items, customerOverride = null, paymentForm = PaymentForm.EFECTIVO) => {
    if (!userId) throw new Error("userId is required");

    const user = await UserRepository.getUserById(userId);
    if (!user) throw new Error(`Usuario no encontrado: ${userId}`);

    const customer = customerOverride ? {
      legal_name: customerOverride.legal_name,
      email: customerOverride.email ?? user.correo,
      tax_id: customerOverride.tax_id,
      tax_system: customerOverride.tax_system,
      address: {
        zip: customerOverride.address?.zip ?? customerOverride.zip
      }
    } : {
      legal_name: user.nombre_fiscal,
      email: user.correo,
      tax_id: user.rfc,
      tax_system: user.regimen_fiscal,
      address: { zip: user.cp }
    };

    if (!customer.legal_name || !customer.tax_id || !customer.tax_system || !customer.address?.zip) {
      throw new Error("Faltan datos fiscales del cliente.");
    }

    const itemsForFacturapi = [];
    for (const item of items) {
      if (!item.productId) throw new Error("item.productId es requerido");
      const producto = await ProductsRepository.getProductById(item.productId);
      if (!producto) throw new Error(`Producto no encontrado: ${item.productId}`);
      if (!producto.sat_clave_prodserv) throw new Error(`Producto ${producto.id} no tiene sat_clave_prodserv.`);

      itemsForFacturapi.push({
        quantity: item.quantity,
        product: {
          description: producto.nombre || producto.descripcion || "Producto",
          product_key: producto.sat_clave_prodserv,
          price: Number(producto.precio)
        }
      });
    }

    const invoiceBody = { customer, items: itemsForFacturapi, payment_form: paymentForm };
    const factura = await facturapi.invoices.create(invoiceBody);

    const facturaDB = await FacturaRepository.createFactura({
      usuario_id: userId,
      factura_id: factura.id,
      serie: factura.series ?? null,
      folio_numero: factura.folio_number ?? null,
      subtotal: factura.subtotal ?? null,
      impuesto_total: factura.taxes ?? null,
      total: factura.total ?? null,
      pdf_url: factura.pdf_url ?? null,
      xml_url: factura.xml_url ?? null,
      estado: factura.status ?? "valid",
      data_json: factura
    });

    return facturaDB;
  },




  obtenerFactura: async (id) => {
    return await FacturaRepository.getFacturaById(id);
  },



  
  obtenerFacturasDeUsuario: async (userId, page = 1, pageSize = 10, filter = 'default', date = null) => {
    // Llamada al repositorio con paginación y filtros
    const { data, total } = await FacturaRepository.getFacturasByUser(userId, page, pageSize, filter, date);

    // Aplanar items
    const facturasAplanadas = data.map(factura => {
      const itemsAplanados = factura.data_json.items.map(item => ({
        factura_id: factura.factura_id,
        uuid: factura.data_json.uuid,
        serie: factura.serie,
        folio_numero: factura.folio_numero,
        total_factura: factura.total,
        verification_url: factura.data_json.verification_url,
        description: item.product.description,
        unit_key: item.product.unit_key,
        unit_name: item.product.unit_name,
        price: item.product.price,
        quantity: item.quantity,
        tax_included: item.product.tax_included,
        taxes: item.product.taxes,
        discount: item.discount
      }));

      return { ...factura, items: itemsAplanados };
    });

    return {
      ok: true,
      data: facturasAplanadas,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  },

};
