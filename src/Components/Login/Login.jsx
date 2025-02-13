import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";

function ErrorMessage({ message }) {
  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
      {message}
    </div>
  );
}

export default function Login() {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMess, setErrorMess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async function (loginData) {
      try {
        setIsLoading(true);
        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          loginData
        );
        if (data.message === "success") {
          navigate("/");
          setToken(data.token);
        }
      } catch {
        setErrorMess("Email or Password incorrect");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-3/4 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl text-mainclr my-7 font-bold">Login Form</h2>

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("email")}
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
          <ErrorMessage message={formik.errors.email} />
        )}

        <div className="relative z-0 w-full mb-5 group">
          <input
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-mainclr focus:outline-none focus:ring-0 focus:border-mainclr peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainclr peer-focus:dark:text-mainclr peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <ErrorMessage message={formik.errors.password} />
        )}
        {errorMess && <ErrorMessage message={errorMess} />}

        <div className="flex justify-between">
          <Link to={`/forget-password`}>
            <span
              type="submit"
              className="text-black cursor-pointer hover:text-mainclrbold duration-300 font-medium text-lg sm:w-auto py-2.5 text-center"
            >
              Forget Your Password ?
            </span>
          </Link>

          <button
            type="submit"
            disabled={isLoading}
            className={`text-[#198754] hover:text-white border border-[#198754] hover:bg-[#198754] 
            focus:ring-4 focus:outline-none focus:ring-[#198754] font-medium rounded-lg text-sm 
            px-5 py-2.5 text-center me-2 mb-2 dark:border-[#198754] mt-3 dark:text-[#198754] 
            dark:hover:text-white dark:hover:bg-[#198754] dark:focus:ring-[#198754] duration-[370ms] 
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
