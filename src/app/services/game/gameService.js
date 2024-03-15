import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gameApi = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  endpoints: (builder) => ({
    getOngoingGames: builder.query({
      query: () => ({
        url: "game/ongoing",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetOngoingGamesQuery } = gameApi;
