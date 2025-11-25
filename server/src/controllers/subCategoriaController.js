// subCategoriaController.js
import { SubCategoriaService } from "../services/subCategoriaService.js";

export const SubCategoriaController = {
  async getAll(req, res) {
    try {
      const data = await SubCategoriaService.getAll();
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await SubCategoriaService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await SubCategoriaService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await SubCategoriaService.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await SubCategoriaService.delete(req.params.id);
      res.json({ message: "Deleted successfully", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
