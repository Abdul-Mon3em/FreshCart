import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WishList() {
  const { addProductToCart } = useContext(CartContext);
  const { removeProductFromCart } = useContext(CartContext);
  const { toggleWishlist } = useContext(WishlistContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: token,
          },
        }
      );
      setWishlist(data.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      await toggleWishlist(productId);
      await fetchWishlist();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to remove item from wishlist"
      );
    }
  };

  const handleAddProductToCart = async (productId) => {
    try {
      const res = await addProductToCart(productId);
      if (res.data.status === "success") {
        setError(null);
      } else {
        setError(res.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error adding product to cart");
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Wish List</h1>
      {wishlist.length === 0 ? (
        <p>Your wish list is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>Price: {item.price} EGP</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-5 items-center">
                <div>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="text-red-500 text-center bg-white border border-red-500 mt-2 px-5 py-3 hover:bg-red-500 hover:text-white transition-all duration-300 focus:ring-2 focus:ring-red-500 font-medium rounded-lg text-sm dark:bg-white dark:hover:bg-red-500 dark:text-red-500 dark:border-red-500 dark:focus:ring-red-500 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
                <div className=" -mt-2">
                  <button
                    onClick={() => handleAddProductToCart(item._id)}
                    className="text-[#198754] text-center bg-mainclrbold border border-[#198754] mt-2 px-5 py-3 hover:bg-[#198754] hover:text-white transition-all duration-300 focus:ring-2 focus:ring-[#198754] font-medium rounded-lg text-sm dark:bg-mainclrbold dark:hover:bg-[#198754] dark:text-[#198754] dark:border-[#198754] dark:focus:ring-[#198754] focus:outline-none"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
