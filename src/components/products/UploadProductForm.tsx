import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { uploadProduct } from '../../features/products/productSlice';
import { UploadProductData } from '../../types/product.types';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import TextArea from '../common/TextArea';
import DateField from '../common/DateField';
import TimeField from '../common/TimeField';
import ImageUpload from '../common/ImageUpload';

interface UploadProductFormProps {
    onUploadSuccess?: () => void;
    isModal?: boolean;
}

export const UploadProductForm: React.FC<UploadProductFormProps> = ({
    onUploadSuccess,
    isModal = false
}) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.product);

    const [formData, setFormData] = useState<UploadProductData>({
        name: '',
        description: '',
        startingPrice: '0',
        quantity: '0',
        startingDate: '',
        endingDate: '',
        bidStartTime: '',
        bidEndTime: '',
        images: [],
    });

    const [formErrors, setFormErrors] = useState<Partial<Record<keyof UploadProductData, string>>>({});

    const validateForm = () => {
        const errors: Partial<Record<keyof UploadProductData, string>> = {};
        const currentDate = new Date();

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }

        const startingPriceNum = parseFloat(formData.startingPrice);
        const quantityNum = parseFloat(formData.quantity);

        if (isNaN(startingPriceNum) || startingPriceNum <= 0) {
            errors.startingPrice = 'Starting price must be greater than 0';
        }

        if (isNaN(quantityNum) || quantityNum <= 0) {
            errors.quantity = 'Quantity must be greater than 0';
        }

        const startDate = new Date(formData.startingDate);
        const endDate = new Date(formData.endingDate);
        const bidStart = new Date(formData.bidStartTime);
        const bidEnd = new Date(formData.bidEndTime);

        if (startDate <= currentDate) {
            errors.startingDate = 'Starting date must be in the future';
        }

        if (endDate <= startDate) {
            errors.endingDate = 'Ending date must be after starting date';
        }

        const hoursDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
        if (hoursDifference < 24 || hoursDifference > 72) {
            errors.endingDate = 'Duration must be between 24 and 72 hours';
        }

        if (bidStart < startDate || bidStart > endDate) {
            errors.bidStartTime = 'Bid start time must be within the selected date range';
        }

        if (bidEnd <= bidStart || bidEnd > endDate) {
            errors.bidEndTime = 'Bid end time must be after start time and within date range';
        }

        const bidDurationMinutes = (bidEnd.getTime() - bidStart.getTime()) / (1000 * 60);
        if (bidDurationMinutes < 10 || bidDurationMinutes > 60) {
            errors.bidEndTime = 'Bid duration must be between 10 and 60 minutes';
        }

        if (formData.images.length !== 3) {
            errors.images = 'Exactly 3 images are required';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files); // Make sure it's an array of files
            setFormData(prev => ({
                ...prev,
                images: files,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // Create a new FormData
            const formDataToSubmit = new FormData();


            // Append all form fields
            formDataToSubmit.append('name', formData.name);
            formDataToSubmit.append('description', formData.description);
            formDataToSubmit.append('startingPrice', parseFloat(formData.startingPrice).toString());
            formDataToSubmit.append('quantity', parseFloat(formData.quantity).toString());
            formDataToSubmit.append('startingDate', formData.startingDate);
            formDataToSubmit.append('endingDate', formData.endingDate);
            formDataToSubmit.append('bidStartTime', formData.bidStartTime);
            formDataToSubmit.append('bidEndTime', formData.bidEndTime);

            // Append each image file (note that the name here should match what your backend expects)
            if (formData.images && formData.images.length === 3) {
                formData.images.forEach((file) => {
                    formDataToSubmit.append('images', file);  // 'images' is the field name expected by your backend
                });
            } else {
                throw new Error('Please upload exactly 3 images');
            }

            const resultAction = await dispatch(uploadProduct(formDataToSubmit)).unwrap();
            if (resultAction) {
                onUploadSuccess?.();
                // Reset form
                setFormData({
                    name: '',
                    description: '',
                    startingPrice: '0',  // Reset to string '0'
                    quantity: '0',       // Reset to string '0'
                    startingDate: '',
                    endingDate: '',
                    bidStartTime: '',
                    bidEndTime: '',
                    images: [],
                });
            }

            console.log("payload Data : ",[...formDataToSubmit.entries()]);

        } catch (error) {
            console.error('Failed to upload product:', error);
        }
    };

    const formClassName = isModal
        ? "space-y-4"
        : "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4";

    return (
        <form onSubmit={handleSubmit} className={formClassName}>
            <InputField
                label="Product Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={formErrors.name}
            />

            <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                error={formErrors.description}
                required
                rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="Starting Price"
                    type="number"
                    name="startingPrice"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    error={formErrors.startingPrice}
                />

                <InputField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    error={formErrors.quantity}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DateField
                    label="Starting Date"
                    name="startingDate"
                    value={formData.startingDate}
                    onChange={handleInputChange}
                    error={formErrors.startingDate}
                    required
                    min={new Date().toISOString().split('T')[0]}
                />

                <DateField
                    label="Ending Date"
                    name="endingDate"
                    value={formData.endingDate}
                    onChange={handleInputChange}
                    error={formErrors.endingDate}
                    required
                    min={formData.startingDate || new Date().toISOString().split('T')[0]}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TimeField
                    label="Bid Start Time"
                    name="bidStartTime"
                    value={formData.bidStartTime}
                    onChange={handleInputChange}
                    error={formErrors.bidStartTime}
                    required
                />

                <TimeField
                    label="Bid End Time"
                    name="bidEndTime"
                    value={formData.bidEndTime}
                    onChange={handleInputChange}
                    error={formErrors.bidEndTime}
                    required
                />
            </div>

            <ImageUpload
                label="Product Images"
                name="images"
                onChange={handleFileChange}
                error={formErrors.images}
                required
                multiple
                maxFiles={3}
            />

            <div className='mb-4'>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white mb-6 mt-4 py-2 px-4 rounded-md focus:outline-none"
                >
                    {loading ? 'Uploading...' : 'Upload Product'}
                </Button>
            </div>
        </form>
    );
};



