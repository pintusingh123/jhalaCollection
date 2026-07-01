import { useEffect, useState } from "react";

import React from "react";
import firebaseAppConfig from "../../util/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

const auth = getAuth(firebaseAppConfig);

function PreGuard() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSession(user);
      } else {
        setSession(false);
      }
    });
  }, []);
// user login page access krt time loader
  if (session === null)
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

// if user logged inh
  if (session) return <Navigate to="/" />;

//  if session == false
  return <Outlet />
}

export default PreGuard;
