// frontend/src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from "../../api/api";

// Thunks pour l'inscription et la connexion
export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Fonction pour récupérer les données depuis AsyncStorage
const loadTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem("token");
  const userId = await AsyncStorage.getItem("userId");
  return { token, userId };
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      AsyncStorage.removeItem("token");
      AsyncStorage.removeItem("userId");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        AsyncStorage.setItem("token", action.payload.token);
        AsyncStorage.setItem("userId", action.payload.userId);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
        AsyncStorage.setItem("token", action.payload.token);
        AsyncStorage.setItem("userId", action.payload.userId);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
