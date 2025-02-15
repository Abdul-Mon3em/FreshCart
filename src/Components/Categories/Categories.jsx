import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const { data } = await axios.get(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  return data.data;
};

const fetchSubcategories = async (categoryId) => {
  if (!categoryId) return [];
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`
  );
  return data.data;
};

const fetchProducts = async (categoryId) => {
  if (!categoryId) return [];
  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
  );
  return data.data;
};

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: subcategories = [],
    isLoading: isSubcategoriesLoading,
    isError: isSubcategoriesError,
    error: subcategoriesError,
  } = useQuery({
    queryKey: ["subcategories", selectedCategoryId],
    queryFn: () => fetchSubcategories(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategoryId],
    queryFn: () => fetchProducts(selectedCategoryId),
    enabled: !!selectedCategoryId,
  });

  const selectedCategory = categories?.find(
    (category) => category._id === selectedCategoryId
  );

  if (isCategoriesLoading) return <h2>Loading Categories...</h2>;
  if (isCategoriesError) return <h2>Error: {categoriesError?.message}</h2>;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6 grid-cols-2">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => setSelectedCategoryId(category._id)}
            className="max-w-sm bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
          >
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={category.image}
              alt={category.name}
            />
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-center text-[#4FA74F] dark:text-white">
                {category.name}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <div className="mt-10">
          <h2 className="text-center text-[#4FA74F] text-3xl font-semibold">
            {selectedCategory?.name} Subcategories
          </h2>
          {isSubcategoriesLoading ? (
            <h2 className="text-center text-lg">Loading Subcategories...</h2>
          ) : isSubcategoriesError ? (
            <h2 className="text-center text-red-500">
              Error: {subcategoriesError?.message}
            </h2>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 grid-cols-2">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-5"
                >
                  <h5 className="text-xl font-bold">{subcategory.name}</h5>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedCategoryId && (
        <div className="mt-10">
          <h2 className="text-center text-[#4FA74F] text-3xl font-semibold">
            {selectedCategory?.name} Products
          </h2>
          {isProductsLoading ? (
            <h2 className="text-center text-lg">Loading Products...</h2>
          ) : isProductsError ? (
            <h2 className="text-center text-red-500">
              Error: {productsError?.message}
            </h2>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6 grid-cols-2">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-5"
                >
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <h5 className="text-xl font-bold">{product.title}</h5>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-semibold text-[#4FA74F]">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
