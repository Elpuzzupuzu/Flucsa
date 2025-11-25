import { supabase } from "../config/supabaseClient.js";

export const categoriaPrincipalRepository = {
  async getAll() {
    const { data, error } = await supabase
      .from("categoria_principal")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) throw new Error("Error fetching main categories: " + error.message);
    return data || [];
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("categoria_principal")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error fetching main category: " + error.message);
    return data || null;
  },

  async create(payload) {
    const { data, error } = await supabase
      .from("categoria_principal")
      .insert([payload])
      .select()
      .single();

    if (error) throw new Error("Error creating main category: " + error.message);
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from("categoria_principal")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error updating main category: " + error.message);
    return data || null;
  },

  async delete(id) {
    const { data, error } = await supabase
      .from("categoria_principal")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error deleting main category: " + error.message);
    return data || null;
  }
};
