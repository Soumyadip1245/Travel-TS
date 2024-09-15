import { useQuery } from "@tanstack/react-query";
import { adminStats } from "../Apis/Api";
import { useUserContext } from "../Context/User";
import { AdminStats } from "../Interfaces/Interface";
import CountryPackageChart from "./CountryPackageChart";

const AdminPackage = () => {
  const { user } = useUserContext();
  
  const { data: stats, isLoading } = useQuery<AdminStats, Error>({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await adminStats();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {/* Supplier Stat Card */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalSuppliers}</h3>
          <p className="text-gray-500 dark:text-gray-400">Suppliers</p>
        </div>
        <i className="fas fa-arrow-up text-green-500 text-3xl"></i> {/* FontAwesome icon */}
      </div>

      {/* User Stat Card */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalUsers}</h3>
          <p className="text-gray-500 dark:text-gray-400">Users</p>
        </div>
        <i className="fas fa-user text-blue-500 text-3xl"></i> {/* FontAwesome icon */}
      </div>

      {/* Package Stat Card */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalPackages}</h3>
          <p className="text-gray-500 dark:text-gray-400">Packages</p>
        </div>
        <i className="fas fa-box text-purple-500 text-3xl"></i> {/* FontAwesome icon */}
      </div>

      {/* Booking Stat Card */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stats?.totalBookings}</h3>
          <p className="text-gray-500 dark:text-gray-400">Bookings</p>
        </div>
        <i className="fas fa-calendar-alt text-yellow-500 text-3xl"></i> {/* FontAwesome icon */}
      </div>
    </div>
    <CountryPackageChart/>
    </div>
  );
};

export default AdminPackage;
