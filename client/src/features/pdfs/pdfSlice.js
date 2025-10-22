// client/src/features/pdfs/pdfSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunk para obtener la URL del PDF
export const fetchPdfUrl = createAsyncThunk(
  "pdfs/fetchPdfUrl",
  async (fileName, thunkAPI) => {
    try {
      const res = await api.get(`/pdfs/${fileName}`);
      return res.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || error.message
      );
    }
  }
);

const pdfSlice = createSlice({
  name: "pdfs",
  initialState: {
    details: {},
    selectedPdf: null, // Para el modal de visualización
  },
  reducers: {
    clearPdf: (state, action) => {
      const fileName = action.payload;
      delete state.details[fileName];
    },
    setSelectedPdf: (state, action) => {
      state.selectedPdf = action.payload;
    },
    clearSelectedPdf: (state) => {
      state.selectedPdf = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPdfUrl.pending, (state, action) => {
        const fileName = action.meta.arg;
        state.details[fileName] = {
          url: null,
          status: "loading",
          error: null,
        };
      })
      .addCase(fetchPdfUrl.fulfilled, (state, action) => {
        const fileName = action.meta.arg;
        state.details[fileName] = {
          url: action.payload,
          status: "succeeded",
          error: null,
        };
      })
      .addCase(fetchPdfUrl.rejected, (state, action) => {
        const fileName = action.meta.arg;
        state.details[fileName] = {
          url: null,
          status: "failed",
          error: action.payload,
        };
      });
  },
});

export const { clearPdf, setSelectedPdf, clearSelectedPdf } = pdfSlice.actions;
export default pdfSlice.reducer;