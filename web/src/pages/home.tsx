import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/GradientText";
import { Products } from "../assets/img/index";
import StarBorder from "@/components/ui/StarBorder";
import { ProductCard } from "../components/ui/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

const SNEAKER_BRANDS = [
  { name: "Nike", href: "#" },
  { name: "Adidas", href: "#" },
  { name: "Yeezy", href: "#" },
  { name: "New Balance", href: "#" },
  { name: "Puma", href: "#" },
  { name: "Vans", href: "#" },
];

const MenuItem = ({
  title,
  items,
}: {
  title: string;
  items?: { name: string; href: string }[];
}) => {
  return (
    <div className="group relative h-full flex items-center">
      <a
        href="#"
        className="relative flex items-center gap-1 px-2 py-2 text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white"
      >
        {title}
        {items && (
          <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-brand/70" />
        )}

        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand shadow-[0_0_10px_#43BBA8] transition-all duration-300 group-hover:w-full" />
      </a>

      {items && (
        <div className="absolute top-full left-0 pt-4 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
            <div className="p-2 flex flex-col gap-1">
              {items.map((brand) => (
                <a
                  key={brand.name}
                  href={brand.href}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                >
                  {brand.name}
                  <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: products, isLoading, isError } = useProducts();
  const cartCount = useCartStore((state) => state.count());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text font-sans selection:bg-brand selection:text-white pb-20">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent",
          isScrolled
            ? "bg-neumo-bg/95 backdrop-blur-md border-zinc-800 py-2 shadow-lg"
            : "bg-transparent py-6"
        )}
      >
        <div
          className={cn(
            "absolute top-0 w-full border-b border-white/5 bg-black/40 transition-opacity duration-300 hidden md:block",
            isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="max-w-7xl mx-auto px-6 h-8 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2 hover:text-brand transition-colors cursor-pointer">
              <Lock className="w-3 h-3" />
              <span>Grupo VIP Exclusivo</span>
            </div>
            <span>Frete Grátis para todo o Brasil</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-4 md:mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer z-50">
              <div className="h-10 w-10 rounded-xl bg-brand flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(67,187,168,0.3)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="font-bold text-neumo-bg text-xl relative z-10">
                  V
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white transition-all duration-500">
                VENDRIX
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              <MenuItem title="Lançamentos" />
              <MenuItem title="Sneakers" items={SNEAKER_BRANDS} />
              <MenuItem title="Vestuário" />
              <MenuItem title="Acessórios" />
            </nav>

            <div className="flex items-center gap-6 z-50">
              <div className="hidden md:flex items-center group bg-zinc-900/80 rounded-full px-4 py-2 border border-zinc-800 focus-within:border-brand focus-within:shadow-[0_0_15px_rgba(67,187,168,0.4)] transition-all duration-300">
                <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm text-white ml-2 w-24 focus:w-64 transition-all duration-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="flex items-center gap-4">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 hover:text-white hover:bg-white/5 relative transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-neumo-bg text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#43BBA8]">
                      {cartCount}
                    </span>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-zinc-400"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "fixed inset-0 bg-[#0a0a0a]/98 backdrop-blur-xl z-40 flex flex-col pt-32 px-8 transition-all duration-500 lg:hidden",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:border-brand outline-none mb-4"
            />
            {["Lançamentos", "Sneakers", "Vestuário", "Acessórios", "Sale"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-2xl font-bold text-zinc-500 hover:text-white hover:translate-x-2 transition-all duration-300 border-b border-white/5 pb-4 flex justify-between items-center group"
                >
                  {item}
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
                </a>
              )
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 lg:px-32 pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:ml-auto">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-neumo-bg px-4 py-1.5 text-sm font-medium text-brand shadow-neumo-pressed">
              Nova Coleção 2025
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              WALK THE <br />
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="text-5xl lg:text-7xl uppercase"
              >
                FUTURE
              </GradientText>
            </h1>
            <p className="max-w-md text-lg text-zinc-400">
              Tecnologia de ponta e design disruptivo. Descubra os sneakers que
              vão redefinir o seu caminhar.
            </p>
            <div className="flex gap-4 pt-4">
              <StarBorder
                as="button"
                className="h-14 w-auto min-w-[180px]"
                color="#43BBA8"
                speed="4s"
              >
                Explorar Loja
              </StarBorder>

              <Button
                variant="outline"
                className="h-14 px-8 rounded-[20px] border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-brand transition-all"
              >
                Ver Detalhes
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand/10 blur-3xl"></div>

            <div className="relative flex justify-center items-center py-12 lg:py-0 perspective-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-brand/20 blur-[80px] animate-pulse-slow pointer-events-none"></div>

              <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
              <div className="absolute w-[300px] h-[300px] border border-brand/10 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

              <div className="relative z-10 animate-float">
                <img
                  src={Products.hero}
                  alt="Sneaker do Futuro"
                  className="w-full max-w-[1200px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] filter brightness-110"
                  style={{ transform: "rotate(-15deg)" }}
                />

                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/40 blur-xl rounded-[100%] animate-shadow-breath"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white">
              {isLoading ? "Carregando Catalogo..." : "Catálogo Disponível"}
            </h2>
            <Link
              to="/products"
              className="text-brand hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isError ? (
            <div className="text-red-500">
              Erro ao carregar produtos. Verifique se o servidor está rodando.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products?.map((product) => (
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.imageUrl}
                />
              ))}

              {(!products || products.length === 0) && !isLoading && (
                <p className="text-zinc-500 col-span-3 text-center">
                  Nenhum produto encontrado no sistema.
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
