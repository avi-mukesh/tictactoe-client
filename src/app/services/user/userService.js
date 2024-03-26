import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../../../util/apiUrl";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE}/`,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ id, currentPassword, newPassword, confirmNewPassword }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: { currentPassword, newPassword, confirmNewPassword },
      }),
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery, useUpdatePasswordMutation } =
  userApi;
