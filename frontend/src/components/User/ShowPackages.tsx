import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { addWatchlist, fetchPackagesForuser, interactPackage, removeWatchlist } from "../Apis/Api";
import PackageCard from "../Card/PackageCard";
import { useNotification } from "../Context/NotificationContext";
import { useUserContext } from "../Context/User";
import { Package, UserPackage } from "../Interfaces/Interface";
import PackageDetail from "../PackageDetail/PackageDetail";
import LoaderPage from "../Utils/LoaderPage";
import NotFoundPage from "../Utils/NotFoundPage";

const ShowPackages = () => {
    const { user } = useUserContext();
    const notification = useNotification()
    const [viewPackage, setView] = useState<Package | null>(null)
    const { data: packages, isLoading, refetch } = useQuery<UserPackage, Error>({
        queryKey: ['packages'],
        queryFn: async () => {
            const response = await fetchPackagesForuser(user?.id!);
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    if (isLoading) return <LoaderPage message="Loading your packages..." />;

    if (!packages || (!packages.allVerifiedPublicPackages.length && !packages.suggestedPackages.length && !packages.wishlistPackages.length)) {
        return <NotFoundPage message="No packages available for you at the moment" />;
    }
    const handleWishlist = async (pkge: Package) => {
        const response = await addWatchlist(user?.id!,pkge.id)
        if(!response.ok){
            notification.showNotification(await response.text(),'error')
            return
        }
        refetch()
        notification.showNotification(await response.text(),'success')
    }
    const handleRemove = async (pkge: Package) => {
        const response = await removeWatchlist(user?.id!,pkge.id)
        if(!response.ok){
            notification.showNotification(await response.text(),'error')
            return
        }
        refetch()
        notification.showNotification(await response.text(),'success')
    }
    const isWishlisted = (pkg: Package):boolean=>{
        const filter = packages.wishlistPackages.filter((curr:Package)=>curr.id == pkg.id)
        if(filter.length > 0) return true
        else return false
    }
    const showPackage = async (pkg: Package) => {
        await interactPackage(user?.id!, pkg.destination?.id!)
        setView(pkg)
    }
    return (
        <>
            {!viewPackage && <div className="p-6 bg-gray-900 text-white">
                <h1 className="text-4xl font-bold mb-6 text-center">Your Next Adventure Awaits</h1>
                <p className="text-lg text-gray-400 mb-8 text-center">
                    Find the perfect package that suits your dream travel destination. Explore your wishlist, recommended trips, or browse through all verified packages!
                </p>

                {/* Wishlist Section */}
                {packages.wishlistPackages.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 underline">Your Wishlist</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {packages.wishlistPackages.map(pkg => (
                                <PackageCard pkge={pkg} onShowPackageInfo={showPackage} showWishlist={true} removeWishlist={handleRemove} isInWishlist={isWishlisted(pkg)} showBadge={true} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Suggested Packages Section */}
                {packages.suggestedPackages.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 underline">Packages You Might Be Interested In</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {packages.suggestedPackages.map(pkg => (
                                <PackageCard pkge={pkg} onShowPackageInfo={showPackage} showWishlist={true} onWishlist={handleWishlist} isInWishlist={isWishlisted(pkg)} removeWishlist={handleRemove} showBadge={true} />
                            ))}
                        </div>
                    </div>
                )}

                {/* All Verified Public Packages Section */}
                {packages.allVerifiedPublicPackages.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4 underline">Explore All Packages</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {packages.allVerifiedPublicPackages.map(pkg => (
                                <PackageCard pkge={pkg} onShowPackageInfo={showPackage} showWishlist={true} onWishlist={handleWishlist} isInWishlist={isWishlisted(pkg)} removeWishlist={handleRemove} showBadge={true} />
                            ))}
                        </div>
                    </div>
                )}
            </div>}
            {viewPackage && <PackageDetail pkg={viewPackage} refetchPackages={refetch} isBooking={true}/>}
        </>
    );
}

export default ShowPackages;
