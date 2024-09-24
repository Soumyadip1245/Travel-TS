import React, { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer); 
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Success icon</span>
          </div>
        );
      case "error":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 1.25A8.75 8.75 0 1 0 18.75 10 8.75 8.75 0 0 0 10 1.25Zm0 12.5a1.25 1.25 0 1 1 1.25-1.25A1.25 1.25 0 0 1 10 13.75Zm0-8.75a.875.875 0 0 1 .875.875v5a.875.875 0 0 1-1.75 0v-5A.875.875 0 0 1 10 5Z" />
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
        );
        case "warning":
          return (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-yellow-700 dark:text-yellow-200">
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.257 3.099a1.429 1.429 0 0 1 2.486 0l5.933 10.885A1.429 1.429 0 0 1 16.933 16H3.067a1.429 1.429 0 0 1-1.257-2.016L9.257 3.1Zm.743 9.651a1.25 1.25 0 1 0 1.25 1.25 1.25 1.25 0 0 0-1.25-1.25Zm-.625-4.5v2.5a.625.625 0 1 0 1.25 0v-2.5a.625.625 0 1 0-1.25 0Z" />
              </svg>
              <span className="sr-only">Warning icon</span>
            </div>
          );
      default:
        return null;
    }
  };
  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
    >
      {getIcon()}
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        onClick={onClose}
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Notification;
