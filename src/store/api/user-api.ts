import { api } from "@/store/api";
import { SignInUser, SignUpUser, TokensResponse, User } from "@/types/user";

const signApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<User, void>({
      query: () => "/users/me",
    }),
    signIn: build.mutation<TokensResponse, SignInUser>({
      query: (body) => ({
        url: "/users/sign-in",
        method: "POST",
        body,
      }),
    }),
    signUp: build.mutation<TokensResponse, SignUpUser>({
      query: (body) => ({
        url: "/users/sign-up",
        method: "POST",
        body,
      }),
    }),
    signOut: build.mutation<string, void>({
      query: () => ({
        url: "/users/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
} = signApi;
