// ubicacion.controller.js
import { UbicacionService } from "../services/ubicacionService.js";

export const UbicacionController = {
  async getAll(req, res) {
    try {
      const data = await UbicacionService.getAll();
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await UbicacionService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await UbicacionService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await UbicacionService.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await UbicacionService.delete(req.params.id);
      res.json({ message: "Deleted successfully", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
