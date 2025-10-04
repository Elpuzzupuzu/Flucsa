// src/admin/services/productsService.js
import { supabase } from '../../../src/config/supabaseClient.js'; // O tu cliente de BD

export const getAllProducts = async () => {
  const { data, error } = await supabase.from('productos').select('*');
  if (error) throw error;
  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase.from('productos').select('*').eq('id', id).single();
  if (error) return null;
  return data;
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase.from('productos').insert([productData]).single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (id, updatedData) => {
  const { data, error } = await supabase.from('productos').update(updatedData).eq('id', id).single();
  if (error) return null;
  return data;
};

export const deleteProduct = async (id) => {
  const { data, error } = await supabase.from('productos').delete().eq('id', id);
  if (error) return null;
  return data.length > 0;
};
