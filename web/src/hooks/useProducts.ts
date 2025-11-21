import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  categoryName: string;
  imageUrl: string;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await api.get<Product[]>("/products");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
