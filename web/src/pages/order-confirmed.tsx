import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OrderConfirmed() {
  return (
    <div className="min-h-screen bg-neumo-bg flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-zinc-900/50 border-zinc-800 backdrop-blur-xl">
        <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full animate-pulse"></div>
            <CheckCircle className="w-20 h-20 text-brand relative z-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">
              Pedido Confirmado!
            </h1>
            <p className="text-zinc-400">
              Obrigado pela sua compra. Enviamos um e-mail com os detalhes do
              seu pedido.
            </p>
          </div>

          <div className="w-full pt-4">
            <Link to="/">
              <Button className="w-full h-12 bg-brand hover:bg-brand/90 text-neumo-bg font-bold text-lg group">
                Voltar para a Loja
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
