import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Loader2 } from "lucide-react";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import type { Product } from "@/types/product";

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchTerm, 500);

  const brandFilter = searchParams.get("brand");
  const categoryFilter = searchParams.get("category");

  const { data: products = [], isLoading } = useProducts({
    brand: brandFilter,
    category: categoryFilter,
    search: debouncedSearch,
  });

  const clearFilters = () => {
    setSearchParams({});
    setSearchTerm("");
  };

  const handleSearchSubmit = () => {
    setSearchParams((prev) => {
      if (searchTerm) prev.set("search", searchTerm);
      else prev.delete("search");
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-neumo-bg p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Catálogo
            </h1>
            <p className="text-zinc-400">
              {isLoading
                ? "Carregando..."
                : `${products.length} itens encontrados`}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Buscar tecnologia..."
                className="pl-10 bg-black/20 border-zinc-800 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
              />
            </div>
            {(brandFilter || categoryFilter || searchTerm) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="border-zinc-700 text-zinc-400 hover:text-white"
              >
                <Filter className="mr-2 h-4 w-4" /> Limpar
              </Button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-brand" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.imageUrl}
              />
            ))}
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-500 text-lg">
              Nenhum artefato encontrado com esses parâmetros.
            </p>
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-brand"
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
