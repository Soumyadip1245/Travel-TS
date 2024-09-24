import React, { ReactNode, useState } from 'react';
import AccommodationDetailForm from '../Forms/AccomodationDetailForm';
import FlightDetailForm from '../Forms/FlightDetailForm';
import LuxuryFacilitiesForm from '../Forms/LuxuryFacilitiesForm';
import SightseeingDetailForm from '../Forms/SightseeingDetailForm';
import Modal from '../Modal/Modal';

export interface TimelineItem {
  title: string;
  description: string;
  icon?: ReactNode;
  label?: string;
  labelClassName?: string;
  action?: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  heading?: string;
  add?: boolean;
  onAdd: (item: any, heading: string) => void; 
}

const Timeline: React.FC<TimelineProps> = ({ items, heading, add, onAdd }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const handleAddClick = () => {
    setModalOpen(true);
  };
  const handleSubmit = (data: any) => {
    onAdd(data,heading!)
    console.log('Form submitted:', data);
    setModalOpen(false);
  };
  const returnForm = (heading: string): ReactNode => {
    switch (heading) {
      case 'Flight Details':
        return <FlightDetailForm onSubmit={handleSubmit}/>
      case 'Accommodation Details':
        return <AccommodationDetailForm onSubmit={handleSubmit}/>
      case 'Luxury Facilities':
        return <LuxuryFacilitiesForm onSubmit={handleSubmit}/>
      case 'Sightseeing Details':
        return <SightseeingDetailForm onSubmit={handleSubmit}/>
      default:
        return <div>No form available for this section.</div>;
    }
  }
return (
  <div className="p-6 bg-gray-100 dark:bg-gray-800">
    {heading && <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{heading}</h2>}

    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {items.map((item, index) => (
        <li key={index} className="mb-10 ml-6">
          <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
            {item.icon || (
              <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            )}
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
            {item.label && (
              <span className={`bg-blue-100 text-blue-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ${item.labelClassName}`}>
                {item.label}
              </span>
            )}
          </h3>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.description}</p>

        </li>
      ))}
      {add && <li className="mb-10 ml-6 cursor-pointer" onClick={handleAddClick}>
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
          <i className="fa-solid fa-plus"></i>
        </span>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          Add Details

        </h3>
      </li>}
      {isModalOpen && <Modal element={returnForm(heading!)} onClose={() => setModalOpen(false)}/>}
    </ol>
  </div>
);
};

export default Timeline;
