import { z } from "zod";

export const checkoutSchema = z.object({
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    zipCode: z.string().min(9, "CEP inválido"),
    city: z.string().min(1, "Cidade obrigatória"),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
