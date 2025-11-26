import { z } from "zod";

export const checkoutSchema = z.object({
  address: z.object({
    zipCode: z.string().min(9, "CEP inválido"),
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro obrigatório"),
    city: z.string().min(1, "Cidade obrigatória"),
    state: z.string().length(2, "UF inválida"),
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
