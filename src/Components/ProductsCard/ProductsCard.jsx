import { useContext, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function ProductCard({ product }) {
  const { addProductToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const [error, setError] = useState(null);

  async function handleAddProductToCart(id) {
    try {
      const res = await addProductToCart(id);
      if (res.data.status === "success") {
        setError(null);
      } else {
        setError("Failed to add product to cart");
      }
    } catch (error) {
      setError("Error adding product to cart");
    }
  }

  return (
    <div className="overflow-hidden group">
      <Link to={`productsDetails/${product.id}/${product.category._id}`}>
        <img
          className="w-full md:h-52 object-cover object-center"
          src={product.imageCover}
          alt={product.title}
        />
        <span className="text-mainclr">{product.category.name}</span>
        <h2 className="font-semibold text-lg mb-3 mt-1">
          {product.title.split(" ", 2).join(" ")}
        </h2>
        <div className="flex justify-between">
          <span>{product.price} EGP</span>
          <span className="flex items-center">
            {product.ratingsAverage}{" "}
            <FaStar className="inline-block ms-1 text-yellow-300" />
          </span>
        </div>
      </Link>
      <div>
        <FaHeart
          onClick={() => toggleWishlist(product.id)}
          className={`text-2xl transition-all duration-300 cursor-pointer ${
            isInWishlist(product.id)
              ? "text-[#e31b23] ms-auto mt-1 hover:text-black"
              : "text-black ms-auto mt-1 hover:text-[#e31b23]"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={() => handleAddProductToCart(product.id)}
        className="text-[#198754] hover:text-white border border-[#198754] hover:bg-[#198754] focus:ring-1 focus:outline-none focus:ring-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#198754] mt-3 dark:text-[#198754] dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754] duration-[370ms]"
      >
        Add Product
      </button>
    </div>
  );
}
