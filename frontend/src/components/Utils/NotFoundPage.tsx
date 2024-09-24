import React from 'react';

const NotFoundPage: React.FC<{ message?: string }> = ({message = 'Details Not Found'}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        className="w-16 h-16 text-white"
      >
        <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="32" y1="16" x2="32" y2="36" stroke="currentColor" strokeWidth="4" />
        <circle cx="32" cy="46" r="2" fill="currentColor" />
      </svg>
      <h1 className="mt-4 text-lg font-semibold">{message}</h1>
    </div>
  );
};

export default NotFoundPage;
