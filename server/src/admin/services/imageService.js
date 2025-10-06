import uploadImageToCloudinary from "../../helpers/uploadImageToCloudinary.js";

/**
 * Sube un archivo a Cloudinary y retorna la URL
 * @param {Buffer} fileBuffer - El buffer del archivo
 * @param {string} mimetype - El tipo MIME del archivo
 * @returns {Promise<string>} - URL de la imagen subida
 */
export const uploadProductImageService = async (fileBuffer, mimetype) => {
  if (!fileBuffer) throw new Error("No se recibió archivo");

  const fileBase64 = fileBuffer.toString("base64");
  const imageUrl = await uploadImageToCloudinary(`data:${mimetype};base64,${fileBase64}`);

  return imageUrl;
};
