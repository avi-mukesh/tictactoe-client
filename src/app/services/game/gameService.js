import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../util/apiUrl";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
  }),
  endpoints: (builder) => ({
    getOngoingGames: builder.query({
      query: () => ({
        url: "game/ongoing",
        method: "GET",
      }),
    }),
    getPreviousGames: builder.query({
      query: (username) => ({
        url: `game/previous?username=${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOngoingGamesQuery, useGetPreviousGamesQuery } = gameApi;
