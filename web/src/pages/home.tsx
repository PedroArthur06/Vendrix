import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingBag, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text font-sans selection:bg-brand selection:text-white pb-20">
      <header className="sticky top-0 z-50 px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl bg-neumo-bg px-6 py-3 shadow-neumo-flat">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-brand shadow-neumo-pressed flex items-center justify-center">
                <span className="font-bold text-neumo-bg">V</span>
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">
                VENDRIX
              </span>
            </div>

            <div className="hidden md:flex w-1/3 relative">
              <Input
                placeholder="Buscar sneakers..."
                className="h-10 rounded-full border-none bg-neumo-bg pl-10 text-sm shadow-neumo-pressed focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            </div>

            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  size="icon"
                  className="rounded-full bg-neumo-bg shadow-neumo-flat hover:shadow-neumo-pressed text-zinc-400 hover:text-brand transition-all"
                >
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="icon"
                className="rounded-full bg-neumo-bg shadow-neumo-flat hover:shadow-neumo-pressed text-zinc-400 hover:text-brand transition-all"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-10 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block rounded-full bg-neumo-bg px-4 py-1.5 text-sm font-medium text-brand shadow-neumo-pressed">
              Nova Coleção 2025
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-white lg:text-7xl">
              WALK THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">
                FUTURE
              </span>
            </h1>
            <p className="max-w-md text-lg text-zinc-400">
              Tecnologia de ponta e design disruptivo. Descubra os sneakers que
              vão redefinir o seu caminhar.
            </p>
            <div className="flex gap-4 pt-4">
              <Button className="h-12 px-8 rounded-xl bg-brand text-neumo-bg font-bold shadow-neumo-flat hover:brightness-110 transition-all active:scale-95">
                Explorar Loja
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-none bg-neumo-bg text-white shadow-neumo-flat hover:shadow-neumo-pressed transition-all"
              >
                Ver Detalhes
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand/10 blur-3xl"></div>

            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-neumo-bg shadow-neumo-flat flex items-center justify-center p-8 transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://img.pikbest.com/ai/illus_our/20230427/cec88ae2078344d69bd730283c951277.jpg!w700wp"
                className="w-full h-auto drop-shadow-2xl object-contain -rotate-12 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white">Mais Vendidos</h2>
            <a
              href="#"
              className="text-brand hover:underline flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              name="Nike Air Max Future"
              price="R$ 1.299,90"
              image="https://citymagazine.b-cdn.net/wp-content/uploads/2019/04/nike-throwback-future-pack-air-max-270-1.jpg"
            />

            <ProductCard
              name="Adidas Ultraboost X"
              price="R$ 999,90"
              image="https://lh5.googleusercontent.com/proxy/sqq8m-mJMXirRa9_AejuL9GHrz_nHfzj7zLehCMG3sqN8vFuV6w6V91kxj1HMoIBb8suPq5ULHsSJalWb9VLVybivx-bsB6YUsw64an8G_CpyDILg-Jrg_qcZN1zQA"
            />
            <ProductCard
              name="Yeezy Quantum Green"
              price="R$ 2.499,00"
              image="https://png.pngtree.com/png-vector/20240612/ourmid/pngtree-modern-running-shoes-isolated-on-transparent-background-png-image_12724817.png"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductCard({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-neumo-bg p-6 shadow-neumo-flat transition-all hover:-translate-y-2">
      <div className="h-48 flex items-center justify-center mb-4 bg-neumo-bg rounded-xl shadow-neumo-pressed overflow-hidden relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
      <p className="text-brand font-medium">{price}</p>
      <Button className="mt-4 w-full bg-neumo-bg text-white shadow-neumo-flat hover:text-brand hover:shadow-neumo-pressed active:scale-95 transition-all">
        Comprar
      </Button>
    </div>
  );
}
