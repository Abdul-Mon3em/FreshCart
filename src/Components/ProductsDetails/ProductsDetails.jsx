import { FaStar, FaHeart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";

export default function ProductsDetails() {
  const { pid, cid } = useParams();
  const navigate = useNavigate();
  const { addProductToCart } = useContext(CartContext);
  const { isInWishlist, toggleWishlist } = useContext(WishlistContext);
  const [error, setError] = useState(null);

  async function fetchProductDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${pid}`
    );
    return data.data;
  }

  async function fetchSimilarProducts() {
    if (!cid) return []; // Prevent unnecessary API calls
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data.data
      .filter((product) => product.category._id === cid && product._id !== pid)
      .slice(0, 3);
  }

  const {
    data: productsDetails,
    isLoading: isProductDetailsLoading,
    isError: isProductDetailsError,
    error: productDetailsError,
  } = useQuery({
    queryKey: ["productDetails", pid],
    queryFn: fetchProductDetails,
    enabled: !!pid,
  });

  const {
    data: similarProducts,
    isLoading: isSimilarProductsLoading,
    isError: isSimilarProductsError,
    error: similarProductsError,
  } = useQuery({
    queryKey: ["similarProducts", cid],
    queryFn: fetchSimilarProducts,
    enabled: !!cid,
  });

  async function handleAddProductToCart(id) {
    try {
      const res = await addProductToCart(id);
      if (res.data.status === "success") {
        setError(null);
      } else {
        setError(res.data.message || "Failed to add product to cart");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error adding product to cart");
    }
  }

  if (!pid) {
    return (
      <div className="text-center text-red-600 font-bold text-xl h-[70vh] flex items-center justify-center">
        Product ID is missing in the URL.
      </div>
    );
  }

  if (isProductDetailsError || isSimilarProductsError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl h-[70vh] flex items-center justify-center">
        {productDetailsError?.message ||
          similarProductsError?.message ||
          "An error occurred"}
      </div>
    );
  }

  if (isProductDetailsLoading || isSimilarProductsLoading) {
    return (
      <div role="status" className="animate-pulse space-y-6">
        <div className="w-full h-48 bg-gray-300 rounded-sm flex items-center justify-center">
          <svg
            className="w-10 h-10 text-gray-200"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z" />
          </svg>
        </div>
        <div className="h-2 bg-gray-200 rounded-full w-48 mb-4" />
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <div className="grid grid-cols-12 gap-5">
        <div className="md:col-span-4 col-span-12">
          <img
            className="w-full max-w-72 sm:max-w-80 md:max-w-full mx-auto"
            src={productsDetails.imageCover}
            alt={productsDetails.title}
          />
        </div>
        <div className="md:col-span-8 col-span-12 self-center">
          <h2 className="mb-2 font-bold text-lg">{productsDetails.title}</h2>
          <p className="mb-2 text-gray-800/60">{productsDetails.description}</p>
          <p className="mb-3">{productsDetails.category.name}</p>
          <div className="flex justify-between mb-2">
            <span className="font-bold mt-2">{productsDetails.price} EGP</span>
            <span className="flex items-center gap-2">
              {productsDetails.ratingsAverage}
              <FaStar className="text-yellow-300" />
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10">
        <div className="col-span-12 flex w-full items-center">
          <button
            onClick={() => handleAddProductToCart(productsDetails._id)}
            className="text-white bg-mainclrbold hover:bg-green-700 transition-all duration-300 font-medium rounded-lg text-sm py-2.5 w-52 mx-auto"
          >
            Add to Cart
          </button>
          <FaHeart
            onClick={() => toggleWishlist(productsDetails._id)}
            className={`text-4xl cursor-pointer transition-all duration-300 ${
              isInWishlist(productsDetails._id)
                ? "text-red-500"
                : "text-gray-500 hover:text-red-500"
            }`}
            aria-label="Toggle Wishlist"
          />
        </div>
      </div>
      <div className="mt-16">
        <h3 className="text-xl font-bold mb-4">Similar Products</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {similarProducts.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-md shadow-sm hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                navigate(
                  `/productsDetails/${product._id}/${product.category._id}`
                )
              }
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full max-w-72 mx-auto mb-4"
              />
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold mt-2">{product.price} EGP</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
