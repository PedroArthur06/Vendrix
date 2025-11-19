import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name cannot be empty"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than zero"),
  sku: z.string().min(1, "SKU cannot be empty"),
  categoryId: z.string().uuid("Category ID must be a valid UUID"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative")
    .default(0),
});
