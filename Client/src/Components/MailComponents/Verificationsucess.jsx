import React from "react";
import { Link } from "react-router-dom";
function VerificationSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12m-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verification Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Your account has been successfully verified. You can now access all
          features.
        </p>
        <Link to={"/login"}>
          <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default VerificationSuccess;
