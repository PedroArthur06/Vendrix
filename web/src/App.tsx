import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "./pages/home";
import { AppLayout } from "./pages/_layouts/app-layout";
import { ProductDetails } from "./pages/product-details";
import { Checkout } from "./pages/checkout";
import { OrderConfirmed } from "./pages/order-confirmed";
import { Catalog } from "./pages/catalog";

const queryClient = new QueryClient();
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<AppLayout />}>
            {" "}
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<h1>Dashboard</h1>} />
            <Route path="products" element={<h1>Produtos</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors closeButton theme="dark" />
    </QueryClientProvider>
  );
}

export default App;
