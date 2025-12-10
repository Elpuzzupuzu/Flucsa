// src/services/facturaService.js
import pkg from "facturapi";
const { default: Facturapi, PaymentForm } = pkg;

import { FacturaRepository } from '../repositories/facturaRepository.js';
import { ProductsRepository } from '../repositories/productsRepository.js';
import { UserService } from '../services/userService.js';

const facturapi = new Facturapi(process.env.FACTURAPI_SECRET_KEY);

export const FacturaService = {

  // crearFactura: async (userId, items, customerOverride = null, paymentForm = PaymentForm.EFECTIVO) => {
  //   if (!userId) throw new Error("userId is required");

  //   const user = await UserRepository.getUserById(userId);
  //   if (!user) throw new Error(`Usuario no encontrado: ${userId}`);

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

  //   if (!customer.legal_name || !customer.tax_id || !customer.tax_system || !customer.address?.zip) {
  //     throw new Error("Faltan datos fiscales del cliente.");
  //   }

  //   const itemsForFacturapi = [];
  //   for (const item of items) {
  //     if (!item.productId) throw new Error("item.productId es requerido");
  //     const producto = await ProductsRepository.getProductById(item.productId);
  //     if (!producto) throw new Error(`Producto no encontrado: ${item.productId}`);
  //     if (!producto.sat_clave_prodserv) throw new Error(`Producto ${producto.id} no tiene sat_clave_prodserv.`);

  //     itemsForFacturapi.push({
  //       quantity: item.quantity,
  //       product: {
  //         description: producto.nombre || producto.descripcion || "Producto",
  //         product_key: producto.sat_clave_prodserv,
  //         price: Number(producto.precio)
  //       }
  //     });
  //   }

  //   const invoiceBody = { customer, items: itemsForFacturapi, payment_form: paymentForm };
  //   const factura = await facturapi.invoices.create(invoiceBody);

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

  //   return facturaDB;
  // },






////////////////////////////////////////////////////////////////


///////
  

crearFactura: async (
  userId,
  items,
  customerOverride = null,
  paymentForm = PaymentForm.EFECTIVO
) => {
  console.log("🟦 [crearFactura] --- INICIO DEL SERVICIO ---");
  console.log("🟦 [crearFactura] Parámetros recibidos:", {
    userId,
    items,
    customerOverride,
    paymentForm
  });

  if (!userId) throw new Error("userId is required");

  // 🔹 1. Obtener usuario mediante servicio
  console.log("🟧 [crearFactura] Obteniendo usuario vía UserService.getUserById...");
  const user = await UserService.getUserById(userId);

  console.log("🟧 [crearFactura] Usuario obtenido:", user);

  if (!user) {
    console.log("❌ [crearFactura] Usuario NO encontrado:", userId);
    throw new Error(`Usuario no encontrado: ${userId}`);
  }

  // 🔹 2. Construir datos fiscales del cliente
  console.log("🟨 [crearFactura] Construyendo objeto customer...");

  const customer = customerOverride
    ? {
        legal_name: customerOverride.legal_name,
        email: customerOverride.email || user.correo,
        tax_id: customerOverride.tax_id,
        tax_system: customerOverride.tax_system,
        address: {
          zip: customerOverride.address?.zip || customerOverride.zip
        }
      }
    : {
        legal_name: user.nombre_fiscal,
        email: user.correo,
        tax_id: user.rfc,
        tax_system: user.regimen_fiscal,
        address: { zip: user.cp }
      };

  console.log("🟨 [crearFactura] Customer generado:");
  console.log(JSON.stringify(customer, null, 2));

  // 🔹 3. Validaciones fiscales
  console.log("🟥 [crearFactura] Validando datos fiscales...");

  if (!customer.legal_name) {
    console.log("❌ [crearFactura] ERROR: Falta legal_name");
    throw new Error("Falta el nombre fiscal (razón social).");
  }

  if (!customer.tax_id) {
    console.log("❌ [crearFactura] ERROR: Falta tax_id");
    throw new Error("Falta el RFC del cliente.");
  }

  if (!customer.tax_system) {
    console.log("❌ [crearFactura] ERROR: Falta tax_system");
    throw new Error("Falta el régimen fiscal del cliente.");
  }

  if (!customer.address?.zip) {
    console.log("❌ [crearFactura] ERROR: Falta address.zip");
    throw new Error("Falta el código postal del cliente.");
  }

  console.log("🟩 [crearFactura] Datos fiscales validados correctamente");

  // 🔹 4. Preparar ítems para Facturapi
  console.log("🟦 [crearFactura] Preparando ítems...");

  const itemsForFacturapi = [];

  for (const item of items) {
    console.log("🟦 [crearFactura] Item recibido:", item);

    const productId = item.productId || item.producto_id;
    if (!productId) {
      console.log("❌ [crearFactura] Item NO tiene productId/producto_id");
      throw new Error("Cada ítem debe incluir productId o producto_id");
    }

    const quantity = item.quantity || item.cantidad || 1;
    const priceFromFrontend = item.price || item.precio_unitario || null;

    console.log(`🟧 [crearFactura] Obteniendo producto ID: ${productId}`);
    const producto = await ProductsRepository.getProductById(productId);

    console.log("🟧 [crearFactura] Producto obtenido:", producto);

    if (!producto) {
      console.log("❌ [crearFactura] Producto NO encontrado:", productId);
      throw new Error(`Producto no encontrado: ${productId}`);
    }

    if (!producto.sat_clave_prodserv) {
      console.log("❌ [crearFactura] sat_clave_prodserv faltante:", producto.id);
      throw new Error(`Producto ${producto.id} no tiene sat_clave_prodserv.`);
    }

    const finalPrice = Number(priceFromFrontend || producto.precio);

    console.log("🟩 [crearFactura] Ítem final preparado:", {
      quantity,
      description: producto.nombre,
      product_key: producto.sat_clave_prodserv,
      finalPrice
    });

    itemsForFacturapi.push({
      quantity,
      product: {
        description: producto.nombre || producto.descripcion || "Producto",
        product_key: producto.sat_clave_prodserv,
        price: finalPrice
      }
    });
  }

  // 🔹 5. Crear cuerpo para Facturapi
  const invoiceBody = {
    customer,
    items: itemsForFacturapi,
    payment_form: paymentForm
  };

  console.log("🟦 [crearFactura] invoiceBody final enviado a Facturapi:");
  console.log(JSON.stringify(invoiceBody, null, 2));

  // 🔹 6. Crear factura en Facturapi
  console.log("🟧 [crearFactura] Enviando a Facturapi...");
  const factura = await facturapi.invoices.create(invoiceBody);

  console.log("🟩 [crearFactura] Factura generada en Facturapi:");
  console.log(JSON.stringify(factura, null, 2));

  // 🔹 7. Guardar en BD
  console.log("🟦 [crearFactura] Guardando factura en base de datos...");

  const record = await FacturaRepository.createFactura({
    usuario_id: userId,
    factura_id: factura.id,
    serie: factura.series || null,
    folio_numero: factura.folio_number || null,
    subtotal: factura.subtotal || null,
    impuesto_total: factura.taxes || null,
    total: factura.total || null,
    pdf_url: factura.pdf_url || null,
    xml_url: factura.xml_url || null,
    estado: factura.status || "valid",
    data_json: factura
  });

  console.log("🟩 [crearFactura] Factura almacenada en BD:", record);

  return record;
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
