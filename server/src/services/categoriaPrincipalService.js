import { categoriaPrincipalRepository } from "../repositories/categoriaPrincipalRepository.js";

export const categoriaPrincipalService = {
  async getAll() {
    return await categoriaPrincipalRepository.getAll();
  },

  async getById(id) {
    return await categoriaPrincipalRepository.getById(id);
  },

  async create(data) {
    return await categoriaPrincipalRepository.create(data);
  },

  async update(id, updates) {
    return await categoriaPrincipalRepository.update(id, updates);
  },

  async delete(id) {
    return await categoriaPrincipalRepository.delete(id);
  }
};
