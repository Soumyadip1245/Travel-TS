import { MenuInterface } from '../Interfaces/Interface';
import Layout from '../Layout/Layout';
import AdminPackage from './AdminPackage';
import ManagePackage from './ManagePackage';
import ManageSupplier from './ManageSupplier';
import ManageUser from './ManageUser';

const Admin = () => {
    const menuItems: MenuInterface[] = [
        { label: 'Dashboard', icon: <i className="fa-solid fa-house"></i>, navigate:  <AdminPackage/>},
        { label: 'Manage Suppliers', icon: <i className="fa-solid fa-ship"></i>,navigate: <ManageSupplier/> },
        { label: 'Manage Users', icon: <i className="fa-solid fa-user"></i>,navigate: <ManageUser/> },
        { label: 'Manage Packages', icon: <i className="fa-solid fa-cart-flatbed-suitcase"></i>,navigate: <ManagePackage/> },
        { label: 'All Bookings', icon: <i className="fa-solid fa-box"></i>,navigate: <AdminPackage/> }
      ];
  return (
    <Layout menuItems={menuItems} element={<AdminPackage/>}/>
  )
}

export default Admin
