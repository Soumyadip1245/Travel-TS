import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';
import { fetchItinery } from '../Apis/Api';
import ItineryForm from '../Forms/ItineryForm';
import { Booking, UploadItinery } from '../Interfaces/Interface';
import Modal from '../Modal/Modal';

interface ItineryProps {
    booking: Booking;
    isUser: boolean;
}

const Itinery: React.FC<ItineryProps> = ({ booking, isUser }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [type, setType] = useState<string>("")
    const { data: itinery, isLoading, refetch } = useQuery<UploadItinery[], Error>({
        queryKey: ["itinery"],
        queryFn: async () => {
            const response = await fetchItinery(booking?.bookingId!);
            return response;
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    type UploadItineryKeys = 'flightBooking' | 'accommodation' | 'sightseeing' | 'luxuryFacilities';

    const renderNode = (type: string): ReactNode => {
        const boolType = returnType(type) as UploadItineryKeys;
        const itineryArray = itinery?.filter((curr: UploadItinery) => curr[boolType] === true);

        return (
            <div className="bg-gray-800 p-4">
                <h2 className="text-xl font-bold text-white mb-4">{type} Itinerary</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {itineryArray?.map((item, index) => (
                        <div key={index} className="text-center cursor-pointer">
                            <a href={`/proxy/${item.path}`} target="_blank" rel="noopener noreferrer">
                                <img src="/images/pdf.png" alt="PDF" className="w-20 mx-auto" />
                            </a>
                            <p className="text-white">{item.fileName}</p>
                        </div>
                    ))}
                   {!isUser && <div className="text-center cursor-pointer">

                        <a target="_blank" rel="noopener noreferrer" onClick={() => { setType(type); setShowModal(true) }}>
                            <img src="/images/upload.png" alt="Upload" className="w-20 mx-auto" />
                        </a>
                        <p className="text-white">Upload</p>
                    </div>}
                </div>
            </div>
        );
    };

    const returnType = (type: string): string => {

        switch (type) {
            case 'Flight':
                return "flightBooking";
            case 'Luxury':
                return 'luxuryFacilities';
            case 'Sightseeing':
                return 'sightseeing';
            default:
                return 'accommodation';
        }
    };

    return (
        <div className="container mx-auto p-6">
            <section>

                {renderNode("Flight")}
                {renderNode("Luxury")}
                {renderNode("Sightseeing")}
                {renderNode("Accommodation")}

            </section>
            {
                showModal && <Modal element={<ItineryForm bookingId={booking.bookingId} type={type} onClose={() => setShowModal(false)} refetchPackages={refetch} />} onClose={() => setShowModal(false)} />
            }
        </div>
    );
};

export default Itinery;
