import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Share2,
  Heart,
} from "lucide-react";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";

export function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await api.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
    retry: false,
  });

  const addToCart = useCartStore((state) => state.addToCart);

  function handleAddToCart() {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.imageUrl,
      quantity: 1,
    });

    toast.success("Adicionado ao carrinho!", {
      description: `${product.name} já está na sua sacola.`,
      action: {
        label: "Ver Sacola",
        onClick: () => console.log("Ir para sacola"),
      },
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neumo-bg flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-400 animate-pulse">
          Carregando detalhes do produto...
        </p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-neumo-bg flex flex-col items-center justify-center text-white gap-6 p-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-red-500">
            Produto não encontrado
          </h2>
          <p className="text-zinc-400">
            O produto que você procura não existe ou foi removido.
          </p>
        </div>
        <Link to="/">
          <Button
            variant="outline"
            className="border-brand text-brand hover:bg-brand hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a loja
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text font-sans pb-20">
      <header className="h-16 border-b border-white/5 flex items-center px-6 lg:px-32 sticky top-0 bg-neumo-bg/95 backdrop-blur-md z-50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-brand transition-colors text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a loja
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-32 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div className="relative animate-slide-up">
            <div className="aspect-square bg-neumo-bg rounded-3xl shadow-neumo-pressed flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[100px] rounded-full pointer-events-none"></div>

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover object-center z-10 transition-transform duration-500 group-hover:scale-105"
              />

              <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neumo-bg/50 backdrop-blur-md shadow-neumo-flat flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors z-20">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            className="flex flex-col justify-center space-y-8 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-brand text-sm font-bold tracking-[0.2em] uppercase">
                  {product.category || "Coleção Exclusiva"}
                </h2>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-brand">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm text-zinc-500 font-medium">
                  Em até 10x sem juros
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-white/5" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Sobre o produto
              </h3>
              <p className="text-zinc-400 leading-relaxed text-base">
                {product.description ||
                  "Este produto é feito com materiais de alta qualidade, combinando design inovador e conforto excepcional para o seu dia a dia. Ideal para quem busca estilo sem abrir mão da performance."}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white">
                  Selecionar Tamanho
                </span>
                <span className="text-xs text-brand cursor-pointer hover:underline">
                  Guia de medidas
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {["38", "39", "40", "41", "42", "43"].map((size) => (
                  <button
                    key={size}
                    className="w-14 h-14 rounded-xl bg-neumo-bg shadow-neumo-flat text-zinc-400 font-bold hover:text-brand hover:shadow-neumo-pressed focus:text-brand focus:shadow-neumo-pressed focus:outline-none transition-all active:scale-95"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col gap-4">
              <Button
                onClick={handleAddToCart}
                className="w-full h-14 bg-brand text-neumo-bg font-extrabold text-lg hover:bg-brand/90 hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(67,187,168,0.2)] rounded-xl"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>

              {product.stock < 5 && (
                <p className="text-center text-sm text-red-400 font-medium animate-pulse">
                  Corra! Restam apenas {product.stock} unidades.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <Truck className="w-5 h-5 text-brand shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Frete Grátis</p>
                  <p className="text-xs text-zinc-500">Para todo o Brasil</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">Garantia</p>
                  <p className="text-xs text-zinc-500">30 dias para troca</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
