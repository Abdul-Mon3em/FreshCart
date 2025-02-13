import { useState, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../ProductsCard/ProductsCard";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { debounce } from "lodash";

async function fetchProducts() {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/products"
  );
  return data.data;
}

export default function Home() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 3600000,
    retry: 5,
    retryDelay: 10000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: false,
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Debounced search input for better performance
  const handleSearchChange = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 ">
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse p-4 border rounded-sm shadow-sm"
          >
            <div className="h-48 bg-gray-300 rounded-sm"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded mt-1 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl my-10">
        {error.message}
        <button
          onClick={() => refetch()}
          className="block mx-auto mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <MainSlider />
      <CategorySlider />

      <form className="max-w-md mx-auto mb-7">
        <div className="relative">
          <input
            type="search"
            className="block w-full p-4 ps-10 text-sm border rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Search..."
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </form>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="hover:scale-105 duration-300">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </>
  );
}
