import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { GetAllPackagesThatExist, toggleFeatured, togglePublic, toggleVerify } from '../Apis/Api';
import PackageCard from '../Card/PackageCard';
import { useNotification } from '../Context/NotificationContext';
import { Package } from '../Interfaces/Interface';
import Tabs, { TabProps } from '../Tabs/Tabs';

const ManagePackage: React.FC = () => {
    const notification = useNotification()
    const { data: packages, isLoading, refetch } = useQuery<Package[], Error>({
        queryKey: ['packages'],
        queryFn: async () => {
            const response = await GetAllPackagesThatExist();
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    const unverifiedPackages = packages?.filter(pkg => !pkg.isVerified) || [];
    const publicPackages = packages?.filter(pkg => pkg.isPublic) || [];
    const verifiedPackages = packages?.filter(pkg => pkg.isVerified) || [];
    const privatePackages = packages?.filter(pkg => !pkg.isPublic) || [];
    const availablePackages = packages?.filter(pkg => pkg.isPublic && pkg.isVerified) || [];

    const VerifyPackage = async (packages: Package) => {
        const response = await toggleVerify(packages.id,!packages.isVerified)
        if(!response.ok){
            notification.showNotification(await response.text(),'warning')
            return
        }
        notification.showNotification(await response.text(),'success')
        refetch()
    }
    const PublicPackage = async (packages: Package) => {
        const response = await togglePublic(packages.id,!packages.isPublic)
        if(!response.ok){
            notification.showNotification(await response.text(),'warning')
            return
        }
        notification.showNotification(await response.text(),'success')
        refetch()
    }
    const FeaturePackage = async (packages: Package) => {
        const response = await toggleFeatured(packages.id,!packages.isFeatured)
        if(!response.ok){
            notification.showNotification(await response.text(),'warning')
            return
        }
        notification.showNotification(await response.text(),'success')
        refetch()
    }
   
    const tabs: TabProps[] = [
        {
            id: 'unverified',
            title: 'Unverified',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {unverifiedPackages.map(pkg => (
                        <PackageCard pkge={pkg} onVerify={() => VerifyPackage(pkg)} />
                    ))}
                </div>
            )
        },
        {
            id: 'private',
            title: 'Private',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {privatePackages.map(pkg => (
                        <PackageCard pkge={pkg} onMakePublic={() => PublicPackage(pkg)} />
                    ))}
                </div>
            )
        },
        {
            id: 'public',
            title: 'Public',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {publicPackages.map(pkg => (
                        <PackageCard pkge={pkg} onMakePrivate={()=> PublicPackage(pkg)}/>
                    ))}
                </div>
            )
        },
        {
            id: 'verified',
            title: 'Verified',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {verifiedPackages.map(pkg => (
                        <PackageCard pkge={pkg} onUnverified={()=> VerifyPackage(pkg)}/>
                    ))}
                </div>
            )
        },
        {
            id: 'available',
            title: 'Available',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availablePackages.map(pkg => (
                        <PackageCard pkge={pkg} onFeatured={()=>FeaturePackage(pkg)} onUnfeatured={()=>FeaturePackage(pkg)} onMakePrivate={()=>PublicPackage(pkg)} onUnverified={()=>VerifyPackage(pkg)}/>
                    ))}
                </div>
            )
        }
    ];

    if (isLoading) {
        return <div className="text-white text-center">Loading...</div>;
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            <Tabs tabs={tabs} />
        </div>
    );
};

export default ManagePackage;
