import React, { useState } from 'react';
import { deleteImage, uploadImageWithfile } from '../Apis/Api';
import { useNotification } from '../Context/NotificationContext';
import { PackageData } from '../Interfaces/Interface';


const ImageUploader: React.FC<PackageData> = ({ pkg, refetchPackages,add,icon }) => {
  const [images, setImages] = useState<string[]>(pkg.images?.map((img) => `/proxy/${img.imagePath}`) || []);
  const [mainImageIndex, setMainImageIndex] = useState<number>(0);
    const notification = useNotification()
  const uploadImage = async (file: File) => {
      const response = await uploadImageWithfile(pkg.id, file);
      if (!response.ok) {
        notification.showNotification(await response.text(),'error')
        return
      }
      const imagePath = `/proxy/${await response.text()}`;
      notification.showNotification("Image uploaded",'success')
      refetchPackages()
      return imagePath;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const newImagePaths = await Promise.all(fileArray.map(uploadImage));
      setImages((prevImages) => [...prevImages, ...newImagePaths as string[]]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      const newImagePaths = await Promise.all(fileArray.map(uploadImage));
      setImages((prevImages) => [...prevImages, ...newImagePaths as string[]]);
    }
  };

  const removeImage = async (index: number) => {
    const value = images[index].replace("/proxy/","");
    const response = await deleteImage(value)
    if(!response.ok){
      notification.showNotification(await response.text(),'error')
      return
    }

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (mainImageIndex === index) {
      setMainImageIndex(0); 
    } else if (index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1); 
    }
    notification.showNotification(await response.text(),'success')
    refetchPackages()
  };

  const handleImageClick = (index: number) => {
    setMainImageIndex(index); 
  };

  return (
    <div className="p-4">
      {images.length === 0 && add && (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}

      {/* If images are uploaded, show the image grid */}
      {images.length > 0 && (
        <div className="grid gap-4">
          {/* Main image (currently selected image) */}
          <div className="overflow-hidden rounded-lg h-64 w-full">
            <img
              className="object-cover w-full h-full"
              src={images[mainImageIndex]} // Main image based on current state
              alt="Main uploaded"
            />
          </div>

          {/* Thumbnails for all images */}
          <div className="grid grid-cols-5 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg h-32 cursor-pointer ${
                  mainImageIndex === index
                    ? 'border-4 border-blue-500' // Highlight the main image
                    : ''
                }`}
                onClick={() => handleImageClick(index)} // Set image as main when clicked
              >
                <img
                  className="object-cover w-full h-full"
                  src={image}
                  alt={`Uploaded ${index}`}
                />
                {add && <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full text-xs px-2 py-1"
                >
                  ✕
                </button>}
              </div>
            ))}
            {/* Button to add more images */}
           {add && <div className="flex items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-full"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Add more</span>
                </p>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>}
          </div>
        </div>
      )}

    </div>
  );
};

export default ImageUploader;
