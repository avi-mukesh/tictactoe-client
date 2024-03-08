import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authAction";

const accessToken = localStorage.getItem("accessToken") || null;

const initialState = {
  loading: false,
  userInfo: null,
  accessToken,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logging out just resets the Redux store to its initial value and clears the token from local storage
    // this isn't an asynchronous task so can create it directly within this slice
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.loading = false;
      state.userInfo = null;
      state.accessToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true; //registration successful
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      console.log("payload after logging in", payload);
      state.loading = false;
      state.userInfo = payload;
      state.accessToken = payload.accessToken;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
