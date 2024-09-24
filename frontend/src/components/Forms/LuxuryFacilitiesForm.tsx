import React, { useState } from 'react';
import { useNotification } from '../Context/NotificationContext';
import { LuxuryFacility } from '../Interfaces/Interface'; // Update import path as needed
import Input from '../Utils/Input';

interface LuxuryFacilitiesFormProps {
    onSubmit: (data: LuxuryFacility) => void;
}

const LuxuryFacilitiesForm: React.FC<LuxuryFacilitiesFormProps> = ({ onSubmit }) => {
    const notification = useNotification();
    const [luxuryFacility, setLuxuryFacility] = useState<LuxuryFacility | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setLuxuryFacility({ ...luxuryFacility!, [name]: value });
    };

    const handleSubmit = () => {
        if (luxuryFacility?.facilityName) {
            onSubmit(luxuryFacility);
        } else {
            notification.showNotification("All fields are required", 'warning');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Luxury Facility</h3>
            <Input
                type="text"
                name="facilityName"
                placeholder="Facility Name"
                value={luxuryFacility?.facilityName || ''}
                onChange={handleChange}
            />
            <Input
                type="number"
                name="priority"
                placeholder="Priority"
                value={luxuryFacility?.priority || ''}
                onChange={handleChange}
            />
            <button
                type="button"
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Submit
            </button>
        </div>
    );
};

export default LuxuryFacilitiesForm;
