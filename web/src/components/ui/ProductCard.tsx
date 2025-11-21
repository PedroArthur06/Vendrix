import { Button } from "@/components/ui/button";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col rounded-2xl bg-neumo-bg p-6 shadow-neumo-flat transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-brand/10">
      <div className="aspect-square w-full flex items-center justify-center mb-4 bg-neumo-bg rounded-xl shadow-neumo-pressed overflow-hidden relative p-6">
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full scale-50 group-hover:scale-100"></div>

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain z-10 group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-2xl"
        />
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{name}</h3>
        <p className="text-brand font-medium text-lg">{price}</p>
      </div>

      <Button className="mt-6 w-full h-12 bg-neumo-bg text-zinc-400 border border-white/5 shadow-neumo-flat hover:text-white hover:bg-brand hover:border-brand active:scale-95 transition-all font-semibold tracking-wide">
        Comprar Agora
      </Button>
    </div>
  );
}
