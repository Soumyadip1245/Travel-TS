import React, { useState } from 'react';
import { useNotification } from '../Context/NotificationContext';
import { SightseeingDetail } from '../Interfaces/Interface'; // Update import path as needed
import Input from '../Utils/Input';

interface SightseeingDetailsFormProps {
    onSubmit: (data: SightseeingDetail) => void;
}

const SightseeingDetailForm: React.FC<SightseeingDetailsFormProps> = ({ onSubmit }) => {
    const notification = useNotification();
    const [sightseeingDetail, setSightseeingDetail] = useState<SightseeingDetail | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSightseeingDetail({ ...sightseeingDetail!, [name]: value });
    };

    const handleSubmit = () => {
        if (sightseeingDetail?.tourName) {
            onSubmit(sightseeingDetail);
        } else {
            notification.showNotification("All fields are required", 'warning');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Sightseeing Detail</h3>
            <Input
                type="text"
                name="tourName"
                placeholder="Tour Name"
                value={sightseeingDetail?.tourName || ''}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="tourDescription"
                placeholder="Tour Description"
                value={sightseeingDetail?.tourDescription || ''}
                onChange={handleChange}
            />
            <Input
                type="number"
                name="priority"
                placeholder="Priority"
                value={sightseeingDetail?.priority || ''}
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

export default SightseeingDetailForm;
