import { useQuery } from "@tanstack/react-query";
import { fetchBookingsForUser } from "../Apis/Api";
import BookingCard from "../Card/BookingCard";
import { useNotification } from "../Context/NotificationContext";
import { useUserContext } from "../Context/User";
import { Booking } from "../Interfaces/Interface";
import Tabs, { TabProps } from "../Tabs/Tabs";
interface BookingType{
    allBookings: Booking[]
    pendingBookings: Booking[]
    rejectedBooking: Booking[]
  }
const ShowBookings = () => {
    const notification = useNotification()
    const {user} = useUserContext()
    const { data: bookings, isLoading, refetch } = useQuery<BookingType, Error>({
      queryKey: [`bookings${user?.id}`],
      queryFn: async () => {
        console.log(user)
        const response = await fetchBookingsForUser(user?.id);
        console.warn(response)
        const booking:BookingType = await response.json()
        
        return booking;
      },
      staleTime: 5 * 60 * 1000,
      retry: 2,
    });
    if(isLoading) return "Loading....."
    const pendingBooking = bookings!.pendingBookings!
  const confirmedBooking = bookings!.allBookings!
  const rejectedBooking = bookings!.rejectedBooking!
  
  const tabs: TabProps[] = [
    {
      id: "pending",
      title: "Pending",
      content: (
        pendingBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={false} showTravelerInfo={false} isUser={true}/>
        ))
      )
    },
    {
      id: "confirmed",
      title: "Confirmed",
      content: (
        confirmedBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={true} showTravelerInfo={true} isUser={true}/>
        ))
      )
    },
    {
      id: "rejected",
      title: "Rejected",
      content: (
        rejectedBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={false} showTravelerInfo={false} isUser={true}/>
        ))
      )
    }
  ]
  return (
    <Tabs tabs={tabs}/>
  )
}

export default ShowBookings
