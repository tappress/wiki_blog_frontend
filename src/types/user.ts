import * as z from "zod";

export const signInUserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

export type SignInUser = z.infer<typeof signInUserSchema>;

export const signUpUserSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    username: z.string().min(3, {
      message: "Username must be at least 3 characters long.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpUser = z.infer<typeof signUpUserSchema>;

export interface User {
  id: string;
  username: string;
  is_admin: boolean;
}


export interface TokensResponse {
  access_token: string;
  refresh_token: string;
}