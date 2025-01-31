// frontend/src/redux/slices/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// Thunk pour récupérer les messages avec un utilisateur spécifique
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/chat/messages/${userId}`);
      return { userId, messages: response.data };
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Thunk pour envoyer un message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ receiver, message }, { getState, rejectWithValue }) => {
    try {
      const response = await API.post("/chat/send", { receiver, message });
      return { userId: receiver, message: response.data };
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: {}, // { userId: [messages] }
    loading: false,
    error: null,
  },
  reducers: {
    receiveMessage: (state, action) => {
      const { sender, receiver } = action.payload;
      const userId = sender === state.currentUser ? receiver : sender;
      if (!state.messages[userId]) {
        state.messages[userId] = [];
      }
      state.messages[userId].push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMessages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages[action.payload.userId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // sendMessage
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { userId, message } = action.payload;
        if (!state.messages[userId]) {
          state.messages[userId] = [];
        }
        state.messages[userId].push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { receiveMessage } = messageSlice.actions;
export default messageSlice.reducer;
