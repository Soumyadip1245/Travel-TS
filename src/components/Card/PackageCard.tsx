import React from 'react';
import { Package } from '../Interfaces/Interface';

interface PackageCardProps {
    pkge: Package;
    onVerify?: () => void;
    onMakePublic?: () => void;
    onMakePrivate?: () => void;
    onUnverified?: () => void;
    onFeatured?: () => void;
    onUnfeatured?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkge, onVerify, onMakePublic, onMakePrivate, onUnfeatured, onFeatured, onUnverified }) => {
    
    const renderStatus = (condition: boolean) => (
        <div className="flex items-center space-x-2">
            {condition ? (
                <i className="fa-solid fa-circle-check text-green-500"></i>
            ) : (
                <i className="fa-solid fa-circle-xmark text-red-500"></i>
            )}
        </div>
    );

    return (
        <div className="border rounded-lg shadow-lg p-4 flex flex-col items-center bg-gray-800 border-gray-700">
            {pkge.imagePath ? (
                <img src={`/proxy/${pkge.imagePath}`} alt={pkge.name} className="w-full h-48 object-cover rounded-md mb-4" />
            ) : (
                <div className="w-full h-48 bg-gray-600 rounded-md mb-4 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                </div>
            )}
            <h3 className="text-lg font-semibold mb-2 text-white">{pkge.name}</h3>
            <p className="text-xl font-bold mb-4 text-white">₹{pkge.price}</p>
            <div className="space-y-2 mb-4 w-full">
                <div className="flex justify-between text-gray-300">
                    <span>Flight Booking:</span>
                    {renderStatus(pkge.flightBooking)}
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Accommodation:</span>
                    {renderStatus(pkge.accommodation)}
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Sightseeing:</span>
                    {renderStatus(pkge.sightseeing)}
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Luxury Facilities:</span>
                    {renderStatus(pkge.luxuryFacilities)}
                </div>
            </div>
            <div className="w-full mt-auto flex justify-center gap-2 flex-wrap">
                {onVerify && !pkge.isVerified && (
                    <button onClick={onVerify} className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Verify
                    </button>
                )}
                {onMakePublic && !pkge.isPublic && (
                    <button onClick={onMakePublic} className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                        Make Public
                    </button>
                )}
                {onMakePrivate && pkge.isPublic && (
                    <button onClick={onMakePrivate} className="w-1/2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                        Make Private
                    </button>
                )}
                {onUnverified && pkge.isVerified && (
                    <button onClick={onUnverified} className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Unverify
                    </button>
                )}
                {onFeatured && !pkge.isFeatured && (
                    <button onClick={onFeatured} className="w-1/2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                        Feature
                    </button>
                )}
                {onUnfeatured && pkge.isFeatured && (
                    <button onClick={onUnfeatured} className="w-1/2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">
                        Unfeature
                    </button>
                )}
            </div>
        </div>
    );
};

export default PackageCard;
