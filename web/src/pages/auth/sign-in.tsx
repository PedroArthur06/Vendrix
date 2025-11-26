import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

type SignInForm = z.infer<typeof signInSchema>;

export function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/admin/dashboard";

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: authenticate, isPending } = useMutation({
    mutationFn: async (data: SignInForm) => {
      const response = await api.post("/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("vendrix:token", data.token);
      toast.success("Login realizado!");
      navigate(from, { replace: true });
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as { message: string };
      alert(data?.message || "Erro ao fazer login");
    },
  });

  async function handleSignIn(data: SignInForm) {
    await authenticate(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212121] font-sans text-white p-4">
      <div className="w-full max-w-[350px] flex flex-col items-center gap-6 p-10 rounded-[15px] bg-[#212121] shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]">
        <div className="text-2xl font-bold pb-2 tracking-wide">Login</div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignIn)}
            className="flex flex-col gap-5 w-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      placeholder="E-mail"
                      {...field}
                      className="w-full h-[45px] bg-[#212121] text-white border-none rounded-[6px] px-4 outline-none transition-all duration-300
                      placeholder:text-[#999]
                      
                      /* Sombra Normal (Saltado) */
                      shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                      
                      /* Efeito ao Focar (Pressionado + Scale) */
                      focus-visible:ring-0 focus-visible:ring-offset-0
                      focus:transform focus:scale-105 
                      focus:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Senha"
                      {...field}
                      className="w-full h-[45px] bg-[#212121] text-white border-none rounded-[6px] px-4 outline-none transition-all duration-300
                      placeholder:text-[#999]
                      
                      shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
                      
                      focus-visible:ring-0 focus-visible:ring-offset-0
                      focus:transform focus:scale-105 
                      focus:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              className="h-[45px] w-full bg-[#212121] text-white font-bold rounded-[6px] border-none cursor-pointer transition-all duration-300
              
              /* Sombra Normal */
              shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
              
              /* Hover */
              hover:bg-[#212121]
              hover:transform hover:scale-105
              
              /* Click (Active) */
              active:scale-95
              active:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]"
            >
              {isPending ? "Entrando..." : "ENTRAR"}
            </Button>

            <div className="text-[13px] text-white text-center mt-2">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-bold cursor-pointer underline hover:text-gray-300 transition-colors"
              >
                Cadastre-se
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
