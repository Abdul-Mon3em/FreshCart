import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full absolute bottom-0 left-0 right-0">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-semibold text-white">FreshCart</h2>
            <p className="text-sm mt-1">
              &copy; {new Date().getFullYear()} Abdalmoniem Mohammed™. <br />
              All Rights Reserved.
            </p>
          </div>

          <ul className="flex gap-6 text-sm mt-4 md:mt-0">
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/abd-al-monem-muhamed/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="hover:text-white transition duration-300 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-white transition duration-300 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-white transition duration-300 text-xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
