import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface ProductFilters {
  brand?: string | null;
  category?: string | null;
  search?: string | null;
}

export function useProducts(filters?: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const response = await api.get("/products", {
        params: {
          brand: filters?.brand,
          category: filters?.category,
          search: filters?.search,
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
