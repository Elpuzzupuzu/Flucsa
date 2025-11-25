// subCategoriaService.js
import { SubCategoriaRepository } from "../repositories/subCategoriaRepository.js";
import { categoriaPrincipalRepository } from "../repositories/categoriaPrincipalRepository.js";

export const SubCategoriaService = {
  async getAll() {
    return await SubCategoriaRepository.getAll();
  },

  async getById(id) {
    return await SubCategoriaRepository.getById(id);
  },

  async create(data) {
    // Validate FK
    const main = await categoriaPrincipalRepository.getById(data.categoria_principal_id);
    if (!main) throw new Error("Main category not found");

    return await SubCategoriaRepository.create(data);
  },

  async update(id, updates) {
    if (updates.categoria_principal_id) {
      const main = await categoriaPrincipalRepository.getById(updates.categoria_principal_id);
      if (!main) throw new Error("Main category not found");
    }

    return await SubCategoriaRepository.update(id, updates);
  },

  async delete(id) {
    return await SubCategoriaRepository.delete(id);
  }
};
