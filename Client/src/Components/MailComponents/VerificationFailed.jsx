import React from "react";

function VerificationFailed() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
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
                d="M12 12m-9 0a9 9 0 1118 0 9 9 0 01-18 0zm5-5l4 4m0 0l4 4m-4-4l-4 4m4-4l4-4"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Verification Failed
        </h1>
        <p className="text-gray-600 mb-6">
          We were unable to verify your account. Please try again or contact
          support for assistance.
        </p>
        <div className="space-x-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
            Retry
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationFailed;
