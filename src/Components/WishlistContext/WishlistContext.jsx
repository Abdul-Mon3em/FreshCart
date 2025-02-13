import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WishlistContext = createContext({
  wishlistItems: [],
  isInWishlist: () => false,
  toggleWishlist: async () => {},
});

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  async function fetchWishlist() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token },
        }
      );
      if (response.data?.data) {
        const wishlistIds = response.data.data.map(
          (item) => item.id || item._id
        );
        setWishlistItems(wishlistIds);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching wishlist");
    }
  }

  const isInWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  async function toggleWishlist(productId) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (isInWishlist(productId)) {
        const response = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
          {
            headers: { token },
          }
        );
        if (response.status === 200) {
          setWishlistItems((prev) => prev.filter((id) => id !== productId));
          await fetchWishlist();
          setError(null);
        }
      } else {
        const response = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId },
          {
            headers: { token },
          }
        );
        if (response.data.status === "success") {
          setWishlistItems((prev) => [...prev, productId]);
          await fetchWishlist();
          setError(null);
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating wishlist");
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, isInWishlist, toggleWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
