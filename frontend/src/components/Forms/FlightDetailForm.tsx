import React, { useState } from 'react';
import { useNotification } from '../Context/NotificationContext';
import { FlightDetail } from '../Interfaces/Interface';
import Input from '../Utils/Input';

interface FlightDetailsFormProps {
    onSubmit: (data: FlightDetail) => void;
}

const FlightDetailForm: React.FC<FlightDetailsFormProps> = ({ onSubmit }) => {
    const notification = useNotification();
    const [flightDetails, setFlightDetails] = useState<FlightDetail|null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFlightDetails({ ...flightDetails!, [name]: value });
    };


    const handleSubmit = () => {
        if (flightDetails?.flightName && flightDetails.flightNumber ) {
            onSubmit(flightDetails);
        } else {
            notification.showNotification("All fields are required", 'warning');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Flight Details</h3>
            <Input
                type="text"
                name="flightName"
                placeholder="Flight Name"
                value={flightDetails?.flightName!}
                onChange={handleChange}
            />
            <Input
                type="text"
                name="flightNumber"
                placeholder="Flight Number"
                value={flightDetails?.flightNumber!}
                onChange={handleChange}
            />

            <Input
                type="number"
                name="priority"
                placeholder="Priority"
                value={flightDetails?.priority || ''}
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

export default FlightDetailForm;
