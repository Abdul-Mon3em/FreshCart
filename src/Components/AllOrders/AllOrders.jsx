import { ImCheckmark } from "react-icons/im";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AllOrders() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentIntent = params.get("payment_intent");
    const redirectStatus = params.get("redirect_status");

    if (redirectStatus === "succeeded" && paymentIntent) {
      setIsPaymentVerified(true);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  if (!isPaymentVerified) return null;

  return (
    <div className="h-[50vh] absolute inset-0 translate-y-[50%]">
      <div className="flex flex-col text-center w-96 mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <div className="bg-green-600 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-5">
            <ImCheckmark className="mx-auto text-8xl text-center text-white" />
          </div>
          Payment Complete
        </h5>
        <p className="text-xs text-gray-500/70 mb-1">
          You will be contacted within 48 to 72 hours.
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400 w-full">
          Your order is on its way and will be delivered soon. Thank you for
          shopping with us!
        </p>
      </div>
    </div>
  );
}
