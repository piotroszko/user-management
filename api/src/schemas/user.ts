import { z } from "zod";

export const userCreationSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string().min(8),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string().min(8),
});
