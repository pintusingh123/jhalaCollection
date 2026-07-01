import React, { useState } from "react";
import Layout from "./Layout";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseAppConfig from "../util/firebase-config";
import { Link, useNavigate } from "react-router-dom";

const auth = getAuth(firebaseAppConfig);

function Login() {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loader, setLoader] = useState(false)


  const [formValue, setFormvalue] = useState({
    email: "",
    password: "",
  });
  const handleValue = (e) => {
    const input = e.target;
    const name = input.name;
    const value = input.value;
    setFormvalue({
      ...formValue,
      [name]: value,
    });
     setErrorMessage(null)
  };

  const login = async (e) => {
    e.preventDefault();
   setLoader(true)
    try {
      await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      );
      alert("Login Successful 🎉");
      navigate("/");
    } catch (error) {
      setErrorMessage("Error:invalid Credential try again later.");
    }finally{
      setLoader(false)
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="  w-full max-w-5xl h-1/2   shadow-sm rounded-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side Image */}
          <div className="w-full md:w-1/2 flex items-center justify-center ">
            <img
              src="/images/login.png"
              alt="Login"
              className="w-full max-w-xs md:max-w-sm lg:max-w-full h-auto object-contain"
            />
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-12">
            <form onSubmit={login} className="w-full max-w-md space-y-6">
              <div className="text-center">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h1>
                <p className="text-gray-500 mt-2 text-sm">Please enter your login details below</p>
              </div>

              <div className="space-y-2">
                <label className="block font-semibold text-gray-700 text-sm sm:text-base">Email Address</label>
                <input
                  onChange={handleValue}
                  type="email"
                  required
                  name="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-base"
                />
              </div>

              <div className="relative space-y-2">
                <label className="block font-semibold text-gray-700 text-sm sm:text-base">Password</label>
                <input
                  required
                  onChange={handleValue}
                  type={passwordType}
                  name="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 text-base"
                />
                <button
                  type="button"
                  className="absolute cursor-pointer top-10 right-4 text-xl text-gray-400 hover:text-yellow-600 transition"
                  onClick={() =>
                    setPasswordType(
                      passwordType === "password" ? "text" : "password",
                    )
                  }
                >
                  {passwordType === "password" ? (
                    <i className="ri-eye-line"></i>
                  ) : (
                    <i className="ri-eye-off-line"></i>
                  )}
                </button>
              </div>

              {loader ? (
                <button
                  type="submit"
                  disabled
                  className="w-full bg-gray-400 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
                >
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  <span>Logging in...</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-yellow-500 hover:text-black transition-all duration-300 shadow-lg hover:shadow-yellow-500/10 cursor-pointer text-base tracking-wide"
                >
                  Login
                </button>
              )}

              <div className="flex px-2 justify-center gap-1.5 text-sm sm:text-base">
                <p className="text-gray-500">Don't have an account?</p>
                <Link className="text-black font-bold hover:underline" to={"/signup"}>
                  Register
                </Link>
              </div>

              {errorMessage && (
                <div className="flex justify-between items-center mt-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl shadow">
                  <p className="text-sm font-semibold">{errorMessage}</p>
                  <button className="cursor-pointer text-lg hover:text-red-900" onClick={() => setErrorMessage(null)}>
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
