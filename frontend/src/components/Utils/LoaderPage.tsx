import React from 'react';

const LoaderPage: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="w-16 h-16 text-white animate-spin"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          r="35"
          strokeDasharray="165"
          strokeDashoffset="0"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="mt-4 text-lg font-semibold">{message}</h1>
    </div>
  );
};

export default LoaderPage;
