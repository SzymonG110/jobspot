import { z } from "zod";

export const SignInUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(50),
});

export type SignInUser = z.infer<typeof SignInUserSchema>;
