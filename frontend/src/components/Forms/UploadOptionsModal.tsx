import React, { useState } from 'react';
import { uploadExcel } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import { useUserContext } from '../Context/User';
import { Package } from '../Interfaces/Interface';
import Modal from '../Modal/Modal';
import FileUpload from '../Utils/FileUpload';
import AddPackageForm from './AddPackageForm';
interface UploadProps{
    onClose: ()=>void;
    refetch: ()=>void;
    pkg: Package;
    name? : string
}
const UploadOptionsModal: React.FC<UploadProps> = ({ onClose, refetch, pkg, name }) => {
    const [uploadType, setUploadType] = useState<'manual' | 'excel' | null>(null);
    const {user} = useUserContext()
    const notification = useNotification()
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploadType(e.target.value as 'manual' | 'excel');
    };

    const handleClose = () => {
        setUploadType(null);
        onClose();
    };
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const response = await uploadExcel(files![0],user?.id!)
        if(!response.ok){
            notification.showNotification(await response.text(),'error')
            return
        }
        notification.showNotification(await response.text(),'success')
        onClose()
        refetch()
    };
    return (
        <Modal onClose={onClose} element={
            <div className="p-6 bg-white dark:bg-gray-800">
             {uploadType == null && <>
             <h3 className="text-xl font-bold mb-4 dark:text-white">Choose Upload Type</h3>
             <ul className="space-y-4 mb-4">
                    <li>
                        <input
                            type="radio"
                            id="manual-upload"
                            name="upload-option"
                            value="manual"
                            className="hidden peer"
                            onChange={handleOptionChange}
                        />
                        <label
                            htmlFor="manual-upload"
                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Manual Upload</div>
                                <div className="w-full text-gray-500 dark:text-gray-400">Upload files manually</div>
                            </div>
                            <svg
                                className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            id="excel-upload"
                            name="upload-option"
                            value="excel"
                            className="hidden peer"
                            onChange={handleOptionChange}
                        />
                        <label
                            htmlFor="excel-upload"
                            className="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500"
                        >
                            <div className="block">
                                <div className="w-full text-lg font-semibold">Upload Excel</div>
                                <div className="w-full text-gray-500 dark:text-gray-400">Upload an Excel file</div>
                            </div>
                            <svg
                                className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </label>
                    </li>
                </ul>
                </>}
                {uploadType === 'manual' && (
                    <AddPackageForm refetchPackages={refetch} onClose={handleClose} pkg={pkg}/>
                )}
                {uploadType === 'excel' && (
                    <FileUpload
                        id="excel-upload"
                        name="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        label="Upload Excel"
                        description="Drag and drop or click to upload an Excel file."
                        maxSize="5MB"
                    />
                )}
            </div>
        } />
    );
};

export default UploadOptionsModal;
