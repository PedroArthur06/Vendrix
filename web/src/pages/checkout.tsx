import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { checkoutSchema, type CheckoutFormValues } from "@/schemas/checkout";
import { formatPrice } from "@/utils/formatPrice";

export function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      address: {
        street: "",
        number: "",
        zipCode: "",
        city: "",
      },
    },
  });

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    }
    form.setValue("address.zipCode", value, { shouldValidate: true });
  };

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);

    // Simulação da chamada para API do Stripe
    console.log("Enviando dados para o Stripe:", data);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    clearCart();
    navigate("/order-confirmed");
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neumo-bg flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="bg-zinc-900/50 p-6 rounded-full inline-block">
            <ShoppingBag className="w-12 h-12 text-zinc-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            Seu carrinho está vazio
          </h2>
          <p className="text-zinc-400">
            Adicione alguns produtos para prosseguir com o checkout.
          </p>
          <Link to="/">
            <Button className="mt-4 bg-brand hover:bg-brand/90 text-neumo-bg font-bold">
              Voltar para a loja
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neumo-bg text-neumo-text p-4 lg:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Finalizar Compra</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Coluna da Esquerda - Formulários */}
            <div className="lg:col-span-7 space-y-6">
              {/* Endereço */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5 text-brand" />
                    Endereço de Entrega
                  </CardTitle>
                  <CardDescription>
                    Informe onde você quer receber seu pedido.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">CEP</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="00000-000"
                              className="bg-black/20 border-zinc-800 text-white focus:border-brand"
                              {...field}
                              onChange={(e) => {
                                handleZipCodeChange(e);
                                field.onChange(e);
                              }}
                              maxLength={9}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Cidade
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="São Paulo"
                              className="bg-black/20 border-zinc-800 text-white focus:border-brand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_100px] gap-4">
                    <FormField
                      control={form.control}
                      name="address.street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">Rua</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Av. Paulista"
                              className="bg-black/20 border-zinc-800 text-white focus:border-brand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address.number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Número
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="123"
                              className="bg-black/20 border-zinc-800 text-white focus:border-brand"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pagamento */}
            </div>

            {/* Coluna da Direita - Resumo */}
            <div className="lg:col-span-5">
              <Card className="bg-zinc-900/50 border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-16 w-16 rounded-lg bg-white/5 p-2 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white line-clamp-2">
                            {item.name}
                          </h4>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-zinc-400">
                              Qtd: {item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-brand">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-400">
                      <span>Frete</span>
                      <span className="text-brand">Grátis</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-white pt-2">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand/90 text-neumo-bg font-bold h-12 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      "Pagar Agora"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
