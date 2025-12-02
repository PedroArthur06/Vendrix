import { useState, useCallback } from "react";
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
import { toast } from "sonner";
import { api } from "@/lib/api";

export function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      address: {
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
      },
    },
  });

  const formatCep = (value: string) => {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
  };

  const handleCepChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
      const rawValue = e.target.value;
      const formattedValue = formatCep(rawValue);

      field.onChange(formattedValue);

      if (formattedValue.length === 9) {
        setIsLoadingCep(true);
        try {
          const cleanCep = formattedValue.replace("-", "");
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`
          );
          const data = await response.json();

          if (data.erro) {
            form.setError("address.zipCode", { message: "CEP não encontrado" });
            toast.error("CEP não encontrado!");
            return;
          }

          form.setValue("address.street", data.logradouro);
          form.setValue("address.neighborhood", data.bairro);
          form.setValue("address.city", data.localidade);
          form.setValue("address.state", data.uf);

          form.setFocus("address.number");
        } catch (error) {
          toast.error("Erro ao buscar CEP. Preencha manualmente.");
        } finally {
          setIsLoadingCep(false);
        }
      }
    },
    [form]
  );

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  async function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const response = await api.post("/checkout", {
        items: orderItems,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        toast.error("Erro: O link de pagamento não foi gerado.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Erro no checkout:", error);
      toast.error("Falha ao iniciar pagamento. Tente novamente.");
      setIsSubmitting(false);
    }
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
            <div className="lg:col-span-7 space-y-6">
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
                            <div className="relative">
                              <Input
                                placeholder="00000-000"
                                className="bg-black/20 border-zinc-800 text-white focus:border-brand pr-10"
                                {...field}
                                onChange={(e) => {
                                  handleCepChange(e, field);
                                }}
                                maxLength={9}
                              />
                              {isLoadingCep && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                  <Loader2 className="h-4 w-4 animate-spin text-brand" />
                                </div>
                              )}
                            </div>
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Bairro
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Centro"
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
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400">
                            Estado (UF)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="SP"
                              maxLength={2}
                              className="bg-black/20 border-zinc-800 text-white focus:border-brand uppercase"
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
            </div>

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
