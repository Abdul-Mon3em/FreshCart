import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function BrandProducts() {
  const { brandId } = useParams();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brandProducts", brandId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
      );
      return data.data;
    },
  });

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">{error.message}</p>;
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-9">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full object-contain mb-4"
            />
            <h2 className="text-center font-semibold text-lg">
              {product.title}
            </h2>
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
