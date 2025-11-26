import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// ===============================
// Thunks
// ===============================
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  // 🚀 AJUSTADO: Acepta un objeto de parámetros que puede incluir:
  // page, limit, mainCategoryId, subCategoryId, searchQuery, etc.
  async (queryParams = {}, thunkAPI) => {
    // Definimos valores por defecto y combinamos con los queryParams recibidos
    const defaults = { page: 1, limit: 14 };
    const finalParams = { ...defaults, ...queryParams };
    
    // Construir los parámetros de URL para la llamada al backend
    const urlParams = new URLSearchParams();
    
    // Añadir solo los parámetros que tienen un valor definido y no vacío
    Object.keys(finalParams).forEach(key => {
        const value = finalParams[key];
        // Utilizamos el nombre de los parámetros del backend:
        // page, limit, mainCategoryId, subCategoryId, searchQuery, etc.
        if (value !== undefined && value !== null && value !== '') {
            urlParams.append(key, value);
        }
    });

    // Añadir timestamp para evitar el caché
    urlParams.append('timestamp', Date.now());

    try {
      // 🎯 USAMOS LA RUTA UNIFICADA DEL BACKEND
      const response = await api.get(`/products?${urlParams.toString()}`); 
      
      // El backend ahora devuelve { products, total }
      return { 
        ...response.data, 
        page: finalParams.page, 
        limit: finalParams.limit 
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener productos"
      );
    }
  }
);

// ===============================
// Buscar productos (Se mantiene, pero su funcionalidad es redundante)
// ===============================
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, thunkAPI) => {
    // NOTA: Esta lógica debería ser reemplazada por:
    // return thunkAPI.dispatch(fetchProducts({ searchQuery: query }));
    try {
      const response = await api.get(`/products/search?q=${query}`); // <- Ruta obsoleta
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al buscar productos"
      );
    }
  }
);

// ===============================
// Filtrar productos (Se mantiene, pero su funcionalidad es redundante)
// ===============================
export const filterProducts = createAsyncThunk(
  "products/filterProducts",
  async (filters, thunkAPI) => {
    // NOTA: Esta lógica debería ser reemplazada por:
    // return thunkAPI.dispatch(fetchProducts(filters));
    try {
      const response = await api.post("/products/filter", filters); // <- Ruta obsoleta (y método POST)
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al filtrar productos"
      );
    }
  }
);

// ===============================
// Obtener producto por ID (Sin cambios)
// ===============================
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`/products/${id}?timestamp=${Date.now()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener el producto"
      );
    }
  }
);

// ===============================
// Agregar nuevo producto (Sin cambios)
// ===============================
// export const addProduct = createAsyncThunk(
//   "products/addProduct",
//   async ({ data, file }, thunkAPI) => {
//     try {
//       const formData = new FormData();

//       // Añadimos los campos del producto
//       Object.keys(data).forEach(key => {
//         if (data[key] !== undefined && data[key] !== null) {
//           formData.append(key, data[key]);
//         }
//       });

//       // Añadimos archivo si existe
//       if (file) {
//         formData.append("imagen", file);
//       }

//       const response = await api.post("/products", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Error al agregar producto"
//       );
//     }
//   }
// );

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ data, file }, thunkAPI) => {
    try {
      const formData = new FormData();

      // Objeto de Mapeo: [Nombre en React Form] -> [Nombre esperado por la API/DB]
      const fieldMap = {
        name: "nombre",
        description: "descripcion",
        price: "precio",
        mainCategory: "categoria_principal_id", // Nuevo
        subCategory: "subcategoria_id",         // Nuevo
        location: "ubicacion_id",               // Nuevo
        code: "codigo",                         // Nuevo
        brand: "marca",                         // Nuevo
        stock: "existencias",                   // Nuevo
        available: "disponible",                // Nuevo
        annualSales: "ventas_anuales",          // Nuevo
        // El campo 'image' se maneja por separado con 'file'
      };

      // Recorremos los datos del formulario (data)
      Object.keys(data).forEach(key => {
        // Obtenemos el nombre de la propiedad en el backend. 
        // Si no está en el mapa, usamos el nombre de la clave original (key).
        const dbKey = fieldMap[key] || key;
        const value = data[key];

        if (value !== undefined && value !== null) {
          // Si el campo es 'disponible' (available) y es un booleano, lo convertimos a 1/0 si es necesario,
          // o lo dejamos como booleano si la API lo acepta. 
          // Aquí lo convertimos explícitamente a string (true/false) para FormData, 
          // aunque el backend puede preferir 1/0 o 'true'/'false'
          if (key === 'available') {
            formData.append(dbKey, value ? 'true' : 'false'); // O '1' : '0' si tu DB espera números
          } else {
            // Para el resto de los campos
            formData.append(dbKey, value); 
          }
        }
      });

      // Añadimos el archivo de imagen
      if (file) {
        formData.append("imagen", file); // Usa "imagen" como nombre de campo
      }
      
      // Llamada a la API
      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      // Retorna el producto recién creado
      return response.data; 
    } catch (error) {
      // Manejo de errores
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Error al agregar producto"
      );
    }
  }
);
// ===============================
// Actualizar producto 
// ===============================
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updates, file }, thunkAPI) => {
    try {
      const dataToSend = new FormData();
      if (updates.nombre) dataToSend.append("nombre", updates.nombre);
      if (updates.descripcion) dataToSend.append("descripcion", updates.descripcion);
      if (updates.precio) dataToSend.append("precio", updates.precio);
      if (file) dataToSend.append("imagen", file);

      const response = await api.put(`/products/${id}`, dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar producto"
      );
    }
  }
);


// ===============================
// top vendidos 
// ===============================
//  Obtener productos más vendidos con paginación
export const fetchTopSellingProducts = createAsyncThunk(
    "products/fetchTopSellingProducts",
    async (queryParams = {}, thunkAPI) => {
        // Valores por defecto
        const defaults = { page: 1, pageSize: 50 };
        const finalParams = { ...defaults, ...queryParams };
        
        const urlParams = new URLSearchParams();
        
        // Añadir parámetros (page, pageSize)
        Object.keys(finalParams).forEach(key => {
            const value = finalParams[key];
            if (value !== undefined && value !== null && value !== '') {
                // Usamos 'pageSize' aquí para coincidir con el backend
                urlParams.append(key, value); 
            }
        });

        urlParams.append('timestamp', Date.now());

        try {
            //  USAMOS LA RUTA ESPECÍFICA /products/top-ventas
            const response = await api.get(`/products/top-ventas?${urlParams.toString()}`); 
            
            // El backend devuelve { products, total, totalPages, currentPage, pageSize, ... }
            return { 
                ...response.data, 
                page: finalParams.page, 
                limit: finalParams.pageSize // Usamos 'limit' para consistencia en el estado
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al obtener productos más vendidos"
            );
        }
    }
);

/// thunk para los productos relacionados 
export const fetchRelatedProducts = createAsyncThunk(
  "products/fetchRelatedProducts",
  async ({ productId, limit = 10, offset = 0, sort = null }, thunkAPI) => {
    try {
      const params = new URLSearchParams();

      params.append("limit", limit);
      params.append("offset", offset);

      if (sort) params.append("sort", sort);

      const res = await api.get(
        `/products/${productId}/relacionados?${params.toString()}`
      );

      return {
        items: res.data.data,
        count: res.data.count,
        offset,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al obtener productos relacionados"
      );
    }
  }
);






// ===============================
// Slice (Sin cambios significativos en reducers/extraReducers)
// ===============================
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
    searchResults: [],
    searchLoading: false,
    searchError: null,
    filteredItems: [],
    filterLoading: false,
    filterError: null,

      related: {
      items: [],
      loading: false,
      hasMore: true,
      offset: 0,
      limit: 10
    },

    ///
    topSellingItems: [],
    topSellingTotal: 0,
    topSellingPage: 1,
    topSellingLimit: 50, // Por defecto 50 según tu lógica de backend
    topSellingLoading: false,
    topSellingError: null,
  },
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
      state.searchError = null;
    },
    clearFilteredItems(state) {
      state.filteredItems = [];
      state.filterError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ===============================
      // fetchProducts
      // ===============================
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        // AJUSTE: La respuesta del backend ya trae 'products' y 'total'.
        state.items = action.payload.products;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit || state.limit;
        
        // Cuando fetchProducts es exitoso, asumimos que estamos en el flujo principal.
        // Opcional: limpiar los resultados obsoletos de las búsquedas separadas.
        state.searchResults = []; 
        state.filteredItems = []; 
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // searchProducts (Se mantiene, pero obsoleta)
      // ===============================
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })

      // ===============================
      // filterProducts (Se mantiene, pero obsoleta)
      // ===============================
      .addCase(filterProducts.pending, (state) => {
        state.filterLoading = true;
        state.filterError = null;
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.filterLoading = false;
        state.filteredItems = action.payload.products || [];
        state.total = action.payload.total || 0;
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.filterLoading = false;
        state.filterError = action.payload;
      })

      // ===============================
      // fetchProductById
      // ===============================
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        } else {
          state.items.push(action.payload);
          state.total += 1;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===============================
      // addProduct
      // ===============================
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.total += 1;
      })

      // ===============================
      // updateProduct
      // ===============================
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;

        ///top vendidos ////
      }).addCase(fetchTopSellingProducts.pending, (state) => {
            state.topSellingLoading = true;
            state.topSellingError = null;
        })
        .addCase(fetchTopSellingProducts.fulfilled, (state, action) => {
            state.topSellingLoading = false;
            // Mapeamos los campos de la respuesta del backend
            state.topSellingItems = action.payload.products;
            state.topSellingTotal = action.payload.total;
            state.topSellingPage = action.payload.page;
            state.topSellingLimit = action.payload.limit;
        })
        .addCase(fetchTopSellingProducts.rejected, (state, action) => {
            state.topSellingLoading = false;
            state.topSellingError = action.payload;
            state.topSellingItems = [];
         /// relacionados   
        }).addCase(fetchRelatedProducts.pending, (state) => {
      state.related.loading = true;
      state.related.error = null;
    })
    .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
      const { items, count, offset } = action.payload;

      // Si offset = 0 significa que es la primera página → limpiamos
      if (offset === 0) {
        state.related.items = items;
      } else {
        // Agregar nuevos sin duplicar
        const existingIds = new Set(state.related.items.map((p) => p.id));
        const filtered = items.filter((p) => !existingIds.has(p.id));
        state.related.items.push(...filtered);
      }

      state.related.total = count;
      state.related.offset = offset;
      state.related.hasMore = items.length > 0;
      state.related.loading = false;
    })
    .addCase(fetchRelatedProducts.rejected, (state, action) => {
      state.related.error = action.payload;
      state.related.loading = false;
    });;

  },
});

export const { clearSearchResults, clearFilteredItems } = productsSlice.actions;
export default productsSlice.reducer;