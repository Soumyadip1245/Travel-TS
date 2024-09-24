import React, { useState } from 'react';
import { addPackageAdditionalDetails, getAvailableCountForPackage } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import FloatingBookButton from '../Forms/FloatingBookButton';
import ImageUploader from '../ImageUploader/ImageUploader';
import { AdditionalDetail, PackageData } from '../Interfaces/Interface';
import ConfirmModal from '../Modal/ConfirmModal';
import Timeline, { TimelineItem } from '../Timeline/Timeline';
import BookingConfirmation from '../User/BookingConfirmation';

const PackageDetail: React.FC<PackageData> = ({ pkg, refetchPackages, add, isBooking }) => {
  const notification = useNotification();
  const [isBooked, setIsBooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', confirmText: '',showConfirm: false, cancelText: '' });
  const [flightTimelineItems, setFlightTimelineItems] = useState<TimelineItem[]>(
    pkg.flightDetails?.map((flight) => ({
      title: `Flight: ${flight.flightName}`,
      description: `Flight Number: ${flight.flightNumber || 'N/A'}`,
    })) || []
  );

  const [accommodationTimelineItems, setAccommodationTimelineItems] = useState<TimelineItem[]>(
    pkg.accommodationDetails?.map((accommodation) => ({
      title: `Accommodation: ${accommodation.hotelName}`,
      description: `Room Type: ${accommodation.roomType || 'Standard'}`,
    })) || []
  );

  const [luxuryTimelineItems, setLuxuryTimelineItems] = useState<TimelineItem[]>(
    pkg.luxuryFacility?.map((facility) => ({
      title: `Luxury Facility: ${facility.facilityName}`,
      description: `Enjoy premium services and facilities`,
    })) || []
  );

  const [sightseeingTimelineItems, setSightseeingTimelineItems] = useState<TimelineItem[]>(
    pkg.sightseeingDetails?.map((sightseeing) => ({
      title: `Sightseeing: ${sightseeing.tourName}`,
      description: `${sightseeing.tourDescription || 'Explore beautiful sights'}`,
    })) || []
  );

  const onAdd = async (data: any, heading: string) => {
    const ob: AdditionalDetail = {
      packageId: pkg.id,
      flightDetails: [],
      accommodationDetails: [],
      luxuryFacilities: [],
      sightseeingDetails: [],
    };

    switch (heading) {
      case 'Flight Details':
        ob.flightDetails.push(data);
        setFlightTimelineItems([
          ...flightTimelineItems,
          {
            title: `Flight: ${data.flightName}`,
            description: `Flight Number: ${data.flightNumber || 'N/A'}`,
          },
        ]);
        break;
      case 'Accommodation Details':
        ob.accommodationDetails.push(data);
        setAccommodationTimelineItems([
          ...accommodationTimelineItems,
          {
            title: `Accommodation: ${data.hotelName}`,
            description: `Room Type: ${data.roomType || 'Standard'}`,
          },
        ]);
        break;
      case 'Luxury Facilities':
        ob.luxuryFacilities.push(data);
        setLuxuryTimelineItems([
          ...luxuryTimelineItems,
          {
            title: `Luxury Facility: ${data.facilityName}`,
            description: `Enjoy premium services and facilities`,
          },
        ]);
        break;
      case 'Sightseeing Details':
        ob.sightseeingDetails.push(data);
        setSightseeingTimelineItems([
          ...sightseeingTimelineItems,
          {
            title: `Sightseeing: ${data.tourName}`,
            description: `${data.tourDescription || 'Explore beautiful sights'}`,
          },
        ]);
        break;
      default:
        console.warn('Unknown heading:', heading);
        break;
    }

    const response = await addPackageAdditionalDetails(ob);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'error');
      return;
    }
    notification.showNotification(await response.text(), 'success');
    refetchPackages();
  };

  const handleBookNow = async () => {
    const response = await getAvailableCountForPackage(pkg.id);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'error');
      return;
    }
    const availableCount: number[] = await response.json();
    pkg.availableCount = availableCount[0]
    if (availableCount[0] <= 0) {
      setModalContent({
        title: 'All packages booked!',
        message: 'Unfortunately, all packages for this trip are currently booked.',
        confirmText: 'Okay',
        cancelText: '',
        showConfirm: false
      });
    } else {
      setModalContent({
        title: 'Limited availability!',
        message: `${availableCount[0]} packages are left. Do you want to proceed with the booking?`,
        confirmText: 'Yes, Proceed',
        cancelText: 'Cancel',
        showConfirm: true
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const proceedWithBooking = () => {
    console.log('Proceeding with booking...');
    closeModal();
    setIsBooked(true); 
  };

  if (isBooked) {
    return <BookingConfirmation pkg={pkg}/>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{pkg.name || 'Package Name'}</h1>

        <a
          href={pkg.pdfPath ? `/proxy/${pkg.pdfPath}` : '#'}
          download
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14m7-7H5" />
            <path d="M19 13l-7 7-7-7" />
          </svg>
          Download Brochure
        </a>
      </div>

      <ImageUploader pkg={pkg} refetchPackages={refetchPackages} add={add} />

      <div className="mt-8">
        <Timeline items={flightTimelineItems} heading="Flight Details" add={add} onAdd={onAdd} />
        <Divider />
        <Timeline items={accommodationTimelineItems} heading="Accommodation Details" add={add} onAdd={onAdd} />
        <Divider />

        <Timeline items={luxuryTimelineItems} heading="Luxury Facilities" add={add} onAdd={onAdd} />
        <Divider />

        <Timeline items={sightseeingTimelineItems} heading="Sightseeing Details" add={add} onAdd={onAdd} />
      </div>
      {isBooking && <FloatingBookButton onBookNow={handleBookNow} />}
      {isBooking && isModalOpen && (
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={proceedWithBooking}
          title={modalContent.title}
          message={modalContent.message}
          confirmText={modalContent.confirmText}
          showConfirm = {modalContent.showConfirm}
          cancelText={modalContent.cancelText || 'Close'}
        />
      )}
    </div>
  );
};

export default PackageDetail;
export const Divider: React.FC = () => <div className="my-8"></div>;
