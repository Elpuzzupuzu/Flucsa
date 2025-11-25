import { categoriaPrincipalService } from "../services/categoriaPrincipalService.js";

export const categoriaPrincipalController = {
  async getAll(req, res) {
    try {
      const data = await categoriaPrincipalService.getAll();
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await categoriaPrincipalService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const data = await categoriaPrincipalService.create(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const data = await categoriaPrincipalService.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const data = await categoriaPrincipalService.delete(req.params.id);
      res.json({ message: "Deleted successfully", data });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
