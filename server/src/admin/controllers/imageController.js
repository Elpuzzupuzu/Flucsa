import { uploadProductImageService } from "../services/imageService.js";

/**
 * Endpoint para subir imagen de producto
 */
export const uploadProductImage = async (req, res) => {
  try {
    console.log("📌 req.file:", req.file); // Verificar que llegue el archivo
    if (!req.file) return res.status(400).json({ message: "No se recibió ningún archivo" });

    const imageUrl = await uploadProductImageService(req.file.buffer, req.file.mimetype);

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("❌ Error subiendo imagen:", error);
    res.status(500).json({ message: "Error al subir la imagen" });
  }
};
