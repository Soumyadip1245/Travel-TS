import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { GetAllPackagesThatExist, fetchSupplier, toggleFeatured, togglePublic, toggleVerify } from '../Apis/Api';
import PackageCard from '../Card/PackageCard';
import { useNotification } from '../Context/NotificationContext';
import { useUserContext } from '../Context/User';
import { Package, User } from '../Interfaces/Interface';
import PackageDetail from '../PackageDetail/PackageDetail';
import Tabs, { TabProps } from '../Tabs/Tabs';
import LoaderPage from '../Utils/LoaderPage';
import NotFoundPage from '../Utils/NotFoundPage';

const ManagePackage: React.FC = () => {
    const notification = useNotification()
    const {user} = useUserContext()
    const [viewPackage,setView] = useState<Package|null>(null)
    const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null); 
    const [filteredPackages, setFilteredPackages] = useState<Package[] | null>(null);
    const { data: packagesData, isLoading, refetch } = useQuery<Package[], Error>({
        queryKey: [`packages${user?.id}`],
        queryFn: async () => {
            const response = await GetAllPackagesThatExist();
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
    const { data: suppliers, isLoading: Loading } = useQuery<User[], Error>({
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
    const packages = filteredPackages || packagesData || [];
    const unverifiedPackages = packages.filter(pkg => !pkg.isVerified) || [];
    const publicPackages = packages.filter(pkg => pkg.isPublic) || [];
    const verifiedPackages = packages.filter(pkg => pkg.isVerified) || [];
    const privatePackages = packages.filter(pkg => !pkg.isPublic) || [];
    const availablePackages = packages.filter(pkg => pkg.isPublic && pkg.isVerified) || [];

    const VerifyPackage = async (packages: Package) => {
        const response = await toggleVerify(packages.id, !packages.isVerified)
        if (!response.ok) {
            notification.showNotification(await response.text(), 'warning')
            return
        }
        notification.showNotification(await response.text(), 'success')
        refetch()
    }
    const PublicPackage = async (packages: Package) => {
        const response = await togglePublic(packages.id, !packages.isPublic)
        if (!response.ok) {
            notification.showNotification(await response.text(), 'warning')
            return
        }
        notification.showNotification(await response.text(), 'success')
        refetch()
    }
    const FeaturePackage = async (packages: Package) => {
        const response = await toggleFeatured(packages.id, !packages.isFeatured)
        if (!response.ok) {
            notification.showNotification(await response.text(), 'warning')
            return
        }
        notification.showNotification(await response.text(), 'success')
        refetch()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value } = e.target
        setSelectedSupplier(value)
        if(value == "View All"){
            setFilteredPackages(null)
            return
        }
        const filterArray = packagesData?.filter((curr: Package) => curr.supplier?.username == value)
        console.log(filterArray)
        setFilteredPackages([...filterArray!])
        console.log(packages)
    }
    const tabs: TabProps[] = [
        {
            id: 'unverified',
            title: 'Unverified',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        unverifiedPackages.map((pkg, index) => (
                            <PackageCard key={index} pkge={pkg} onVerify={() => VerifyPackage(pkg)} onShowPackageInfo={() => setView(pkg)} />
                        ))}
                </div>
            )
        },
        {
            id: 'private',
            title: 'Private',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        privatePackages.map(pkg => (
                            <PackageCard key={pkg.id} pkge={pkg} onMakePublic={() => PublicPackage(pkg)} onShowPackageInfo={() => setView(pkg)} />
                        ))}
                </div>
            )
        },
        {
            id: 'public',
            title: 'Public',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        publicPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkge={pkg} onMakePrivate={() => PublicPackage(pkg)} onShowPackageInfo={() => setView(pkg)} />
                        ))}
                </div>
            )
        },
        {
            id: 'verified',
            title: 'Verified',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        verifiedPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkge={pkg} onUnverified={() => VerifyPackage(pkg)} onShowPackageInfo={() => setView(pkg)} />
                        ))}
                </div>
            )
        },
        {
            id: 'available',
            title: 'Available',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {
                        availablePackages.map(pkg => (
                            <PackageCard key={pkg.id} pkge={pkg} onFeatured={() => FeaturePackage(pkg)} onUnfeatured={() => FeaturePackage(pkg)} onMakePrivate={() => PublicPackage(pkg)} onUnverified={() => VerifyPackage(pkg)} onShowPackageInfo={() => setView(pkg)} />
                        ))}
                </div>
            )
        }
    ];

    if (isLoading || Loading) {
        return <LoaderPage message="Loading Packages and Suppliers..." />;
    }

    if (packages.length === 0) {
        return <NotFoundPage />;
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
           {!viewPackage && <>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Supplier
            </label>
            <select
                name="destinationName"
                value={selectedSupplier!}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            >
                <option value="View All">View All</option>
                {suppliers?.map((curr: User) => (
                    <option key={curr.id} value={curr.username}>{curr.username}</option>
                ))}
            </select>
            <Tabs tabs={tabs} />
            </>}
          {viewPackage && <PackageDetail add={false} pkg={viewPackage} refetchPackages={refetch}/>}
        </div>
    );
};

export default ManagePackage;