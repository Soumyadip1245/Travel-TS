import { useQuery } from "@tanstack/react-query";
import { supplierChart, supplierStats } from "../Apis/Api";
import BarGraph, { ChartData } from "../Card/BarGraph";
import StatsCard, { StatsData } from "../Card/StatsCard";
import { useUserContext } from "../Context/User";
import { SupplierChart, SupplierStats } from "../Interfaces/Interface";

const SupplierPackage = () => {
  const {user} = useUserContext()
  const { data: stats, isLoading } = useQuery<SupplierStats, Error>({
    queryKey: ["statsSupplier"],
    queryFn: async () => {
      const response = await supplierStats(user?.id!);
      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  const { data: statsBooking, isLoading:LoadingBooking } = useQuery<SupplierChart[], Error>({
    queryKey: ["supplierBooking"],
    queryFn: async () => {
      const response = await supplierChart(user?.id!);
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
      title: 'Approved Packages',
      stats: stats?.approvedPackagesCount!,
      icon: <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
    }
  ]
  const destination = statsBooking?.map((curr: SupplierChart)=> (curr.destinationName))
  const count = statsBooking?.map((curr: SupplierChart)=>(curr.packageCount))
  const statsChart: ChartData = {
    label: "Package Destination",
    title: "Package as per Destination",
    xaxis: destination!,
    yaxis: count!
  }
  return (
    <div className="p-4">
    <StatsCard stats={statsArray}/>
    <BarGraph chart={statsChart}/>
    </div>
  )
}

export default SupplierPackage
