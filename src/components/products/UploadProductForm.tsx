import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearError, clearSuccessMessage, uploadProduct } from '../../features/products/productSlice';
import { UploadProductData } from '../../types/product.types';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import TextArea from '../common/TextArea';
import DateField from '../common/DateField';
import TimeField from '../common/TimeField';
import ImageUpload from '../common/ImageUpload';
import { toast } from 'react-toastify';
import LoadingSpinner from '../common/LoadingSpinner';
import { productUploadValidationSchema } from '../../schemas/validationSchema';
import { useFormik } from 'formik';


interface UploadProductFormProps {
    onUploadSuccess?: () => void;
    isModal?: boolean;
}


export const UploadProductForm: React.FC<UploadProductFormProps> = ({
    onUploadSuccess,
    isModal = false
}) => {
    const dispatch = useAppDispatch();
    const { loading, error, successMessage } = useAppSelector((state) => state.product);

    const initialValues: UploadProductData = {
        name: '',
        description: '',
        startingPrice: '0',
        quantity: '0',
        startingDate: '',
        endingDate: '',
        bidStartTime: '',
        bidEndTime: '',
        images: [],
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch(clearSuccessMessage());
            formik.resetForm();
            onUploadSuccess?.();
        }
    }, [error, successMessage, dispatch, onUploadSuccess]);


    const formik = useFormik({
        initialValues,
        validationSchema: productUploadValidationSchema,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();

                Object.entries(values).forEach(([key, value]) => {
                    if (key === 'images') {
                        values.images.forEach((file) => {
                            formData.append('photos', file);
                        });
                    } else if (key === 'startingPrice' || key === 'quantity') {
                        formData.append(key, parseFloat(value.toString()).toString());
                    } else {
                        formData.append(key, value.toString());
                    }
                });

                await dispatch(uploadProduct(formData)).unwrap();
            } catch (error) {
                console.error('Failed to upload product:', error);
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        },
    });

    const handleFileChange = (files: File[]) => {
        formik.setFieldValue('images', files);
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className={isModal ? "space-y-4" : "max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"}>
            <InputField
                label="Product Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name ? formik.errors.name : undefined}
            />

            <TextArea
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description ? formik.errors.description : undefined}
                rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
                <InputField
                    label="Starting Price"
                    type="number"
                    name="startingPrice"
                    value={formik.values.startingPrice}
                    onChange={formik.handleChange}
                    error={formik.touched.startingPrice ? formik.errors.startingPrice : undefined}
                />

                <InputField
                    label="Quantity"
                    type="number"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.quantity ? formik.errors.quantity : undefined}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <DateField
                    label="Starting Date"
                    name="startingDate"
                    value={formik.values.startingDate}
                    onChange={formik.handleChange}
                    error={formik.touched.startingDate ? formik.errors.startingDate : undefined}
                    min={new Date().toISOString().split('T')[0]}
                />

                <DateField
                    label="Ending Date"
                    name="endingDate"
                    value={formik.values.endingDate}
                    onChange={formik.handleChange}
                    error={formik.touched.endingDate ? formik.errors.endingDate : undefined}
                    min={formik.values.startingDate || new Date().toISOString().split('T')[0]}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TimeField
                    label="Bid Start Time"
                    name="bidStartTime"
                    value={formik.values.bidStartTime}
                    onChange={formik.handleChange}
                    error={formik.touched.bidStartTime ? formik.errors.bidStartTime : undefined}
                />

                <TimeField
                    label="Bid End Time"
                    name="bidEndTime"
                    value={formik.values.bidEndTime}
                    onChange={formik.handleChange}
                    error={formik.touched.bidEndTime ? formik.errors.bidEndTime : undefined}
                />
            </div>

            <ImageUpload
                name="images"
                onChange={handleFileChange}
                error={formik.touched.images ? (typeof formik.errors.images === 'string' ? formik.errors.images : undefined) : undefined}
            />

            <div className='mb-4'>
                <Button
                    type="submit"
                    disabled={loading || !formik.isValid}
                    className="w-full text-white mb-6 mt-4 py-2 px-4 rounded-md focus:outline-none"
                >
                    {loading ? (
                        <>
                            <LoadingSpinner />
                            <span>Uploading...</span>
                        </>
                    ) : 'Upload Product'}
                </Button>
            </div>
        </form >
    );
};



