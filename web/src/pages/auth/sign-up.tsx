import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const signUpSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  phone: z.string().optional(),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export function SignUp() {
  const navigate = useNavigate();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerUser, isPending } = useMutation({
    mutationFn: async (data: SignUpForm) => {
      await api.post("/register", {
        email: data.email,
        password: data.password,
        profile: {
          name: data.name,
          phone: data.phone || undefined,
        },
      });
    },
    onSuccess: async () => {
      toast.success("Conta criada com sucesso!", {
        description: "Redirecionando para o login...",
        duration: 2000,
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      navigate("/login");
    },
    onError: (error: AxiosError) => {
      const data = error.response?.data as { error: string };
      toast.error("Erro ao criar conta", {
        description: data?.error || "Verifique os dados e tente novamente.",
      });
    },
  });

  async function handleSignUp(data: SignUpForm) {
    await registerUser(data);
  }

  const inputStyles = `
    w-full h-[45px] bg-[#212121] text-white border-none rounded-[6px] px-4 outline-none transition-all duration-300
    placeholder:text-[#999]
    shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
    focus-visible:ring-0 focus-visible:ring-offset-0
    focus:transform focus:scale-105 
    focus:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#212121] font-sans text-white p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6 p-10 rounded-[15px] bg-[#212121] shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]">
        <div className="text-2xl font-bold pb-2 tracking-wide">
          Crie sua conta
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="flex flex-col gap-4 w-full"
          >
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      placeholder="Nome Completo"
                      {...field}
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            {/* Telefone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      placeholder="Telefone (Opcional)"
                      {...field}
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormControl>
                    <Input
                      placeholder="E-mail"
                      {...field}
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            {/* Senha */}
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
                      className={inputStyles}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1 text-center font-medium" />
                </FormItem>
              )}
            />

            {/* Botão Cadastrar */}
            <Button
              type="submit"
              disabled={isPending}
              className="h-[45px] w-full bg-[#212121] text-white font-bold rounded-[6px] border-none cursor-pointer transition-all duration-300 mt-2
              shadow-[6px_6px_10px_rgba(0,0,0,1),1px_1px_10px_rgba(255,255,255,0.6)]
              hover:bg-[#212121] hover:transform hover:scale-105
              active:scale-95 active:shadow-[inset_2px_2px_10px_rgba(0,0,0,1),inset_-1px_-1px_5px_rgba(255,255,255,0.6)]"
            >
              {isPending ? "Criando conta..." : "CADASTRAR"}
            </Button>

            {/* Link Voltar ao Login */}
            <div className="text-[13px] text-white text-center mt-2">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-bold cursor-pointer underline hover:text-gray-300 transition-colors"
              >
                Fazer Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
