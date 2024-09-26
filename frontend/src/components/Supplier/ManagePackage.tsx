import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GetAllPackagesForSupplier } from "../Apis/Api";
import PackageCard from "../Card/PackageCard";
import { useNotification } from "../Context/NotificationContext";
import { useUserContext } from "../Context/User";
import UploadOptionsModal from "../Forms/UploadOptionsModal";
import { Package } from "../Interfaces/Interface";
import PackageDetail from "../PackageDetail/PackageDetail";
import Tabs, { TabProps } from "../Tabs/Tabs";

const ManagePackage: React.FC = () => {
    const notification = useNotification()
    const { user } = useUserContext()
    const [viewPackage, setView] = useState<Package | null>(null)
    const [isModal, setModal] = useState<boolean>(false)
    const { data: packages, isLoading, refetch } = useQuery<Package[], Error>({
        queryKey: [`packages${user?.id}`],
        queryFn: async () => {
            const response = await GetAllPackagesForSupplier(user?.id!);
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
    const verifiedPackages = packages?.filter(curr => curr.isVerified || curr.isPublic)
    const unverifiedPackages = packages?.filter(curr => !curr.isVerified && !curr.isPublic)
    const showPackage = (pkge: Package) => {
        setView(pkge)
    }
    const tabs: TabProps[] = [
        {
            id: 'notvisible',
            title: 'Not Visible',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {unverifiedPackages?.map((pkg, index) => (
                        <PackageCard key={index} pkge={pkg} showBadge={true} onShowPackageInfo={() => showPackage(pkg)} />
                    ))}
                </div>
            )
        },
        {
            id: 'visible',
            title: 'Visible',
            content: (
                <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {verifiedPackages?.map(pkg => (
                        <PackageCard pkge={pkg} onShowPackageInfo={() => showPackage(pkg)} />
                    ))}
                </div>
            )
        }
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                {!viewPackage && <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    onClick={() => setModal(true)}
                >
                    Add Package
                </button>}

            </div>

            {isModal && (
                <UploadOptionsModal pkg={viewPackage!} onClose={() => setModal(false)} refetch={refetch} name="upload" />
            )}

            {viewPackage ? (
                <PackageDetail pkg={viewPackage} refetchPackages={refetch} add={true}/>
            ) : (
                <Tabs tabs={tabs} />
            )}


        </>


    )
}

export default ManagePackage
