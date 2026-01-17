import { z } from "zod";

//firstName, lastName, userName, email, password

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).nonempty("First name is required"),
    lastName: z.string().min(2).nonempty("Last name is required"),
    userName: z.string().min(2).nonempty("User name is required"),
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
  }),
});
