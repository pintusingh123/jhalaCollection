import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseAppConfig);

function Signup() {
  const [passwordType, setPasswordType] = useState("password");
  const [isError, setIsError] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  // Signup Function
  const signup = async (event) => {
    event.preventDefault();

    try {
      setLoader(true);

      await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );

      setIsError(null);
      navigate("/");
    } catch (err) {
      let message = "Something went wrong. Please try again.";

      switch (err.code) {
        case "auth/email-already-in-use":
          message = "This email is already registered.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          message = "Password should be at least 6 characters.";
          break;

        case "auth/network-request-failed":
          message = "Network error. Check your internet connection.";
          break;

        default:
          message = err.message;
      }

      setIsError(message);
    } finally {
      setLoader(false);
    }
  };

  // Handle Input Change
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    setIsError(null);
  };

  // Close Error Alert
  const offClose = () => {
    setIsError(null);
  };

  return (
    <Layout>
      {/* Premium Top Loader */}
      {loader && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-pulse">
          <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl px-6 py-4 flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>

              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <i className="ri-user-add-fill text-yellow-400 text-lg"></i>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Creating Account
              </h3>

              <p className="text-sm text-gray-500">
                Please wait while we set things up...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-6 bg-gray-50">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Image Section */}
          <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-8">
            <img
              src="/images/signup.svg"
              alt="Sign Up"
              className="w-full max-w-[280px] h-full md:max-w-[350px] object-contain"
            />
          </div>

          {/* Right Form Section */}
          <div
            className={`w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12 transition-all duration-300 ${
              loader ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <form onSubmit={signup} className="w-full max-w-md space-y-5">
              
              {/* Heading */}
              <div>
                <h1 className="text-3xl font-bold text-center">
                  Create Account
                </h1>

                <p className="text-center text-gray-500 mt-2">
                  Join us and get started today
                </p>
              </div>

              {/* Error Alert */}
              {isError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl shadow-md animate-in slide-in-from-top duration-300">
                  <div className="text-2xl mt-0.5">
                    <i className="ri-error-warning-fill"></i>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      Signup Failed
                    </h3>

                    <p className="text-sm break-words mt-1">
                      {isError}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={offClose}
                    className="text-xl hover:text-red-900 transition"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  name="fullname"
                  value={formValue.fullname}
                  onChange={handleOnChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-base"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleOnChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-base"
                />
              </div>

              {/* Password */}
              <div className="relative space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <input
                  required
                  name="password"
                  value={formValue.password}
                  onChange={handleOnChange}
                  type={passwordType}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-base"
                />

                <button
                  type="button"
                  onClick={() =>
                    setPasswordType(
                      passwordType === "password"
                        ? "text"
                        : "password"
                    )
                  }
                  className="absolute top-10 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:bg-yellow-50 hover:text-yellow-600 transition cursor-pointer"
                >
                  {passwordType === "password" ? (
                    <i className="ri-eye-line text-lg"></i>
                  ) : (
                    <i className="ri-eye-off-line text-lg"></i>
                  )}
                </button>
              </div>

              {/* Submit Button */}
              <button
                disabled={loader}
                type="submit"
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 shadow-lg cursor-pointer text-base tracking-wide ${
                  loader
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-black hover:bg-yellow-500 hover:text-black text-white hover:shadow-yellow-500/10"
                }`}
              >
                {loader ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="ri-loader-4-line animate-spin text-lg"></i>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login Link */}
              <p className="text-center text-sm text-gray-500">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1 text-black font-bold hover:underline"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Signup;