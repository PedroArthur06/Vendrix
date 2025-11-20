import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { Package2, Home, ShoppingBag, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleSignOut() {
    localStorage.removeItem("vendrix:token");
    navigate("/login");
  }

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] bg-neumo-bg text-neumo-text font-sans">
      <div className="hidden border-r border-transparent bg-neumo-bg lg:block shadow-neumo-flat z-10 relative">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-zinc-800/50 px-6">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-white hover:text-brand transition-colors"
            >
              <Package2 className="h-6 w-6 text-brand" />
              <span className="">Vendrix Admin</span>
            </Link>
          </div>

          <div className="flex-1 overflow-auto py-4">
            <nav className="grid items-start px-4 text-sm font-medium gap-2">
              <Link
                to="/admin/dashboard"
                className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all 
                  ${
                    isActive("/admin/dashboard")
                      ? "bg-neumo-bg text-brand shadow-neumo-pressed"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                to="/admin/products"
                className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all 
                  ${
                    isActive("/admin/products")
                      ? "bg-neumo-bg text-brand shadow-neumo-pressed"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
              >
                <ShoppingBag className="h-4 w-4" />
                Produtos
              </Link>

              <Link
                to="/admin/customers"
                className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-all 
                  ${
                    isActive("/admin/customers")
                      ? "bg-neumo-bg text-brand shadow-neumo-pressed"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
              >
                <Users className="h-4 w-4" />
                Clientes
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-transparent bg-neumo-bg px-6 shadow-neumo-flat lg:h-[60px] z-0">
          <div className="w-full flex-1">
            <h1 className="text-lg font-semibold text-white">
              Painel de Controle
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full ring-0 focus-visible:ring-0"
              >
                <Avatar className="h-8 w-8 shadow-neumo-flat hover:shadow-neumo-pressed transition-all">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-neumo-bg border-zinc-800 text-zinc-200 shadow-neumo-flat"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-white">
                    Pedro Admin
                  </p>
                  <p className="text-xs leading-none text-zinc-500">
                    admin@vendrix.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="text-red-400 focus:text-red-300 focus:bg-zinc-800 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-[#1a1a1a]/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
