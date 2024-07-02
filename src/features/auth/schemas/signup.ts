import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(50),
  firstName: z.string().trim().min(2).max(50),
  lastName: z.string().trim().min(2).max(50),
});

export type CreateUser = z.infer<typeof CreateUserSchema>;
