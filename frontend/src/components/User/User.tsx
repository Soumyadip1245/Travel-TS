import { MenuInterface } from '../Interfaces/Interface';
import Layout from '../Layout/Layout';
import ShowBookings from './ShowBookings';
import ShowPackages from './ShowPackages';

const User = () => {
    const menuItems: MenuInterface[] = [
        { label: 'Dashboard', icon: <i className="fa-solid fa-house"></i>, navigate:  <ShowPackages/>},
        { label: 'All Bookings', icon: <i className="fa-solid fa-box"></i>,navigate: <ShowBookings/> }
      ];
  return (
    <Layout menuItems={menuItems} element={<ShowPackages/>}/>
  )
}

export default User
