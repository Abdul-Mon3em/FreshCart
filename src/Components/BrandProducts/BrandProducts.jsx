import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function fetchAllProducts() {
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products`
  );
  return data.data;
}

export default function BrandProducts() {
  const { brandSlug } = useParams();

  const {
    data: allProducts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchAllProducts,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="max-w-sm p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse dark:border-gray-700 w-full mx-auto"
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700"></div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 font-bold text-xl my-10">
        <p>{error.message}</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          onClick={() => refetch()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  const filteredProducts = allProducts.filter(
    (product) => product.brand.slug === brandSlug
  );

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-9">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full object-contain mb-4"
            />
            <h2 className="text-center font-semibold text-lg">
              {product.title}
            </h2>
            <p className="text-center text-gray-600">
              السعر: {product.price} جنيه
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          لا يوجد منتجات لهذا البراند
        </p>
      )}
    </div>
  );
}
