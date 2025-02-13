import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContext/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const {
    cartItems = [],
    cartCount,
    removeProductFromCart,
    updateProductQuantity,
    fetchCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      await fetchCart();
      setIsLoading(false);
    };
    loadCart();
  }, []); 

  const totalPrice =
    cartItems?.reduce((total, item) => total + item.price * item.count, 0) ?? 0;

  if (isLoading) {
    return <p className="text-center text-lg font-semibold">Loading cart...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartCount === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.product?._id}
                className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.product?.title}</h2>
                    <p>Price: {item.price} EGP</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            item.product?._id,
                            Math.max(1, item.count - 1)
                          )
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.count}</span>
                      <button
                        onClick={() =>
                          updateProductQuantity(
                            item.product?._id,
                            item.count + 1
                          )
                        }
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeProductFromCart(item.product?._id)}
                  className="bg-red-500 hover:bg-red-600 duration-200 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-lg font-semibold">
            <p>Total Items: {cartCount}</p>
            <p>Total Price: {totalPrice.toFixed(2)} EGP</p>
          </div>
          <div className="mt-4 flex gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 duration-200 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 hover:bg-green-600 duration-200 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
