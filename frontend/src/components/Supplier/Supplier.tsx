import { MenuInterface } from '../Interfaces/Interface';
import Layout from '../Layout/Layout';
import ManagePackage from '../Supplier/ManagePackage';
import ManageBooking from './ManageBooking';
import SupplierPackage from './SupplierPackage';

const Supplier = () => {
    const menuItems: MenuInterface[] = [
        { label: 'Dashboard', icon: <i className="fa-solid fa-house"></i>, navigate:  <SupplierPackage/>},
        { label: 'Manage Packages', icon: <i className="fa-solid fa-ship"></i>,navigate: <ManagePackage/> },
        { label: 'All Bookings', icon: <i className="fa-solid fa-box"></i>,navigate: <ManageBooking/> }
      ];
  return (
    <Layout menuItems={menuItems} element={<SupplierPackage/>}/>
  )
}
export default Supplier
