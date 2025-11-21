import { USERS_URL } from "../../../utils/contants";
import { apiSlice } from "../apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // LOGIN
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // REGISTER
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // LOGOUT
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Correct auto-generated hook exports
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;
