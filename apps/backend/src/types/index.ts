import { z } from "zod";

export const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(5),
  password: z.string().min(6),
});

export const SigninSchema = z.object({
  email: z.string(),
  password: z.string(),
});
