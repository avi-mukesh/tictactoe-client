import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE } from "../../util/apiUrl";

export const getOngoingGames = createAsyncThunk("game/ongoing", async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/game/ongoing`);
    return data;
  } catch (error) {
    console.log("error in game action", error);
    // if (error.response && error.response.data.message) {
    //   console.log(error)
    //   return rejectWithValue(error.response.data.message);
    // } else {
    //   return rejectWithValue(error.message);
    // }
  }
});
