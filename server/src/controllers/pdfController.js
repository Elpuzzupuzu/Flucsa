// src/controllers/pdfController.js
import { pdfService } from "../services/pdfService.js";

export const pdfController = {
  descargarPdf: (req, res) => {
    const { fileName } = req.params;

    if (!fileName) {
      return res.status(400).json({ error: "Debes especificar el nombre del PDF" });
    }

    const url = pdfService.obtenerPdf(fileName);
    return res.json({ url });
  },
};
