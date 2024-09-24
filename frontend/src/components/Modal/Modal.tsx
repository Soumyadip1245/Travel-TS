import { ReactNode } from 'react';

interface ModalProps {
    element: ReactNode;
    onClose: () => void;
}

const Modal = ({ element, onClose }: ModalProps) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-80 z-50 overflow-hidden">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="text-gray-900 dark:text-gray-300">{element}</div>
                
                <div className="flex justify-end mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2 dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
