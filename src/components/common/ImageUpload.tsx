import React from 'react';

interface ImageUploadProps {
    name: string;
    onChange: (files: File[]) => void;
    error?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    name,
    onChange,
    error
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        const files = Array.from(e.target.files);
        if (files.length > 3) {
            const slicedFiles = files.slice(0, 3);
            onChange(slicedFiles);
        } else {
            onChange(files);
        }
    };

    return (
        <div className="mb-4">
            <input
                id={name}
                name={name}
                type="file"
                accept="image/*"
                onChange={handleChange}
                multiple
                className="mb-2"
            />
            <p className="text-sm text-gray-600">Upload exactly 3 images</p>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};

export default ImageUpload;