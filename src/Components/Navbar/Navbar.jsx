import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { UserContext } from "../UserContext/UserContext";
import { CartContext } from "../CartContext/CartContext";
import { initFlowbite } from "flowbite";

export default function Navbar() {
  useEffect(() => {
    initFlowbite();
  }, []);
  const { isLogin, setToken } = useContext(UserContext);
  const { cartCount } = useContext(CartContext);
  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  const [pages, setpages] = useState([
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Wish List", path: "/wishList" },
    { text: "Products", path: "/products" },
    { text: "Categories", path: "/categories" },
    { text: "Brands", path: "/brands" },
  ]);
  const [authPages, setAuthPages] = useState([
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ]);

  return (
    <>
      <nav className="bg-[#F8F9FA] border-gray-200 dark:bg-gray-900 fixed z-50 w-full top-0">
        <div className="max-w-screen-xl flex flex-wrap justify-between lg:justify-normal items-center gap-6 mx-auto p-4">
          <span className="flex items-center space-x-3 rtl:space-x-reverse">
            <FaShoppingCart className="nav-icon text-4xl text-[#4FA74F]" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FreshCart
            </span>
          </span>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div
            className="hidden w-full gap-6 grow lg:flex lg:w-auto"
            id="navbar-default"
          >
            <ul
              className={`font-medium flex mx-auto flex-col p-4 lg:p-0 mt-4 border lg:items-center border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-6 xl:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-transparent dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700 ${
                !isLogin ? "hidden" : ""
              }`}
            >
              {isLogin &&
                pages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 lg:bg-transparent text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-mainclr lg:p-0 dark:text-white lg:dark:hover:text-mainclr duration-200 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
            </ul>

            <ul className="font-medium flex ms-auto lg:bg-transparent flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              {!isLogin &&
                authPages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3  text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-mainclr  lg:p-0 dark:text-white lg:dark:hover:text-mainclr duration-200 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
              {isLogin && (
                <li>
                  <div className="flex gap-5 lg:flex-row flex-col">
                    <Link className="group  " to={"/cart"}>
                      <span className="relative  me-auto lg:ms-0 inline-flex items-center text-sm font-medium text-center text-white">
                        <FaShoppingCart className="text-black text-4xl h-10 group-hover:text-[#4FA74F] transition-all duration-300" />

                        <div className="absolute inline-flex items-center group-hover:bg-black justify-center w-6 h-6 text-xs font-bold text-white transition-all duration-300 bg-[#4FA74F] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {cartCount}
                        </div>
                      </span>
                    </Link>
                    <div className="flex lg:items-center">
                      <button
                        onClick={() => logOut()}
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-mainclr lg:bg-transparent  lg:p-0 dark:text-white lg:dark:hover:text-mainclr duration-200 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="mb-28"></div>
    </>
  );
}
