import { ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function CartSheet() {
  const { items, removeFromCart, clearCart, count } = useCartStore();

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white hover:bg-white/5 relative transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          {count() > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand text-neumo-bg text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#43BBA8]">
              {count()}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md bg-neumo-bg border-l border-white/5 text-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand" />
            Meu Carrinho ({count()})
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 py-6 pr-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 min-h-[300px]">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Sua sacola está vazia.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1 text-zinc-200">
                        {item.name}
                      </h4>
                      <p className="text-brand font-bold text-sm mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-zinc-400 bg-black/20 px-2 py-1 rounded-lg">
                        <span>Qtd: {item.quantity}</span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-white/10">
            <Separator className="bg-white/10" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Subtotal</span>
              <span className="font-bold text-white text-lg">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="grid gap-3">
              <Button className="w-full h-12 bg-brand text-neumo-bg font-bold hover:bg-brand/90">
                Finalizar Compra <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/40 bg-transparent"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
