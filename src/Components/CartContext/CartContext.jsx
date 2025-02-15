import axios from "axios";
import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingActions, setLoadingActions] = useState({});
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token },
        }
      );

      if (res.data.status === "success") {
        setCartItems(res.data.data?.products || []);
        setCartCount(res.data.numOfCartItems || 0);
        setCartId(res.data.data?._id || null);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch cart data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  async function handleCartAction(action, pid = null, body = null) {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoadingActions((prev) => ({ ...prev, [action]: true }));
    setError(null);

    try {
      const url = pid
        ? `https://ecommerce.routemisr.com/api/v1/cart/${pid}`
        : "https://ecommerce.routemisr.com/api/v1/cart";

      const method =
        action === "add" ? "post" : action === "update" ? "put" : "delete";
      const res = await axios({ method, url, data: body, headers: { token } });

      if (res.data.status === "success" || res.data.message === "success") {
        setCartItems(res.data.data?.products || []);
        setCartCount(res.data.numOfCartItems || 0);
      }
      return res;
    } catch (error) {
      setError(error.response?.data?.message || `Failed to ${action} product.`);
      throw error;
    } finally {
      setLoadingActions((prev) => ({ ...prev, [action]: false }));
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        isLoading,
        loadingActions,
        error,
        addProductToCart: (pid) =>
          handleCartAction("add", null, { productId: pid }),
        updateProductQuantity: (pid, quantity) =>
          handleCartAction("update", pid, { count: quantity }),
        removeProductFromCart: (pid) => handleCartAction("delete", pid),
        clearCart: () => handleCartAction("delete"),
        fetchCart,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
