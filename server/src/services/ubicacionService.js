// ubicacionService.js
import { UbicacionRepository } from "../repositories/ubicacionRepository.js";

export const UbicacionService = {
  async getAll() {
    return await UbicacionRepository.getAll();
  },

  async getById(id) {
    return await UbicacionRepository.getById(id);
  },

  async create(data) {
    return await UbicacionRepository.create(data);
  },

  async update(id, updates) {
    return await UbicacionRepository.update(id, updates);
  },

  async delete(id) {
    return await UbicacionRepository.delete(id);
  }
};
