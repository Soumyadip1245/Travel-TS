import { useQuery } from "@tanstack/react-query";
import { adminMonthly, adminStats } from "../Apis/Api";
import BarGraph, { ChartData } from "../Card/BarGraph";
import StatsCard, { StatsData } from "../Card/StatsCard";
import { AdminStats } from "../Interfaces/Interface";

const AdminPackage = () => {
  
  const { data: stats, isLoading } = useQuery<AdminStats, Error>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await adminStats();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  const { data: statsBooking, isLoading:LoadingBooking } = useQuery<number[], Error>({
    queryKey: ["statsBooking"],
    queryFn: async () => {
      const response = await adminMonthly();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <p>Loading...</p>;
  const statsArray: StatsData[] =[
    {
      title: 'Bookings',
      stats: stats?.totalBookings!,
      icon: <i className="fas fa-calendar-alt text-yellow-500 text-3xl"></i>
    },
    {
      title: 'Packages',
      stats: stats?.totalPackages!,
      icon: <i className="fas fa-box text-purple-500 text-3xl"></i>
    },
    {
      title: 'Users',
      stats: stats?.totalUsers!,
      icon: <i className="fas fa-user text-blue-500 text-3xl"></i>
    },
    {
      title: 'Suppliers',
      stats: stats?.totalSuppliers!,
      icon: <i className="fas fa-arrow-up text-green-500 text-3xl"></i>
    }
  ]
  const statsChart: ChartData = {
    label: "Monthly Booking",
    title: "Booking as per Month",
    xaxis: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    yaxis: statsBooking!
  }
  return (
    <div className="p-4">
    <StatsCard stats={statsArray}/>
    <BarGraph chart={statsChart}/>
    </div>
  );
};

export default AdminPackage;
