// subCategoriaRepository.js
import { supabase } from "../config/supabaseClient.js";

export const SubCategoriaRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("subcategoria")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) throw new Error("Error fetching subcategories: " + error.message);
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("subcategoria")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error fetching subcategory: " + error.message);
    return data || null;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("subcategoria")
      .insert([payload])
      .select()
      .single();

    if (error) throw new Error("Error creating subcategory: " + error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from("subcategoria")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error updating subcategory: " + error.message);
    return data || null;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("subcategoria")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error deleting subcategory: " + error.message);
    return data || null;
  }
};
