import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseAppConfig from "../util/firebase-config";

const auth = getAuth(firebaseAppConfig);
const db = getFirestore(firebaseAppConfig);

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [desktopProfileMenu, setDesktopProfileMenu] = useState(false);
  const [mobileProfileMenu, setMobileProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDesktopProfileMenu(false);
      setMobileProfileMenu(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setSession(user);

        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          const data = snap.exists() ? snap.data() : {};

          setProfile({
            fullName: data.fullName || user.displayName || "",
            photoURL: data.photoURL || user.photoURL || "/images/avatar.png",
          });
        } catch (error) {
          console.log(error);
          setProfile({
            fullName: user.displayName || "",
            photoURL: user.photoURL || "/images/avatar.png",
          });
        }
      } else {
        setSession(false);
        setProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const displayName =
    profile?.fullName ||
    session?.displayName ||
    session?.email?.split("@")[0] ||
    "User";
  const avatarUrl =
    profile?.photoURL || session?.photoURL || "/images/avatar.png";

  const menus = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Category", href: "/category" },
    { label: "Contact Us", href: "/contactus" },
  ];

  if (session === null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
        <button
          type="button"
          disabled
          className="flex items-center rounded-md  px-4 py-2 text-2xl text-black"
        >
          <svg
            className="mr-3 h-6 w-6 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4  md:px-10">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/">
                <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide">
                  <span className="text-black">JHALA</span>
                  <span className="text-yellow-500"> COLLECTIONS</span>
                </h1>
              </Link>

              {/* Desktop Menu */}
              <ul className="hidden lg:flex items-center gap-6">
                {menus.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.href}
                      className="px-4 py-2 text-gray-700 font-medium rounded-lg transition-all duration-300 hover:bg-yellow-50 hover:text-yellow-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Desktop Buttons */}
              {!session && (
                <div className="hidden lg:flex items-center gap-4">
                  <Link
                    to="/login"
                    className="font-medium text-white bg-black px-5 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300"
                  >
                    LogIn
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              {session && (
                <div className="hidden lg:block relative">
                  <button
                    onClick={() => setDesktopProfileMenu(!desktopProfileMenu)}
                    className="flex items-center gap-2 font-medium hover:text-yellow-600 transition cursor-pointer"
                  >
                    <span className="capitalize">Hi, {displayName}</span>
                    <img
                      className="h-9 w-9 rounded-full border border-gray-200 shadow-sm object-cover"
                      src={avatarUrl}
                      alt="Avatar"
                      onError={(e) => (e.target.src = "/images/avatar.png")}
                    />
                  </button>
                  {desktopProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link
                        to="/profile"
                        onClick={() => setDesktopProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition duration-200"
                      >
                        <i className="ri-user-line text-lg"></i>
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setDesktopProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition duration-200"
                      >
                        <i className="ri-shopping-cart-line text-lg"></i>
                        <span>Card</span>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <div
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition duration-200 text-left cursor-pointer"
                      >
                        <i className="ri-logout-circle-r-line text-lg"></i>
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Toggle Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden text-3xl text-black"
              >
                <i className="ri-menu-3-line"></i>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        <div
          className={`fixed  lg:hidden  top-0 right-0 h-full w-70 bg-white shadow-2xl z-100 transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h2 className="font-bold text-lg">
              <span className="text-black">JHALA</span>
              <span className="text-yellow-500"> COLLECTIONS</span>
            </h2>

            <button onClick={() => setIsOpen(false)} className="text-3xl">
              <i className="ri-close-line"></i>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="flex flex-col p-5 gap-2">
            {menus.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-yellow-50 hover:text-yellow-600 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons mobile */}
          {!session && (
            <div className="p-5 flex flex-col gap-3">
              <Link
                to="/login"
                className="font-medium text-white bg-black px-5 py-2 rounded-full shadow-md hover:scale-105 transition-all duration-300"
              >
                LogIn
              </Link>

              <Link
                to="/signup"
                className="bg-linear-to-r from-yellow-400 to-yellow-500 text-black px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
          {session && (
            <div className="lg:hidden p-5 border-t border-gray-100 mt-auto">
              <button
                onClick={() => setMobileProfileMenu(!mobileProfileMenu)}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                    src={avatarUrl}
                    alt="Avatar"
                    onError={(e) => (e.target.src = "/images/avatar.png")}
                  />
                  <div className="text-left">
                    <p className="text-xs text-gray-500 font-medium">
                      Logged in as
                    </p>
                    <p className="text-sm font-bold text-gray-800">
                      {displayName}
                    </p>
                  </div>
                </div>
                <i
                  className={`ri-arrow-${mobileProfileMenu ? "up" : "down"}-s-line text-lg text-gray-500 transition`}
                ></i>
              </button>

              {mobileProfileMenu && (
                <div className="mt-2 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link
                    to="/profile"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileProfileMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
                  >
                    <i className="ri-user-line text-lg"></i>
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => {
                      setIsOpen(false);
                      setMobileProfileMenu(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition"
                  >
                    <i className="ri-shopping-cart-line text-lg"></i>
                    <span>Card</span>
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition text-left cursor-pointer"
                  >
                    <i className="ri-logout-circle-r-line text-lg"></i>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          ></div>
        )}

        {/* Page Content */}
        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
}

export default Layout;
