import { z } from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long");

const emailSchema = z.string().email("Invalid email format");

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  profile: z.object({
    name: z.string().min(1, "Name cannot be empty"),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    address: z
      .object({
        street: z.string(),
        city: z.string(),
        zipCode: z.string(),
      })
      .optional(),
  }),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});
