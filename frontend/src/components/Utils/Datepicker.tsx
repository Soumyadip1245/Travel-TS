import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
import React, { ReactNode, useEffect, useRef } from 'react';

interface DatepickerProps {
    value: string;
    onChange: (date: string) => void;
    minDate?: string;
    maxDate?: string;
    className?: string;
    label?: string;
    icon?: ReactNode;
    placeholder?: string;
}

const Datepicker: React.FC<DatepickerProps> = ({
    value,
    onChange,
    minDate,
    maxDate,
    className,
    label,
    icon,
    placeholder
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const instance = flatpickr(inputRef.current!, {
            dateFormat: 'Y-m-d',
            minDate,
            maxDate,
            onChange: (selectedDates) => {
                if (selectedDates.length > 0) {
                    const localDate = new Date(selectedDates[0]); 
                    localDate.setDate(localDate.getDate() + 1)// Convert to local date
                    onChange(localDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
                }
            },
        });

        return () => {
            instance.destroy(); // Clean up on unmount
        };
    }, [minDate, maxDate, onChange]);

    const commonClasses = 'block w-full p-4 text-sm border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

    return (
        <div className="mb-4">
            {label && <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    placeholder={placeholder || "Select date"}
                    className={`${commonClasses} ${icon ? 'pl-10' : ''} ${className}`}
                    readOnly
                />
            </div>
        </div>
    );
};

export default Datepicker;
