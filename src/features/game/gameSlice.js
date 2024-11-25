import { createSlice } from "@reduxjs/toolkit";
import { getOngoingGames } from "./gameAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  ongoingGames: [],
};

const spectateSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOngoingGames.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOngoingGames.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.ongoingGames = payload;
    });
    builder.addCase(getOngoingGames.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default spectateSlice.reducer;
