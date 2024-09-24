import React, { useState } from 'react';
import { createBooking } from '../Apis/Api';
import PackageCard from '../Card/PackageCard';
import { useNotification } from '../Context/NotificationContext';
import { useUserContext } from '../Context/User';
import FloatingBookButton from '../Forms/FloatingBookButton';
import TravelForm, { Traveler } from '../Forms/TravelForm';
import { BookingCreate, Package } from '../Interfaces/Interface';
import Stepper from '../Utils/Stepper';
import BookingConfirmed from './BookingConfirmed';
import ReviewBooking from './ReviewBooking';

interface BookingProps {
  pkg: Package;
}

const BookingConfirmation: React.FC<BookingProps> = ({ pkg }) => {
  const { user } = useUserContext();
  const [currentStep, setCurrentStep] = useState(0);
  const notification = useNotification()
  const [travelers, setTravelers] = useState<Traveler[]>([
    { fullName: '', dateOfBirth: '', passportNumber: '', ageCategory: 'Adult' }
  ]);
  const [savedTravelers, setSavedTravelers] = useState<Traveler[]>([]);
  const [bookingData, setBooking] = useState<BookingCreate | null>(null);
  const steps = ['Package Details', 'Traveler Info', 'Review & Confirm', 'Booking Placed'];

  const handleNextStep = () => {
    // Create a new booking object for the next step
    const newBooking: BookingCreate = {
      packageId: pkg.id,
      userId: user?.id!,
      supplierId: pkg.supplierId!,
      packageName: pkg.name,
      destination: pkg.destination?.name!,
      price: pkg.price,
      travellers: savedTravelers.map((curr: Traveler) => ({
        fullName: curr.fullName,
        dateOfBirth: curr.dateOfBirth,
        passportNumber: curr.passportNumber,
      })),
      startDate: '',
      endDate: '',
      numberOfAdults: savedTravelers.filter(traveler => traveler.ageCategory === 'Adult').length,
      numberOfChildren: savedTravelers.filter(traveler => traveler.ageCategory === 'Child').length,
      totalPrice: 0,
      supplierPaymentAmount: 0,
      specialRequests: '',
    };

    setBooking(newBooking);
    setCurrentStep((prev) => prev + 1); // Move to the next step
  };

  const handleConfirmBooking = async (booking: BookingCreate) => {
    setBooking(booking);
    const response = await createBooking(booking);
    if (!response.ok) {
      notification.showNotification(await response.text(), 'error');
      return;
    }
    notification.showNotification(await response.text(), 'success');
    setCurrentStep((prev) => prev + 1); // Move to Booking Placed step
  };


  const handleAddTraveler = (traveler: Traveler) => {
    setSavedTravelers([...savedTravelers, traveler]);
  };

  const handleAddMoreTraveler = () => {
    setTravelers([...travelers, { fullName: '', passportNumber: '', dateOfBirth: '', ageCategory: 'Adult' }]);
  };

  return (
    <div className="p-6">
      <Stepper steps={steps} currentStep={currentStep} />
      <div className="mt-5">
        {currentStep === 0 && <><PackageCard pkge={pkg} />
          <button
            onClick={handleNextStep}
            className="mt-6 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Travellers
          </button>
        </>}
        {currentStep === 1 && (
          <>
            <h2 className="text-xl font-bold mb-4">Add Traveler Information</h2>
            {travelers.map((traveler, index) => (
              <div key={index} className='rounded-lg shadow-lg p-6 bg-white dark:bg-gray-800 mb-4'>
                <TravelForm
                  onAddTraveler={handleAddTraveler}
                  traveler={traveler}
                />
              </div>
            ))}
            <FloatingBookButton onBookNow={handleAddMoreTraveler} text='Add More' />
            <button
              onClick={handleNextStep}
              className="mt-6 w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Review
            </button>
          </>
        )}
        {currentStep == 2 && <>
          <ReviewBooking booking={bookingData!} confirmBooking={handleConfirmBooking} />

        </>}
        {currentStep == 3 && <BookingConfirmed />}
      </div>
    </div>
  );
};

export default BookingConfirmation;
