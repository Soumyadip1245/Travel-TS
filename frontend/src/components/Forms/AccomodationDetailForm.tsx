import React, { useState } from 'react';
import { useNotification } from '../Context/NotificationContext';
import { AccommodationDetail } from '../Interfaces/Interface';
import Input from '../Utils/Input';

interface AccommodationDetailsFormProps {
    onSubmit: (data: AccommodationDetail) => void;
}

const AccommodationDetailForm: React.FC<AccommodationDetailsFormProps> = ({ onSubmit }) => {
    const notification = useNotification();
    const [accommodationDetails, setAccommodationDetails] = useState<AccommodationDetail | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAccommodationDetails({ ...accommodationDetails!, [name]: value });
    };

    const handleSubmit = () => {
        if (accommodationDetails?.hotelName && accommodationDetails.roomType) {
            onSubmit(accommodationDetails);
        } else {
            notification.showNotification("All fields are required", 'warning');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Accommodation Details</h3>
            <Input
                type="text"
                name="hotelName"
                placeholder="Hotel Name"
                value={accommodationDetails?.hotelName || ''}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="roomType"
                placeholder="Room Type"
                value={accommodationDetails?.roomType || ''}
                onChange={handleChange}
            />
            <Input
                type="number"
                name="priority"
                placeholder="Priority"
                value={accommodationDetails?.priority || ''}
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

export default AccommodationDetailForm;
