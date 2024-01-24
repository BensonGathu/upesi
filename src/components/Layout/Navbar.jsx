import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useState, useEffect } from "react";

const Navbar = (props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      dispatch(logout());
    } else {
      window.location.href = "/login";
    }
  };

  const navItems = [
    { path: "/", text: "Home" },
  ];

  return (
    <div className="mb-40">
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:py-8">
          <div>
            <a href="/" className="flex items-center">
              <img
                src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
                className="h-12 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <Link to="/">Upesi</Link>
              </span>
            </a>{" "}
          </div>

          {isLargeScreen && (
            <div className="md:order-3">
              <button
                onClick={handleLoginLogout}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                {isAuthenticated ? "Logout" : "Login"}
              </button>
            </div>
          )}

          <div className="flex md:order-2">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
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
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    exact
                    to={item.path}
                    activeClassName="text-green-700"
                    className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 ${
                      location.pathname === item.path
                        ? "font-bold text-green-700 border-b-2 border-green-700"
                        : ""
                    } md:hover:bg-transparent md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    {item.text}
                  </NavLink>
                </li>
              ))}
              {!isLargeScreen && (
                <li>
                  <button
                    onClick={handleLoginLogout}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100"
                  >
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main>{props.children}</main>
    </div>
  );
};

export default Navbar;
