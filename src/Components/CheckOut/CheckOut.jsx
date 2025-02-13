import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext/CartContext";
import Cookies from "js-cookie";
import { FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

export default function CheckOut() {
  const { cartId, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    details: "",
    phone: "",
    city: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const egyptianCities = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Mansoura",
    "El-Mahalla El-Kubra",
    "Tanta",
    "Asyut",
    "Ismailia",
    "Faiyum",
    "Zagazig",
    "Aswan",
    "Damietta",
    "Damanhur",
    "Minya",
    "Beni Suef",
    "Qena",
    "Sohag",
    "Hurghada",
    "6th of October City",
    "Shibin El Kom",
    "Banha",
    "Kafr El Sheikh",
    "Arish",
    "10th of Ramadan City",
    "Marsa Matruh",
    "Idku",
    "Bilbeis",
    "Mit Ghamr",
    "Al-Hamidiyya",
    "Desouk",
    "Qalyub",
    "Abu Kabir",
    "Kafr El Dawwar",
    "Girga",
    "Akhmim",
    "Matareya",
    "New Cairo",
    "Obour City",
    "Sheikh Zayed City",
    "Sadat City",
    "Shalateen",
    "Halayeb",
    "Ras Gharib",
    "Safaga",
    "El Tor",
    "Nakhl",
    "Rafah",
    "Bir El Abd",
  ];

  const validateForm = () => {
    const newErrors = {};
    if (shippingAddress.details.length < 3)
      newErrors.details = "Details must be at least 3 characters long.";
    if (!/^01[0125][0-9]{8}$/.test(shippingAddress.phone))
      newErrors.phone = "Please enter a valid Egyptian phone number.";
    if (!shippingAddress.city) newErrors.city = "Please select a city.";
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    Cookies.set("shippingAddress", JSON.stringify(shippingAddress), {
      expires: 7,
    });
    setIsLoading(true);
    setError(null);

    if (paymentMethod === "Cash on Delivery") {
      alert("Order placed successfully! Pay when you receive your order.");
      clearCart();
      navigate("/");
      return;
    }

    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://el-kadi.github.io/FreshCart-E-commerce-App`,
        { shippingAddress },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (res.data.status === "success")
        window.location.href = res.data.session.url;
    } catch (error) {
      setError("Failed to complete payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Shipping Details</label>
          <input
            type="text"
            value={shippingAddress.details}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                details: e.target.value,
              })
            }
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter shipping details"
          />
          {errors.details && (
            <p className="text-red-500 text-sm">{errors.details}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            value={shippingAddress.phone}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className="mt-1 block w-full p-2 border rounded-md"
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Select your city</label>
          <select
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, city: e.target.value })
            }
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a city</option>
            {egyptianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Method</label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`p-2 rounded-md ${
                paymentMethod === "Cash on Delivery"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setPaymentMethod("Cash on Delivery")}
            >
              <FaMoneyBillWave /> Cash on Delivery
            </button>
            <button
              type="button"
              className={`p-2 rounded-md ${
                paymentMethod === "Pay Online"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => setPaymentMethod("Pay Online")}
            >
              <FaCreditCard /> Pay Online
            </button>
          </div>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
