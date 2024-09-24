import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchBookings, rejectBooking, sendPayment } from '../Apis/Api';
import BookingCard from '../Card/BookingCard';
import { useNotification } from '../Context/NotificationContext';
import { Booking } from '../Interfaces/Interface';
import Tabs, { TabProps } from '../Tabs/Tabs';
import LoaderPage from '../Utils/LoaderPage'; // Import LoaderPage component
import NotFoundPage from '../Utils/NotFoundPage'; // Import NotFoundPage component

interface BookingType {
  allBookings: Booking[];
  pendingBookings: Booking[];
  rejectedBooking: Booking[];
}

const BookingDetails: React.FC = () => {
  const notification = useNotification();
  const { data: bookings, isLoading, refetch } = useQuery<BookingType, Error>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await fetchBookings();
      const booking: BookingType = await response.json();
      return booking;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <LoaderPage message="Loading Bookings..." />;
  if (!bookings || (bookings.pendingBookings.length === 0 && bookings.allBookings.length === 0 && bookings.rejectedBooking.length === 0)) {
    return <NotFoundPage message="No Bookings Found" />;
  }

  const pendingBooking = bookings.pendingBookings;
  const confirmedBooking = bookings.allBookings;
  const rejectedBooking = bookings.rejectedBooking;

  const accept = async (curr: Booking) => {
    const response = await sendPayment(curr.totalPrice, curr.bookingId, curr.user!.username, curr.user!.email);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'error');
      return;
    }
    refetch();
    notification.showNotification(await response.text(), 'success');
  };

  const reject = async (curr: Booking) => {
    const response = await rejectBooking(curr.bookingId);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'error');
      return;
    }
    refetch();
    notification.showNotification(await response.text(), 'success');
  };

  const tabs: TabProps[] = [
    {
      id: "pending",
      title: "Pending",
      content: (
        pendingBooking.length > 0 ? 
          pendingBooking.map(curr => (
            <BookingCard key={curr.bookingId} booking={curr} showPaymentInfo={false} showTravelerInfo={false} onAccept={() => accept(curr)} onReject={() => reject(curr)} />
          )) : 
          <NotFoundPage message="No Pending Bookings" />
      )
    },
    {
      id: "confirmed",
      title: "Confirmed",
      content: (
        confirmedBooking.length > 0 ? 
          confirmedBooking.map(curr => (
            <BookingCard key={curr.bookingId} booking={curr} showPaymentInfo={true} showTravelerInfo={true} />
          )) : 
          <NotFoundPage message="No Confirmed Bookings" />
      )
    },
    {
      id: "rejected",
      title: "Rejected",
      content: (
        rejectedBooking.length > 0 ? 
          rejectedBooking.map(curr => (
            <BookingCard key={curr.bookingId} booking={curr} showPaymentInfo={false} showTravelerInfo={false} />
          )) : 
          <NotFoundPage message="No Rejected Bookings" />
      )
    }
  ];

  return <Tabs tabs={tabs} />;
};

export default BookingDetails;
