import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuInterface } from '../Interfaces/Interface';

export interface SidebarProps {
  menuItems: MenuInterface[];
  setActiveContent: (data: React.ReactElement) => void
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems,setActiveContent }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate()
  const handleClick = (index: number, navigate: React.ReactElement) => {
    setActiveIndex(index);
    setActiveContent(navigate);
  };
 const logout = () => {
    sessionStorage.removeItem("userId")
    navigate("/")
}
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform dark:bg-gray-900 dark:text-white sm:translate-x-0  dark:border-gray-700 shadow-lg "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <a href="/" className="flex items-center p-2 mb-5">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 me-3 sm:h-7"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold dark:text-white">
            Travel System
          </span>
        </a>
        <ul className="space-y-2 font-medium">
          {menuItems.map((item, index) => (
            <li key={index} style={{cursor: 'pointer'}}>
              <a
                className={`flex items-center p-2 rounded-lg transition-colors duration-300 ${
                  activeIndex === index
                    ? 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                    : 'dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
                onClick={(e)=> 
                  {
                  e.preventDefault(); 
                  setActiveContent(item.navigate);
                  handleClick(index, item.navigate);
                  }
                 }
              >
                <span className="w-6 h-6">{item.icon}</span>
                <span className="ml-3">{item.label}</span>
              </a>
            </li>
          ))}
          <li style={{cursor: 'pointer'}}>
            <a onClick={logout} className='flex items-center p-2 rounded-lg transition-colors duration-300 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className="w-6 h-6"><i className='fa-solid fa-right-from-bracket'></i></span>
            <span className="ml-3">Logout</span>
            </a>
          </li>
           <div id="dropdown-cta" className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900" role="alert">
         <div className="flex items-center mb-3">
            <span className="bg-orange-100 text-orange-800 text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">Beta</span>
           
         </div>
         <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">
            This dashboard is currently is in BETA version. If you find any bugs, report to admins.
         </p>
      </div>
   
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
