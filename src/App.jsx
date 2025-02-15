import { useState, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import Categories from "./Components/Categories/Categories";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AuthProtected from "./Components/AuthProtected/AuthProtected";
import ProductDetails from "./Components/ProductsDetails/ProductsDetails";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import WishList from "./Components/WishList/WishList";
import Checkout from "./Components/CheckOut/CheckOut";
import CartProtectedRoute from "./Components/CartProtectedRoute/CartProtectedRoute";
import OrdersProtectedRoute from "./Components/OrdersProtectedRoute/OrdersProtectedRoute";
import AllOrders from "./Components/AllOrders/AllOrders";
import { initFlowbite } from "flowbite";
import "./App.css";

function App() {
  useEffect(() => {
    initFlowbite();
  }, []);

  const [forgotPasswordVisited, setForgotPasswordVisited] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              {/* <CartProtectedRoute> */}
                <Checkout />
              {/* </CartProtectedRoute> */}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishList",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brand/:brandSlug",
          element: (
            <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            // <ProtectedRoute>
              // <OrdersProtectedRoute>
                <AllOrders />
              // </OrdersProtectedRoute>
            // </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "productsDetails/:pid/:cid",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtected>
              <Register />
            </AuthProtected>
          ),
        },
        {
          path: "login",
          element: (
            <AuthProtected>
              <Login />
            </AuthProtected>
          ),
        },
        {
          path: "forget-password",
          element: (
            <AuthProtected>
              <ForgetPassword
                setForgotPasswordVisited={setForgotPasswordVisited}
              />
            </AuthProtected>
          ),
        },
        {
          path: "reset-password",
          element: (
            <AuthProtected>
              <ResetPassword />
            </AuthProtected>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
