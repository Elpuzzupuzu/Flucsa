// src/services/pdfService.js
import { pdfRepository } from "../repositories/pdfRepository.js";

export const pdfService = {
  obtenerPdf: (fileName) => {
    // Aquí podrías agregar validaciones: existe en base de datos, pertenece a un producto, etc.
    return pdfRepository.getPublicUrl(fileName);
  },
};
