import React, { useState } from 'react';
import { MenuInterface } from '../Interfaces/Interface';
import Sidebar from '../Sidebar/Sidebar';

interface LayoutProps {
    menuItems: MenuInterface[];
    element: React.ReactElement;
}

const Layout: React.FC<LayoutProps> = ({ menuItems, element }) => {
    const [activeContent, setActiveContent] = useState<React.ReactElement>(element);
    console.warn(activeContent)
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            {/* Sidebar */}
            <div className="w-64">
                <Sidebar menuItems={menuItems} setActiveContent={setActiveContent}/>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8 rounded-lg shadow-md">
                { activeContent || element} 
            </div>
        </div>
    );
};

export default Layout;
