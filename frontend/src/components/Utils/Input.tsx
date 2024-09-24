import React from 'react';

interface InputProps {
    type: string;
    name: string;
    value: string | number;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    className?: string;
    required?: boolean;
    textarea?: boolean;
    icon?: React.ReactNode; // Optional prop for an icon
    label?: string; // New optional prop for label
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    value,
    placeholder,
    onChange,
    className = '',
    required = false,
    textarea = false,
    icon = null,
    label = '' // New optional prop for label
}) => {
    const commonClasses = 'block w-full p-4 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

    return (
        <div className="mb-4">
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            {textarea ? (
                <textarea
                    name={name}
                    value={value as string}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`${commonClasses} ${className}`}
                    required={required}
                />
            ) : (
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        name={name}
                        value={value as string | number}
                        placeholder={placeholder}
                        onChange={onChange}
                        className={`${commonClasses} ${icon ? 'pl-10' : ''} ${className}`}
                        required={required}
                    />
                </div>
            )}
        </div>
    );
};

export default Input;
