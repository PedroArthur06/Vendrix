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
    toast.success("Adicionado ao carrinho!");
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
    <div className="group relative flex flex-col rounded-2xl bg-neumo-bg p-6 shadow-neumo-flat transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-brand/10">
      <div className="aspect-square w-full flex items-center justify-center mb-4 bg-neumo-bg rounded-xl shadow-neumo-pressed overflow-hidden relative">
        <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full scale-50 group-hover:scale-100"></div>
        <Link to={`/product/${id}`} className="contents">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover object-center z-10 group-hover:scale-110 transition-transform duration-500 ease-out cursor-pointer"
          />
        </Link>
      </div>

      <div className="mt-2">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{name}</h3>
        <p className="text-brand font-medium text-lg">{formattedPrice}</p>
      </div>

      {/* CORREÇÃO AQUI: Div flex em vez de Button wrapper */}
      <div className="mt-6 flex gap-3 w-full">
        <Button
          variant="secondary"
          className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white border border-white/5"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>

        <Button
          className="flex-[2] bg-brand hover:bg-brand/90 text-neumo-bg font-bold"
          onClick={handleBuyNow}
        >
          <Zap className="w-4 h-4 mr-2" />
          Comprar
        </Button>
      </div>
    </div>
  );
}
