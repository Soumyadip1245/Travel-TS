import { useQuery } from "@tanstack/react-query";
import { fetchBookings, rejectBooking, sendPayment } from "../Apis/Api";
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
const ManageBooking = () => {
    const notification = useNotification()
    const {user} = useUserContext()
    const { data: bookings, isLoading, refetch } = useQuery<BookingType, Error>({
      queryKey: ["bookings"],
      queryFn: async () => {
        console.log(user)
        const response = await fetchBookings(user?.id);
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
  const accept = async (curr: Booking) => {
    const response = await sendPayment(curr.totalPrice,curr.bookingId,curr.user!.username,curr.user!.email)
    if(!response.ok){
      notification.showNotification(await response.text(),'error')
      return
    }
    refetch()
    notification.showNotification(await response.text(),'success')
  }
  const reject = async (curr: Booking) => {
    const response = await rejectBooking(curr.bookingId)
    if(!response.ok){
      notification.showNotification(await response.text(),'error')
      return
    }
    refetch()
    notification.showNotification(await response.text(),'success')
  }
  const tabs: TabProps[] = [
    {
      id: "pending",
      title: "Pending",
      content: (
        pendingBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={false} showTravelerInfo={false} onAccept={()=>accept(curr)} onReject={()=>reject(curr)}/>
        ))
      )
    },
    {
      id: "confirmed",
      title: "Confirmed",
      content: (
        confirmedBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={true} showTravelerInfo={true}/>
        ))
      )
    },
    {
      id: "rejected",
      title: "Rejected",
      content: (
        rejectedBooking?.map(curr=>(
          <BookingCard booking={curr} showPaymentInfo={false} showTravelerInfo={false}/>
        ))
      )
    }
  ]
  return (
    <Tabs tabs={tabs}/>
  )
}

export default ManageBooking
