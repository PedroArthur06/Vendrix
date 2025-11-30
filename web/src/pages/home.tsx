import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  ChevronDown,
  Lock,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/GradientText";
import StarBorder from "@/components/ui/StarBorder";
import { ProductCard } from "@/components/ui/ProductCard";
import { CartSheet } from "@/components/ui/cart-sheet";
import { useProducts } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import { Products } from "../assets/index";
import type { Product } from "@/types/product";

// --- Constants & Sub-components ---

const SNEAKER_BRANDS = [
  { name: "Nike", href: "/catalog?brand=NIKE" },
  { name: "Adidas", href: "/catalog?brand=ADIDAS" },
  { name: "Yeezy", href: "/catalog?brand=YEEZY" },
  { name: "Vendrix", href: "/catalog?brand=VENDRIX&category=FOOTWEAR" },
];

const MenuItem = ({
  title,
  items,
  href = "#",
}: {
  title: string;
  items?: { name: string; href: string }[];
  href?: string;
}) => {
  return (
    <div className="group relative h-full flex items-center">
      <Link
        to={href}
        className="relative flex items-center gap-1 px-2 py-2 text-sm font-medium text-zinc-400 transition-colors duration-300 group-hover:text-white"
      >
        {title}
        {items && (
          <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180 text-brand/70" />
        )}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-brand shadow-[0_0_10px_#43BBA8] transition-all duration-300 group-hover:w-full" />
      </Link>

      {items && (
        <div className="absolute top-full left-0 pt-4 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-brand/50 to-transparent" />
            <div className="p-2 flex flex-col gap-1">
              {items.map((brand) => (
                <Link
                  key={brand.name}
                  to={brand.href}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                >
                  {brand.name}
                  <span className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brand">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Page Component ---

export function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: products, isLoading, isError } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    // FIX 1: overflow-x-hidden aqui no container principal é OBRIGATÓRIO para evitar scroll lateral
    <div className="min-h-screen w-full bg-neumo-bg text-neumo-text font-sans selection:bg-brand selection:text-white pb-20 relative overflow-x-hidden">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 border-b border-transparent",
          isScrolled
            ? "bg-neumo-bg/95 backdrop-blur-md border-zinc-800 py-3 shadow-lg"
            : "bg-transparent py-4 sm:py-6"
        )}
      >
        {/* Top Bar (Hidden on Mobile) */}
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

        {/* Main Nav Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-2 md:mt-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group z-50">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-brand flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(67,187,168,0.3)]">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="font-bold text-neumo-bg text-lg sm:text-xl relative z-10">
                  V
                </span>
              </div>
              {/* No mobile, talvez só o logo "V" baste, ou diminua a fonte */}
              <span className="text-xl sm:text-2xl font-bold tracking-tighter text-white transition-all duration-500">
                VENDRIX
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
              <MenuItem title="Lançamentos" href="/catalog?sort=newest" />
              <MenuItem
                title="Sneakers"
                items={SNEAKER_BRANDS}
                href="/catalog"
              />
              <MenuItem title="Vestuário" href="/catalog?category=APPAREL" />
              <MenuItem
                title="Acessórios"
                href="/catalog?category=ACCESSORIES"
              />
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-6 z-50">
              {/* Search Desktop */}
              <div className="hidden md:flex items-center group bg-zinc-900/80 rounded-full px-4 py-2 border border-zinc-800 focus-within:border-brand focus-within:shadow-[0_0_15px_rgba(67,187,168,0.4)] transition-all duration-300">
                <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-brand transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent border-none outline-none text-sm text-white ml-2 w-24 focus:w-48 transition-all duration-500 placeholder:text-zinc-600"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Search Mobile Trigger (Optional if needed) */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-zinc-400 hover:text-white"
                >
                  <Search className="w-5 h-5" />
                </Button>

                <Link to="/login" className="hidden sm:block">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>

                <CartSheet />

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-zinc-400 hover:text-white hover:bg-white/5"
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
      </header>

      {/* Mobile Menu Overlay - (Ainda o antigo, vamos focar no layout primeiro) */}
      <div
        className={cn(
          "fixed inset-0 bg-[#0a0a0a] z-[55] flex flex-col pt-32 px-8 transition-all duration-500 lg:hidden",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:border-brand outline-none"
            />
          </div>
          {[
            { name: "Catálogo Completo", href: "/catalog" },
            { name: "Lançamentos", href: "/catalog?sort=newest" },
            { name: "Sneakers", href: "/catalog?category=FOOTWEAR" },
            { name: "Vestuário", href: "/catalog?category=APPAREL" },
            { name: "Acessórios", href: "/catalog?category=ACCESSORIES" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-zinc-500 hover:text-white hover:translate-x-2 transition-all duration-300 border-b border-white/5 pb-4 flex justify-between items-center group"
            >
              {item.name}
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand" />
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      {/* Adicionei 'overflow-hidden' aqui também por segurança para os círculos de fundo */}
      <main className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-32 pt-24 lg:pt-40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center lg:ml-auto">
          {/* Texto do Hero */}
          <div className="space-y-6 animate-slide-up text-center lg:text-left flex flex-col items-center lg:items-start z-10">
            <div className="inline-block rounded-full bg-neumo-bg px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-brand shadow-neumo-pressed border border-white/5">
              Nova Coleção 2025
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white lg:text-7xl leading-none sm:leading-tight text-center lg:text-left">
              WALK THE <br />
              <span className="block w-full text-center lg:text-left">
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                  className="text-4xl sm:text-5xl lg:text-7xl uppercase inline-block pr-2 pb-2 pl-6"
                >
                  FUTURE
                </GradientText>
              </span>
            </h1>

            <p className="max-w-md text-sm sm:text-lg text-zinc-400 mx-auto lg:mx-0 leading-relaxed">
              Tecnologia de ponta e design disruptivo. Descubra os sneakers que
              vão redefinir o seu caminhar.
            </p>

            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Link to="/catalog" className="w-full sm:w-auto">
                <StarBorder
                  as="button"
                  className="h-12 sm:h-16 w-full sm:w-auto min-w-0 sm:min-w-[180px] cursor-pointer text-xs sm:text-base"
                  color="#43BBA8"
                  speed="4s"
                >
                  Explorar
                </StarBorder>
              </Link>

              <Link to="/catalog?sort=popular" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="h-12 sm:h-16 w-full sm:w-auto px-4 sm:px-8 rounded-[20px] border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-brand transition-all text-xs sm:text-base font-bold whitespace-nowrap"
                >
                  Mais Vendidos
                </Button>
              </Link>
            </div>
          </div>

          {/* Imagem do Hero */}
          <div className="relative flex justify-center mt-4 lg:mt-0">
            {/* Reduzi o tamanho dos efeitos de fundo no mobile para não vazar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] rounded-full bg-brand/10 blur-3xl pointer-events-none"></div>

            <div className="relative flex justify-center items-center py-4 lg:py-0 perspective-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-brand/20 blur-[60px] animate-pulse-slow pointer-events-none"></div>

              {/* Círculos giratórios ajustados */}
              <div className="absolute w-[240px] sm:w-[400px] h-[240px] sm:h-[400px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
              <div className="absolute w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] border border-brand/10 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>

              <div className="relative z-10 animate-float">
                {/* FIX 3: Imagem contida com max-w-[85%] para não tocar nas bordas laterais */}
                <img
                  src={Products.hero}
                  alt="Sneaker do Futuro"
                  className="w-[85%] sm:w-[130%] max-w-[300px] sm:max-w-none h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] filter brightness-110 mx-auto lg:mx-0"
                  style={{ transform: "rotate(-15deg)" }}
                />
                <div className="absolute -bottom-4 sm:-bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/40 blur-xl rounded-[100%] animate-shadow-breath"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Produtos */}
        <div className="mt-16 sm:mt-32">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-10 gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              {isLoading ? "Carregando..." : "Destaques da Semana"}
            </h2>
            <Link
              to="/catalog"
              className="group relative inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white self-start sm:self-auto"
            >
              Ver Catálogo Completo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-brand shadow-[0_0_10px_#43BBA8] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {isError ? (
            <div className="text-red-500 text-center py-10">
              Erro ao carregar produtos.
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-[250px] sm:h-[400px] bg-white/5 rounded-2xl animate-pulse border border-white/5"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {products?.slice(0, 6).map((product: Product) => (
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
        </div>
      </main>
    </div>
  );
}
