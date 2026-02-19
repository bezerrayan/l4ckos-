import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "./lib/trpc";

// Providers
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import { ToastProvider } from "./contexts/ToastContext";
import { DataSyncProvider } from "./components/DataSyncProvider";

import App from "./App";
import "./index.css";

// ============= SETUP TRPC =============

const queryClient = new QueryClient();

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      transformer: superjson,
    }),
  ],
});

// ============= RENDER =============

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* tRPC Provider */}
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* Global State Providers */}
        <ThemeProvider defaultTheme="light" switchable={true}>
          <CartProvider>
            <FavoritesProvider>
              <UserProvider>
                <ToastProvider>
                  <DataSyncProvider>
                    {/* App com Rotas */}
                    <App />
                  </DataSyncProvider>
                </ToastProvider>
              </UserProvider>
            </FavoritesProvider>
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
