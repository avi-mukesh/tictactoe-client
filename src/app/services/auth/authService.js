import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../util/apiUrl";

// this method is the core of RTK Query's functionalit
// lets you define a set of "endpoints" that describe how to retrieve data from backend APIs
export const authApi = createApi({
  // reducer path is a unique key that the service will be mounted to in the store
  // it defaults to "api"
  reducerPath: "authApi",

  // basequery is used by each defined endpoint if the queryFn parameters is not specified
  // fetchBaseQuery is a wrapper around the fetch API
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  // set of operations we want to perform against the server
  // two types of endpoints: query and mutation
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

// export hooks for usage in components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;
