import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./ForgetPassword-module.css";
import { IoMdClose } from "react-icons/io";

export default function ForgetPassword({ setForgotPasswordVisited }) {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const navigate = useNavigate();
  const toastRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addToast = (message, type) => {
    const id = new Date().getTime();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, type, visible: true },
    ]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.filter((toasts) => toasts.id !== id)
      );
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, visible: false } : toast
      )
    );
  };

  const handleSendEmail = async () => {
    if (!email) {
      addToast("Please enter your email.", "error");
      return;
    }
    if (!validateEmail(email)) {
      addToast("Invalid email format.", "error");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      setStep(2);
      addToast("Email sent successfully! Please check your inbox.", "success");
    } catch (error) {
      addToast("Failed to send email. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!resetCode) {
      addToast("Please enter the reset code.", "error");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode }
      );
      addToast("Reset code verified successfully!", "success");
      setForgotPasswordVisited(true);
      navigate("/reset-password");
    } catch (error) {
      addToast("Invalid reset code. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const lastToast = toasts[toasts.length - 1];
      const timer = setTimeout(() => {
        removeToast(lastToast.id);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  useEffect(() => {
    const handleAnimationEnd = () => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.visible));
    };

    const toastElement = toastRef.current;
    if (toastElement) {
      toastElement.addEventListener("animationend", handleAnimationEnd);
    }

    return () => {
      if (toastElement) {
        toastElement.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, [toasts]);

  return (
    <>
      {loading && (
        <div className="absolute start-0 -translate-y-36 lg:w-screen lg:h-[101.6vh] h-[101vh] w-full overflow-hidden ">
          <div className="h-full w-full flex justify-center bg-gray-200/50 items-center flex-col">
            <AiOutlineLoading className="z-10 text-8xl text-[#4FA74F] animate-spin mb-3" />
            <h2 className="text-2xl font-semibold">Loading ...</h2>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-semibold">
        {step === 1 ? "Please Enter Your Email" : "Enter the Reset Code"}
      </h2>

      <div className="relative mt-4">
        {step === 1 ? (
          <input
            type="email"
            id="ForgetPassword"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white border border-[#198754] rounded-md shadow-sm focus:border-[#198754] focus:ring-1 focus:ring-[#198754] dark:bg-gray-900 dark:text-white dark:border-[#198754] dark:focus:border-[#198754] dark:focus:ring-[#198754] focus:outline-none peer"
            placeholder=" "
          />
        ) : (
          <input
            type="text"
            id="ResetCode"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white border border-[#198754] rounded-md shadow-sm focus:border-[#198754] focus:ring-1 focus:ring-[#198754] dark:bg-gray-900 dark:text-white dark:border-[#198754] dark:focus:border-[#198754] dark:focus:ring-[#198754] focus:outline-none peer"
            placeholder=" "
          />
        )}
        <label
          htmlFor={step === 1 ? "ForgetPassword" : "ResetCode"}
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#4FA74F] peer-focus:dark:text-[#4FA74F] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {step === 1 ? "Email" : "Reset Code"}
        </label>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <button
        type="button"
        onClick={step === 1 ? handleSendEmail : handleVerifyCode}
        className="text-[#198754] hover:text-white border border-[#198754] hover:bg-[#198754] focus:ring-4 focus:outline-none focus:ring-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#198754] mt-3 dark:text-[#198754] dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754] duration-[370ms]"
      >
        {step === 1 ? "Send Reset Code" : "Verify Code"}
      </button>

      <div className="fixed top-0 right-0 m-4 space-y-4">
        {toasts.map((toast) => {
          const bgColor =
            toast.type === "success" ? "bg-green-100" : "bg-red-100";
          const textColor =
            toast.type === "success" ? "text-green-700" : "text-red-700";
          const icon =
            toast.type === "success" ? (
              <svg
                className="w-5 h-5 text-green-500 z-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 11l3 3L22 4"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 6L6 18M6 6l12 12"
                />
              </svg>
            );
          return (
            <div
              ref={toastRef}
              key={toast.id}
              className={`toast ${bgColor} ${textColor} z-50 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${
                toast.visible ? "" : "hide"
              }`}
            >
              <div className="flex items-center justify-between z-50">
                <div className="flex items-center z-50">
                  <span
                    className="cursor-pointer"
                    onClick={() => removeToast(toast.id)}
                  >
                    {icon}
                  </span>
                  <p className="ml-2 z-50">{toast.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
