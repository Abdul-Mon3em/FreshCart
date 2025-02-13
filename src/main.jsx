import "flowbite/dist/flowbite.min.js";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserContextProvider from "./Components/UserContext/UserContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvider from "./Components/CartContext/CartContext.jsx";
import { WishlistProvider } from "./Components/WishlistContext/WishlistContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools />
    <UserContextProvider>
      <CartContextProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
);
