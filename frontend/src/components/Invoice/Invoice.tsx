import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchBookingbyId } from '../Apis/Api';
import { Booking } from '../Interfaces/Interface';

const Invoice = () => {
    const { id } = useParams();
    const { data: bookingData, isLoading } = useQuery<Booking, Error>({
        queryKey: ["bookings"],
        queryFn: async () => {
            const response = await fetchBookingbyId(Number(id));
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 text-black rounded-lg shadow-lg border border-black m-8">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-blue-500">Travel Package Invoice</h1>
                <p className="text-gray-700">Your travel adventure begins here!</p>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold border-b border-blue-500 mb-2">Booking Details</h2>
                <table className="w-full border-collapse mb-4">
                    <tbody>
                        <tr>
                            <td className="border p-2">Booking ID</td>
                            <td className="border p-2">{bookingData!.bookingId}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Booking Date</td>
                            <td className="border p-2">{new Date(bookingData!.bookingDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Package Name</td>
                            <td className="border p-2">{bookingData!.package!.name}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Start Date</td>
                            <td className="border p-2">{new Date(bookingData!.startDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">End Date</td>
                            <td className="border p-2">{new Date(bookingData!.endDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Special Requests</td>
                            <td className="border p-2">{bookingData!.specialRequests}</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Status</td>
                            <td className="border p-2">{bookingData!.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold border-b border-blue-500 mb-2">Traveler Information</h2>
                <table className="w-full border-collapse mb-4">
                    <thead>
                        <tr>
                            <th className="border p-2">Traveler Name</th>
                            <th className="border p-2">Date of Birth</th>
                            <th className="border p-2">Passport Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData!.travelerInfos!.map((traveler, index) => (
                            <tr key={index}>
                                <td className="border p-2">{traveler.fullName}</td>
                                <td className="border p-2">{new Date(traveler.dateOfBirth).toLocaleDateString()}</td>
                                <td className="border p-2">{traveler.passportNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2 className="text-xl font-bold border-b border-blue-500 mb-2">Price Breakdown</h2>
                <table className="w-full border-collapse mb-4">
                    <tbody>
                        <tr>
                            <td className="border p-2">Package Price</td>
                            <td className="border p-2">₹{bookingData!.package!.price.toLocaleString()} per traveller</td>
                        </tr>
                        <tr>
                            <td className="border p-2">Number of Travelers</td>
                            <td className="border p-2">{bookingData!.travelerInfos!.length}</td>
                        </tr>
                        <tr className="font-bold">
                            <td className="border p-2">Total GST (18%)</td>
                            <td className="border p-2">₹{(bookingData!.totalPrice - bookingData!.supplierPaymentAmount).toLocaleString()}</td>
                        </tr>
                        <tr className="font-bold">
                            <td className="border p-2">Total Price</td>
                            <td className="border p-2">₹{bookingData!.totalPrice.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center mt-6">
                <p className="text-gray-700">&copy; 2024 OneStop. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Invoice;
