import React from 'react';
interface FloatingBookButtonProps {
    onBookNow: () => void;
    text?: string;
  }
const FloatingBookButton: React.FC<FloatingBookButtonProps> = ({onBookNow,text}) => {
  return (
    <div className="fixed bottom-5 right-5">
      <button  onClick={onBookNow} className="bg-green-500 dark:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 dark:hover:bg-green-800 transition duration-300">
        {text ?? 'Book Now'}
      </button>
    </div>
  );
};

export default FloatingBookButton;
