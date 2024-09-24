import React from 'react';

interface Modal {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    showConfirm: boolean
}

const ConfirmModal: React.FC<Modal> = ({ isOpen, onClose, onConfirm, showConfirm, title, message, confirmText, cancelText }) => {
    if (!isOpen) return null;

    return (
        <div id="popup-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full inset-0 bg-gray-900 bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" onClick={onClose} className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">{message}</p>
                        {showConfirm && <button
                            onClick={onConfirm}
                            className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
                        >
                            {confirmText}
                        </button>}
                        <button
                            onClick={onClose}
                            className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
