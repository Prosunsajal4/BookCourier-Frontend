import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import { FaBook } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Sync theme on load and when theme changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <div className="fixed w-full bg-base-100 z-10 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo and Website Name */}
            <Link to="/" className="flex items-center gap-2">
              <FaBook className="text-2xl text-primary" />
              <span className="font-bold text-lg text-primary">
                BookCourier – Library-to-Home Delivery System
              </span>
            </Link>
            {/* Primary nav links */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/books" className="font-medium hover:text-primary">
                All Books
              </Link>
            </div>
            {/* Dropdown Menu & Theme Toggle */}
            <div className="relative flex items-center gap-4">
              {/* Theme Toggle */}
              <div className="tooltip tooltip-bottom" data-tip="Toggle theme">
                <input
                  type="checkbox"
                  className="toggle toggle-md toggle-primary"
                  checked={theme === "dark"}
                  onChange={(e) =>
                    setTheme(e.target.checked ? "dark" : "light")
                  }
                  aria-label="Theme toggle"
                />
              </div>
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-base-100 overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-base-200 transition font-semibold"
                    >
                      Home
                    </Link>
                    <Link
                      to="/books"
                      className="block md:hidden px-4 py-3 hover:bg-base-200 transition font-semibold"
                    >
                      All Books
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className="px-4 py-3 hover:bg-base-200 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
