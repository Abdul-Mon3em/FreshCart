import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

async function fetchBrands() {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/brands"
  );
  return data.data;
}

export default function Brands() {
  const navigate = useNavigate();

  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
    retry: 2,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
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
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-9">
      {brands.map((brand) => (
        <div
          key={brand._id}
          className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300"
        >
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full object-contain mb-4"
          />
          <h2
            onClick={() => navigate(`/brand/${brand.slug}`)} // ✅ تم التعديل هنا
            className="text-center font-semibold text-lg cursor-pointer hover:text-blue-500 transition"
          >
            {brand.name}
          </h2>
        </div>
      ))}
    </div>
  );
}
