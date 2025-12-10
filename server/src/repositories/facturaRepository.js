
////
import { supabase } from '../config/supabaseClient.js';

export const FacturaRepository = {

  createFactura: async (facturaData) => {
    const { data, error } = await supabase
      .from('facturas')
      .insert(facturaData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
/////////////////////
  getFacturaById: async (id) => {
    const { data, error } = await supabase
      .from('facturas')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },



  /////////////////////////////

  getFacturasByUser: async (userId, page = 1, pageSize = 10, filter = 'default', date = null) => {
    let query = supabase
      .from('facturas')
      .select('*', { count: 'exact' })
      .eq('usuario_id', userId);

    // Filtros
    if (filter === 'reciente') {
      query = query.order('created_at', { ascending: false });
    } else if (filter === 'antigua') {
      query = query.order('created_at', { ascending: true });
    } else {
      query = query.order('created_at', { ascending: false }); // default
    }

    // Filtrar por fecha exacta
    if (date) {
      query = query.eq('created_at', date);
    }

    // Paginación
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Repositorio: error al obtener facturas:", error);
      throw error;
    }

    return { data, total: count };
  }

};
