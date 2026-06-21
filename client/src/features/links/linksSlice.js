import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialAnalysis = {
  totalLinks: 0,
  totalClicks: 0,
  links: [],
};

export const fetchAnalysis = createAsyncThunk(
  "links/fetchAnalysis",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/links/analysis");
      return response.data.analysis;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch analysis",
      );
    }
  },
);

export const createLink = createAsyncThunk(
  "links/createLink",
  async (payload, thunkAPI) => {
    try {
      await api.post("/links", payload);
      await thunkAPI.dispatch(fetchAnalysis());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create link",
      );
    }
  },
);

export const updateLink = createAsyncThunk(
  "links/updateLink",
  async ({ id, payload }, thunkAPI) => {
    try {
      await api.put(`/links/${id}`, payload);
      await thunkAPI.dispatch(fetchAnalysis());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update link",
      );
    }
  },
);

export const removeLink = createAsyncThunk(
  "links/removeLink",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/links/${id}`);
      await thunkAPI.dispatch(fetchAnalysis());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete link",
      );
    }
  },
);

const linksSlice = createSlice({
  name: "links",
  initialState: {
    analysis: initialAnalysis,
    loading: false,
    actionLoading: false,
    error: null,
  },
  reducers: {
    clearLinksError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalysis.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalysis.fulfilled, (state, action) => {
        state.loading = false;
        state.analysis = action.payload;
      })
      .addCase(fetchAnalysis.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.analysis = initialAnalysis;
      })
      .addCase(createLink.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(createLink.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(createLink.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateLink.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateLink.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateLink.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(removeLink.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeLink.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(removeLink.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLinksError } = linksSlice.actions;

export default linksSlice.reducer;
