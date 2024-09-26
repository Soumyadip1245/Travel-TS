import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { addWatchlist, getAllVerifiedPackages, getUsers, lockUser } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import { useUserContext } from '../Context/User';
import { Package, User } from '../Interfaces/Interface';
import Table from '../Table/Table';
import LoaderPage from '../Utils/LoaderPage';
import NotFoundPage from '../Utils/NotFoundPage';

const ManageUser: React.FC = () => {
    const {user} = useUserContext()
    const notification = useNotification();
    const [selected, setSelected] = useState<string | null>(null)
    const headers = ["Name", "Email", "Lock", "Assign"]
    const { data: users, isLoading: UserLoading, refetch: UserRefetch } = useQuery<User[], Error>({
        queryKey: [`users${user?.id}`],
        queryFn: async () => {
            const response = await getUsers();
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
    const { data: dropdownValues, isLoading: dropdownLoading } = useQuery<Package[], Error>({
        queryKey: [`verifiedPackages${user?.id}`],
        queryFn: async () => {
            const response = await getAllVerifiedPackages();
            return response
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
    console.warn(dropdownValues)
    if (UserLoading) return <LoaderPage message='Loading Users'/>;
    if (!users || users.length === 0) return <NotFoundPage message="No Users Found" />
    const toggleLock = async (supplier: User) => {
        const response = await lockUser(supplier.id!, !supplier.isLocked);
        if (!response.ok) {
            notification.showNotification(await response.text(), 'warning');
            return;
        }
        UserRefetch();
        notification.showNotification(await response.text(), 'success');
    };
    const handleChange = async (id: number, e:number) => {
        const response = await addWatchlist(id,e)
        if(!response.ok){
            notification.showNotification(await response.text(),'error')
            return
        }
        notification.showNotification(await response.text(),'success')
    }
    const formattedData = users!.map((users,index) => ({
        Name: users.businessName || 'N/A',
        Email: users.email || 'N/A',
        Lock: (
            <i
            key={index}
                className={`fa-solid ${users.isLocked ? 'fa-lock text-red-500' : 'fa-lock-open text-green-500'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => toggleLock(users)}
            />
        ),
        Assign: (
            <select
            value={selected!}
            onChange={(e)=>handleChange(users.id! ,Number(e.target.value))}
            className="block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
        >
            <option value="" className="text-gray-500">Select...</option>
            {dropdownValues?.map((item) => (
                <option key={item.id} value={item.id} className="text-gray-900 dark:text-gray-200">
                    {item.name}
                </option>
            ))}
        </select>
        )
      }));
    return <Table headers={headers} data={formattedData} />
}

export default ManageUser
