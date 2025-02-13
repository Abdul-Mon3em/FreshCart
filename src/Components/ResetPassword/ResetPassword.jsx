import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [errorMess, setErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async function (resetData) {
      try {
        setIsLoading(true);

        const resetResponse = await axios.put(
          "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
          {
            email: resetData.email,
            newPassword: resetData.newPassword,
          }
        );

        if (resetResponse.data.token) {
          const token = resetResponse.data.token;
          const verifyResponse = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
            {
              headers: {
                token: token,
              },
            }
          );

          if (verifyResponse.status === 200) {
            navigate("/login");
          }
        }
      } catch (error) {
        setErrorMess(
          "Failed to reset password or verify token. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="lg:max-w-screen-xl container mx-auto"
      >
        <h2 className="text-2xl text-mainclr my-7 font-bold">Reset Password</h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            type="password"
            name="newPassword"
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.newPassword}
          </div>
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.confirmPassword}
          </div>
        )}

        {errorMess && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorMess}
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="submit"
            className="text-[#198754] hover:text-white border border-[#198754] hover:bg-[#198754] focus:ring-4 focus:outline-none focus:ring-[#198754] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-[#198754] mt-3 dark:text-[#198754] dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754] duration-[370ms]"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
