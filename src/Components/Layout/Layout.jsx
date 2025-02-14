import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl px-4 md:px-8 lg:px-16 mx-auto mt-10 pb-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
