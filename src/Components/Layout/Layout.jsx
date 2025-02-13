import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-screen-xl px-4 md:px-8 lg:px-16 mx-auto mt-10">
        <Outlet />
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
