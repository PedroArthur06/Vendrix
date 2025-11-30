import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { useCartStore } from "@/stores/cart-store";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Zap } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number | string;
  image: string;
}

export function ProductCard({ id, name, price, image }: ProductCardProps) {
  const formattedPrice = formatPrice(price);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  const product = { id, name, price: Number(price), image, quantity: 1 };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success("Adicionado!");
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    const isAuthenticated = !!localStorage.getItem("vendrix:token");
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="group relative flex flex-col w-full bg-neumo-bg p-3 sm:p-5 rounded-2xl shadow-neumo-flat transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/5 h-full justify-between border border-white/5">
      <div>
        <div className="relative w-full aspect-square mb-3 sm:mb-4 bg-zinc-900/50 rounded-xl overflow-hidden shadow-inner border border-white/5 group-hover:border-brand/20 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

          <Link
            to={`/product/${id}`}
            className="block w-full h-full cursor-pointer relative z-20"
          >
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </Link>
        </div>

        <div className="space-y-1">
          <h3 className="text-sm sm:text-base font-bold text-white leading-tight line-clamp-2 min-h-[2.5em]">
            {name}
          </h3>
          <p className="text-brand font-bold text-sm sm:text-lg">
            {formattedPrice}
          </p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="mt-3 sm:mt-4 flex gap-2 w-full pt-3 border-t border-white/5">
        <Button
          variant="secondary"
          size="icon"
          className="h-9 w-9 shrink-0 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/5 rounded-lg transition-colors"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>

        <Button
          className="flex-1 h-9 bg-brand hover:bg-brand/90 text-neumo-bg font-bold text-[10px] sm:text-xs uppercase tracking-wide rounded-lg transition-all active:scale-95 px-2 sm:px-4 gap-1 sm:gap-2"
          onClick={handleBuyNow}
        >
          <Zap className="w-3 h-3 sm:mr-1.5" />
          Comprar
        </Button>
      </div>
    </div>
  );
}
