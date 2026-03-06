import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import ProductDetail from "./pages/ProductDetail";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Favoritos from "./pages/Favoritos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import FAQs from "./pages/FAQs";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import NotFound from "./pages/NotFound";
import MeusPedidos from "./pages/MeusPedidos";
import AcompanharPedido from "./pages/AcompanharPedido";
import TrocasDevolucoes from "./pages/TrocasDevolucoes";
import PedidoDetalhe from "./pages/PedidoDetalhe";
import { useIsMobile } from "./hooks/useIsMobile";
import { useUser } from "./contexts/UserContext";

function AdminRoute() {
  const { user, isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <NotFound />;
  }

  return <Admin />;
}

/**
 * App - Componente raiz com rotas
 * Nota: Providers são adicionados em main.tsx
 */
export default function App() {
  const isMobile = useIsMobile(980);

  return (
    <BrowserRouter>
      <Header />

      <div
        style={{
          minHeight: isMobile ? "calc(100vh - 160px)" : "calc(100vh - 200px)",
          maxWidth: 1400,
          margin: "0 auto",
          padding: isMobile ? "20px 14px" : "40px 32px",
          width: "100%",
          overflowX: "clip",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Pagamento />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/meus-pedidos" element={<MeusPedidos />} />
          <Route path="/meus-pedidos/:id" element={<PedidoDetalhe />} />
          <Route path="/acompanhar-pedido" element={<AcompanharPedido />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/trocas-e-devolucoes" element={<TrocasDevolucoes />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
