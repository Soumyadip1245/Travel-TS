import React, { useEffect, useState } from 'react';
import Datepicker from '../Utils/Datepicker';
import Input from '../Utils/Input';

export interface Traveler {
    fullName: string;
    passportNumber: string;
    dateOfBirth: string;
    ageCategory: 'Child' | 'Adult';
}

interface TravelerFormProps {
    onAddTraveler: (traveler: Traveler) => void;
    traveler: Traveler;
}

const calculateAgeCategory = (dob: string): 'Child' | 'Adult' => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age < 18 ? 'Child' : 'Adult';
};

const TravelForm: React.FC<TravelerFormProps> = ({ onAddTraveler, traveler }) => {
    const [formTraveler, setFormTraveler] = useState<Traveler>(traveler);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormTraveler({ ...formTraveler, [name]: value });
    };

    const handleDateChange = (date: string) => {
        console.log(date);
        setFormTraveler({ ...formTraveler, dateOfBirth: date });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const ageCategory = calculateAgeCategory(formTraveler.dateOfBirth);
        onAddTraveler({ ...formTraveler, ageCategory });
        setIsSaved(true);
    };

    useEffect(() => {
        setFormTraveler(traveler);
        setIsSaved(false);
    }, [traveler]);

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                    name='fullName'
                    placeholder='Full Name'
                    value={formTraveler.fullName}
                    onChange={handleChange}
                    type="text"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <Input
                    name='passportNumber'
                    placeholder='Passport Number'
                    value={formTraveler.passportNumber}
                    onChange={handleChange}
                    type="text"
                    className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="relative">
                    <Datepicker value={formTraveler.dateOfBirth} onChange={handleDateChange} placeholder='Select Date of birth' />
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                {!isSaved ? (
                    <button
                        type="submit"
                        className="flex items-center text-purple-400 transition duration-200"
                    >
                        <i className="fas fa-save mr-2"></i>
                        Save Traveler
                    </button>
                ) : (
                    <div className="flex items-center text-green-600">
                        <i className="fas fa-check mr-2"></i>
                        <span>Traveler Saved!</span>
                    </div>
                )}
            </div>
        </form>
    );
};

export default TravelForm;
