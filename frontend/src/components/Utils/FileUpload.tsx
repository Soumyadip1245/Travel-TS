import React, { useState } from 'react';

interface FileUploadProps {
    id: string;
    name: string;
    accept: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    description: string;
    maxSize: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, name, accept, onChange, label, description, maxSize }) => {
    const [fileUploaded, setFileUploaded] = useState(false);

    // Update file upload status
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileUploaded(true);
        }
        onChange(e);
    };

    return (
        <div className="flex items-center justify-center w-full mb-4 relative">
            <label htmlFor={id} className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{label}</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{description} (MAX. {maxSize})</p>
                </div>
                <input id={id} type="file" name={name} accept={accept} className="hidden" onChange={handleFileChange} />
            </label>
            {fileUploaded && (
                <svg className="absolute top-1/2 right-4 w-6 h-6 text-green-500 transform -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
            )}
        </div>
    );
};

export default FileUpload;
