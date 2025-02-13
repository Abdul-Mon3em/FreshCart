import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CartContext } from "../CartContext/CartContext";
import { WishlistContext } from "../WishlistContext/WishlistContext";
import { FaHeart } from "react-icons/fa";

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
    refetch: refetchProductDetails,
  } = useQuery({
    queryKey: ["productDetails", pid],
    queryFn: fetchProductDetails,
    enabled: !!pid && !!cid,
  });

  const {
    data: similarProducts,
    isLoading: isSimilarProductsLoading,
    isError: isSimilarProductsError,
    error: similarProductsError,
    refetch: refetchSimilarProducts,
  } = useQuery({
    queryKey: ["similarProducts", cid],
    queryFn: fetchSimilarProducts,
    enabled: !!pid && !!cid,
  });

  useEffect(() => {
    if (pid && cid) {
      refetchProductDetails();
      refetchSimilarProducts();
    }
  }, [pid, cid, refetchProductDetails, refetchSimilarProducts]);

  async function handelAddProducToCart(id) {
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

  if (!pid || !cid) {
    return (
      <div className="text-center text-red-600 font-bold text-xl h-[70vh] mx-auto flex items-center justify-center">
        Product ID or Category ID is missing in the URL.
      </div>
    );
  }

  if (isProductDetailsError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl h-[70vh] mx-auto flex items-center justify-center">
        {productDetailsError.message}
      </div>
    );
  }

  if (isSimilarProductsError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl my-10">
        {similarProductsError.message}
      </div>
    );
  }

  if (isProductDetailsLoading || isSimilarProductsLoading) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
        </div>
        <span className="sr-only">Loading...</span>
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
      <div className="grid grid-cols-12 mt-10 md:mt-0">
        <div className="col-span-12 flex w-full mx-auto items-center overflow-hidden">
          <div className="ms-auto">
            <button
              onClick={() => handelAddProducToCart(productsDetails._id)}
              className="text-[#198754] text-center md:w-96 w-52 mx-auto border border-[#198754] bg-mainclrbold hover:bg-[#198754] hover:text-white transition-all duration-300 focus:ring-2 focus:ring-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-mainclrbold dark:hover:bg-[#198754] dark:text-[#198754] dark:border-[#198754] dark:focus:ring-[#198754] focus:outline-none"
            >
              Add Product
            </button>
          </div>
          <div className="ms-auto">
            <FaHeart
              onClick={() => toggleWishlist(productsDetails._id)}
              className={`text-4xl transition-all duration-300 cursor-pointer ${
                isInWishlist(productsDetails._id)
                  ? "text-[#e31b23]"
                  : "text-black hover:text-[#e31b23]"
              }`}
            />
          </div>
        </div>
      </div>
      <div className="my-40 lg:mt-32 lg:my-0 lg:mb-10">
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
                className="w-full max-w-72 sm:max-w-80 md:max-w-full mx-auto mb-4"
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
