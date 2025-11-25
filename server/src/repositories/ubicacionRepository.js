// ubicacion.repository.js
import { supabase } from "../config/supabaseClient.js";

export const UbicacionRepository = {
  // Get all locations
  async getAll() {
    const { data, error } = await supabase
      .from("ubicacion")
      .select("*")
      .order("nombre", { ascending: true });

    if (error) throw new Error("Error fetching locations: " + error.message);
    return data || [];
  },

  // Get location by ID
  async getById(id) {
    const { data, error } = await supabase
      .from("ubicacion")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error fetching location: " + error.message);
    return data || null;
  },

  // Create new location
  async create(payload) {
    const { data, error } = await supabase
      .from("ubicacion")
      .insert([payload])
      .select()
      .single();

    if (error) throw new Error("Error creating location: " + error.message);
    return data;
  },

  // Update location
  async update(id, updates) {
    const { data, error } = await supabase
      .from("ubicacion")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error updating location: " + error.message);
    return data || null;
  },

  // Delete location
  async delete(id) {
    const { data, error } = await supabase
      .from("ubicacion")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error("Error deleting location: " + error.message);
    return data || null;
  }
};
