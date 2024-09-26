import { useQuery } from "@tanstack/react-query";
import { fetchSupplier, lockUser, sendVerification } from "../Apis/Api";
import { useNotification } from "../Context/NotificationContext";
import { useUserContext } from "../Context/User";
import { User } from "../Interfaces/Interface";
import Table from "../Table/Table";
import LoaderPage from "../Utils/LoaderPage";
import NotFoundPage from "../Utils/NotFoundPage";

const ManageSupplier = () => {
  const {user} = useUserContext()
  const notification = useNotification();
  const header = ["Business", "Email", "Contact", "Phone", "Locked", "Agreement"];

  const { data: suppliers, isLoading, refetch } = useQuery<User[], Error>({
    queryKey: [`suppliers${user?.id}`],
    queryFn: async () => {
      const response = await fetchSupplier();
      if (!response.ok) {
        const errorText = await response.text();
        notification.showNotification(errorText, 'error');
      }
      const data: User[] = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Show the loader while data is being fetched
  if (isLoading) return <LoaderPage message="Loading Suppliers..." />;

  // Show "Details Not Found" if no suppliers are available
  if (!suppliers || suppliers.length === 0) return <NotFoundPage />;

  const toggleLock = async (supplier: User) => {
    const response = await lockUser(supplier.id!, !supplier.isLocked);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'warning');
      return;
    }
    refetch();
    notification.showNotification(await response.text(), 'success');
  };
  
  const toggleVerification = async (supplier: User) => {
    const response = await sendVerification(supplier);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'warning');
      return;
    }
    notification.showNotification(await response.text(), 'success');
  };

  const formattedData = suppliers!.map((supplier,index) => ({
    Business: supplier.businessName || 'N/A',
    Email: supplier.email || 'N/A',
    Contact: supplier.contactPerson || 'N/A',
    Phone: supplier.phone || 'N/A',
    Locked: (
      <i
      key={index}
        className={`fa-solid ${supplier.isLocked ? 'fa-lock text-red-500' : 'fa-lock-open text-green-500'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => toggleLock(supplier)}
      />
    ),
    Agreement: (
      <i
        className={`fa-solid ${supplier.isAgreement ? 'fa-circle-check text-green-500' : 'fa-file-contract text-yellow-500'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => toggleVerification(supplier)}
      />
    ),
  }));

  return <Table headers={header} data={formattedData} />;
};

export default ManageSupplier;
