import * as productsService from "../services/productsService.js";
import uploadImageToCloudinary from "../../helpers/uploadImageToCloudinary.js";
import multer from "multer";

const upload = multer(); // para procesar multipart/form-data
export const uploadMiddleware = upload.single("imagen");

// ===============================
// PRODUCTOS
// ===============================

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getAllProducts();
    if (!products || products.length === 0) {
      // Si no hay productos, devolvemos 404
      return res.status(404).json({ message: "No se encontraron productos" });
    }
    res.status(200).json(products);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);

    // Diferenciamos tipos de error
    if (error.name === "SequelizeConnectionError" || error.name === "MongoNetworkError") {
      return res.status(503).json({ message: "Error de conexión a la base de datos" });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Error de validación", details: error.message });
    }

    // Error inesperado
    res.status(500).json({ message: "Ocurrió un error inesperado al obtener productos" });
  }
};


// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    console.error("❌ Error al obtener producto:", error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// Crear producto
export const createProduct = async (req, res) => {
  try {
    const productData = req.body;

    const newProduct = await productsService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Obtener el producto actual
    const findProduct = await productsService.getProductById(id);
    if (!findProduct) return res.status(404).json({ message: "Producto no encontrado" });

    // Combinar valores nuevos con los existentes
    const updatedProduct = {
      nombre: updatedData.nombre || findProduct.nombre,
      descripcion: updatedData.descripcion || findProduct.descripcion,
      precio: updatedData.precio !== undefined ? Number(updatedData.precio) : findProduct.precio,
      imagen: updatedData.imagen || findProduct.imagen,
      categoria_principal_id: findProduct.categoria_principal_id,
      subcategoria_id: findProduct.subcategoria_id,
      ubicacion_id: findProduct.ubicacion_id,
      codigo: findProduct.codigo,
      marca: findProduct.marca,
      existencias: findProduct.existencias,
      disponible: findProduct.disponible,
      ventas_anuales: findProduct.ventas_anuales,
    };

    const data = await productsService.updateProduct(id, updatedProduct);
    res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productsService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

// ===============================
// IMAGENES (nuevo endpoint)
// ===============================

export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No se recibió ningún archivo" });

    const fileBase64 = req.file.buffer.toString("base64");
    const imageUrl = await uploadImageToCloudinary(
      `data:${req.file.mimetype};base64,${fileBase64}`
    );

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("❌ Error subiendo imagen:", error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
};
