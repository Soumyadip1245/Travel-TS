import React, { useEffect, useState } from 'react';
import { BookingCreate } from '../Interfaces/Interface';
import Datepicker from '../Utils/Datepicker';
import Input from '../Utils/Input';

interface ReviewProps {
    booking: BookingCreate;
    confirmBooking: (bookingData: BookingCreate) => void; // Changed to require BookingCreate
}

const ReviewBooking: React.FC<ReviewProps> = ({ booking, confirmBooking }) => {
    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);
    const [specialRequests, setSpecialRequests] = useState(booking.specialRequests || '');
    const [totalPrice, setTotalPrice] = useState(0);
    const [supplierPaymentAmount, setSupplierPaymentAmount] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);

    useEffect(() => {
        const calculatePricing = () => {
            const pricePerTraveller = booking.price; 
            const numberOfTravellers = booking.travellers.length;

            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
                const totalDays = Math.round((end.getTime() - start.getTime()) / oneDay);

                const calculatedTotalPrice = pricePerTraveller * numberOfTravellers * totalDays;
                const calculatedGstAmount = calculatedTotalPrice * 0.18; // Assuming GST is 18%
                const calculatedSupplierPaymentAmount = calculatedTotalPrice;

                setTotalPrice(calculatedTotalPrice + calculatedGstAmount);
                setSupplierPaymentAmount(calculatedSupplierPaymentAmount);
                setGstAmount(calculatedGstAmount);
            }
        };

        calculatePricing();
    }, [startDate, endDate, booking]);

    const handleSpecialRequestsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setSpecialRequests(value);
    };

    // Handle Confirm Booking
    const handleConfirmBooking = () => {
        const updatedBooking: BookingCreate = {
            ...booking,
            startDate,
            endDate,
            specialRequests,
            totalPrice,
            supplierPaymentAmount,
        };
        confirmBooking(updatedBooking); // Send the updated booking data back to parent
    };

    return (
        <div className="p-4 space-y-6">
            {/* Date Pickers */}
            <div className="flex space-x-4">
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        Start Date
                    </label>
                    <Datepicker
                        value={startDate}
                        onChange={setStartDate}
                        placeholder="Select start date"
                    />
                </div>
                <div className="flex-1">
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                        End Date
                    </label>
                    <Datepicker
                        value={endDate}
                        onChange={setEndDate}
                        placeholder="Select end date"
                    />
                </div>
            </div>

            {/* Traveler Information Table */}
            <div className="overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg shadow">
                <h2 className="bg-gray-100 dark:bg-gray-700 text-lg font-semibold p-4">Traveler Information</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Full Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Passport Number</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Date of Birth</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {booking.travellers.map((traveler, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2">{traveler.fullName}</td>
                                <td className="px-4 py-2">{traveler.passportNumber}</td>
                                <td className="px-4 py-2">{traveler.dateOfBirth}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Package Details Table */}
            <div className="overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg shadow">
                <h2 className="bg-gray-100 dark:bg-gray-700 text-lg font-semibold p-4">Package Details</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Package Name</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Destination</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <tr>
                            <td className="px-4 py-2">{booking.packageName}</td>
                            <td className="px-4 py-2">{booking.destination}</td>
                            <td className="px-4 py-2">₹{booking.price.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Payment Details Table */}
            <div className="overflow-hidden border border-gray-300 dark:border-gray-600 rounded-lg shadow">
                <h2 className="bg-gray-100 dark:bg-gray-700 text-lg font-semibold p-4">Payment Details</h2>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Total Price</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Supplier Payment Amount</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-300">GST (18%)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <tr>
                            <td className="px-4 py-2">₹{totalPrice.toFixed(2)}</td>
                            <td className="px-4 py-2">₹{supplierPaymentAmount.toFixed(2)}</td>
                            <td className="px-4 py-2">₹{gstAmount.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Input
                type='text'
                name='specialRequests'
                textarea={true}
                value={specialRequests}
                onChange={handleSpecialRequestsChange}
                placeholder='Write down any special requests'
            />
            <button
                onClick={handleConfirmBooking} 
                className="mt-6 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Confirm Booking
            </button>
        </div>
    );
};

export default ReviewBooking;
