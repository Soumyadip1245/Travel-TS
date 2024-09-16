import React from 'react';
import { Booking } from '../Interfaces/Interface';

interface BookingCardProps {
    booking: Booking;
    showTravelerInfo: boolean;
    showPaymentInfo: boolean;
    onAccept?: () => void;
    onReject?: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({
    booking,
    showTravelerInfo,
    showPaymentInfo,
    onAccept,
    onReject,
}) => {
    const statusBadgeColor = (status: string) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-green-500 text-white';
            case 'Pending':
                return 'bg-yellow-500 text-white';
            case 'Rejected':
                return 'bg-red-500 text-white';
            case 'Approved':
                return 'bg-purple-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="flex flex-col w-full p-6 bg-gray-800 text-white rounded-lg shadow-md mb-4 border border-gray-700">
            {/* Title and Status Badge */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{booking.package?.name}</h3>
                <span className={`px-2 py-1 rounded-full ${statusBadgeColor(booking.status)}`}>
                    {booking.status}
                </span>
            </div>

            {/* Booking Details Table */}
            <table className="table-auto w-full text-left border-separate border border-gray-600 mb-4">
                <thead>
                    <tr className="bg-gray-700 text-gray-300">
                        <th className="p-2 border-b border-gray-600">Detail</th>
                        <th className="p-2 border-b border-gray-600">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-semibold p-2 border-b border-gray-600">Booking Date:</td>
                        <td className="p-2 border-b border-gray-600">{booking.bookingDate}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold p-2 border-b border-gray-600">Start Date:</td>
                        <td className="p-2 border-b border-gray-600">{booking.startDate}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold p-2 border-b border-gray-600">End Date:</td>
                        <td className="p-2 border-b border-gray-600">{booking.endDate}</td>
                    </tr>
                    <tr>
                        <td className="font-semibold p-2 border-gray-600">Total Price:</td>
                        <td className="p-2 border-gray-600">₹{booking.totalPrice}</td>
                    </tr>
                </tbody>
            </table>

            {/* Supplier Amount & GST for Pending Bookings */}
            {booking.status === 'Pending' && (
                <table className="table-auto w-full text-left border-separate border border-gray-600 mb-4">
                    <thead>
                        <tr className="bg-gray-700 text-gray-300">
                            <th className="p-2 border-b border-gray-600">Detail</th>
                            <th className="p-2 border-b border-gray-600">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-semibold p-2 border-b border-gray-600">Supplier Amount:</td>
                            <td className="p-2 border-b border-gray-600">₹{booking.supplierPaymentAmount}</td>
                        </tr>
                        <tr>
                            <td className="font-semibold p-2 border-gray-600">GST Amount:</td>
                            <td className="p-2 border-gray-600">₹{(booking.supplierPaymentAmount * 0.18).toFixed(2)}</td> {/* Assuming 18% GST */}
                        </tr>
                    </tbody>
                </table>
            )}

            {/* Traveler Info Warning for Unconfirmed Bookings */}
            {!showTravelerInfo && booking.status !== 'Rejected' && (
                <div className="p-4 mb-4 text-yellow-400 bg-yellow-700 rounded-lg">
                    Traveler information and payment details will be available once the booking is confirmed.
                </div>
            )}

            {/* Traveler Information */}
            {showTravelerInfo && (
                <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Traveler Information:</h4>
                    <table className="table-auto w-full text-left border-separate border border-gray-600 mb-4">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="p-2 border-b border-gray-600">Detail</th>
                                <th className="p-2 border-b border-gray-600">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booking.travelerInfos?.map((traveler, index) => (
                                <tr key={index}>
                                    <td className={`font-semibold p-2 border-gray-600 ${index==booking.travelerInfos!.length - 1? "":"border-b"}`}>Name:</td>
                                    <td className={`p-2 border-gray-600 ${index==booking.travelerInfos!.length - 1?"": "border-b"}`}>{traveler.fullName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Payment Information */}
            {showPaymentInfo && (
                <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">Payment Information:</h4>
                    <table className="table-auto w-full text-left border-separate border border-gray-600 mb-4">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="p-2 border-b border-gray-600">Detail</th>
                                <th className="p-2 border-b border-gray-600">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold p-2 border-b border-gray-600">Payment Status:</td>
                                <td className="p-2 border-b border-gray-600">{booking.payment?.paymentStatus}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2 border-b border-gray-600">Transaction ID:</td>
                                <td className="p-2 border-b border-gray-600">{booking.payment?.transactionId}</td>
                            </tr>
                            <tr>
                                <td className="font-semibold p-2 border-gray-600">Amount:</td>
                                <td className="p-2  border-gray-600">₹{booking.payment?.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Accept and Reject Buttons for Pending Bookings */}
            {booking.status === 'Pending' && (
                <div className="flex space-x-4">
                    <button
                        onClick={onAccept}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg"
                    >
                        Accept
                    </button>
                    <button
                        onClick={onReject}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg"
                    >
                        Reject
                    </button>
                </div>
            )}

            {/* Approved Booking Alert */}
            {booking.status === 'Approved' && (
                <div className="p-4 mb-4 text-white-400 bg-green-700 rounded-lg">
                    This booking has been accepted and payment link is sent.
                </div>
            )}

            {/* Rejected Booking Alert */}
            {booking.status === 'Rejected' && (
                <div className="p-4 mb-4 text-white-400 bg-red-700 rounded-lg">
                    This booking has been rejected. Please contact support for further assistance.
                </div>
            )}
        </div>
    );
};

export default BookingCard;
