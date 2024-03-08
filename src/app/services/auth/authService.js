import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// this method is the core of RTK Query's functionalit
// lets you define a set of "endpoints" that describe how to retrieve data from backend APIs
export const authApi = createApi({
  // reducer path is a unique key that the service will be mounted to in the store
  // it defaults to "api"
  reducerPath: "authApi",

  // basequery is used by each defined endpoint if the queryFn parameters is not specified
  // fetchBaseQuery is a wrapper around the fetch API
  baseQuery: fetchBaseQuery({
    baseUrl: "http://locahost:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
      }
    },
    // set of operations we want to perform against the server
    // two types of endpoints: query and mutation
    endpoints: (builder) => ({
      getUserDetails: builder.query({
        query: () => ({
          url: "api/user/profile",
          method: "GET",
        }),
      }),
    }),
  }),
});

// export hooks for usage in components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;
