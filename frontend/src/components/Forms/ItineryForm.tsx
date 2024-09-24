import React, { useState } from 'react';
import { uploadItinery } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import FileUpload from '../Utils/FileUpload';
import Input from '../Utils/Input';
interface ExtendedPackageData {
    onClose: () => void;
    bookingId: number;
    type: string;
    id?: number;
    refetchPackages: () => void;
}
interface ItineryProps{
    fileName: string;
    pdfFile: File|null;

}
const ItineryForm: React.FC<ExtendedPackageData> = ({ refetchPackages,onClose, bookingId,type }) => {
    const [formData, setFormData] = useState<ItineryProps>({
        fileName: '',
        pdfFile: null
    });
    const notification = useNotification();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        console.log(bookingId,formData.fileName,type,formData.pdfFile!)
        e.preventDefault();
        const response = await uploadItinery(bookingId,formData.fileName,type,formData.pdfFile!);
        if (!response.ok) {
            notification.showNotification(await response.text(), 'error');
            return;
        }
        notification.showNotification(await response.text(), 'success');
        onClose()
        refetchPackages();
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-4 dark:text-white">Add Package</h3>
            <form onSubmit={handleSubmit}>

                <Input
                    type="text"
                    name="fileName"
                    value={formData.fileName}
                    placeholder="File Name"
                    onChange={handleChange}
                    className="mb-4"
                    label='File Name'
                    required
                />
                <FileUpload
                    id="pdfFile"
                    name="pdfFile"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    label="Click to upload PDF"
                    description="PDF"
                    maxSize="10MB"
                />

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ItineryForm;
