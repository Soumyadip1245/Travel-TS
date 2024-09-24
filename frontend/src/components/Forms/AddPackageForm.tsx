import React, { useState } from 'react';
import { addPackageWithFiles } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import { useUserContext } from '../Context/User';
import { AddPackageWithFilesPayload, Destination, PackageData } from '../Interfaces/Interface';
import FileUpload from '../Utils/FileUpload';
import Input from '../Utils/Input';
interface ExtendedPackageData extends PackageData {
    onClose: () => void;
}
const AddPackageForm: React.FC<ExtendedPackageData> = ({ refetchPackages,onClose }) => {
    const { user, destination } = useUserContext();
    const [formData, setFormData] = useState<AddPackageWithFilesPayload>({
        name: '',
        description: '',
        price: 0,
        availableCount: 0,
        destinationName: '',
        supplierId: user?.id || 0,
        imageFile: undefined,
        pdfFile: undefined
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
        e.preventDefault();
        const response = await addPackageWithFiles(formData);
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
                    name="name"
                    value={formData.name}
                    placeholder="Package Name"
                    onChange={handleChange}
                    className="mb-4"
                    label='Package Name'
                    required
                />

                <Input
                    type="text"
                    name="description"
                    value={formData.description!}
                    placeholder="Package Description"
                    onChange={handleChange}
                    className="mb-4"
                    label='Package Description'
                    textarea
                />

                <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    placeholder="Price"
                    onChange={handleChange}
                    className="mb-4"
                    label='Package Price'
                    required
                />

                <Input
                    type="number"
                    name="availableCount"
                    value={formData.availableCount}
                    placeholder="Available Count"
                    onChange={handleChange}
                    className="mb-4"
                    label='Available Count'
                    required
                />

                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Select Destination
                </label>
                <select
                    name="destinationName"
                    value={formData.destinationName}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
                >
                    <option value="" disabled>Select a destination</option>
                    {destination?.map((curr: Destination) => (
                        <option key={curr.id} value={curr.name}>{curr.name}</option>
                    ))}
                </select>

                <FileUpload
                    id="imageFile"
                    name="imageFile"
                    accept="image/*"
                    onChange={handleFileChange}
                    label="Click to upload image"
                    description="SVG, PNG, JPG or GIF"
                    maxSize="800x400px"
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

export default AddPackageForm;
