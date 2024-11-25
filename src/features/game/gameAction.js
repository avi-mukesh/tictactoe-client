import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE } from "../../util/apiUrl";

export const getOngoingGames = createAsyncThunk("game/ongoing", async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/game/ongoing`);
    return data;
  } catch (error) {
    console.log("error in game action", error);
  }
});
