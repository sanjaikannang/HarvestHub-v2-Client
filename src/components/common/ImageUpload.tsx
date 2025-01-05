import { CloudUpload } from 'lucide-react';
import React, { useRef } from 'react';

interface ImageUploadProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    multiple?: boolean;
    maxFiles?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    label,
    name,
    onChange,
    error,
    required = false,
    multiple = false,
    maxFiles
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (maxFiles && e.target.files && e.target.files.length > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`);
            e.target.value = '';
            return;
        }
        onChange(e);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <div className="mb-4">
                <label className="text-gray-700 text-sm ml-1 mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>

                {/* File Upload Area */}
                <div 
                    className="upload-area mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    onClick={handleClick}
                >
                    {/* Icon */}
                    <CloudUpload size={40} className="mx-auto text-gray-600" />

                    {/* Drag & Drop Instructions */}
                    <p className="mt-2 text-gray-600">
                        Upload or drag & drop your file <br />
                        <span className="text-sm text-gray-500">SVG, PNG, JPG or GIF.</span>
                    </p>

                    {/* File Input */}
                    <input
                        ref={fileInputRef}
                        id={name}
                        name={name}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        multiple={multiple}
                        className="hidden"
                    />
                </div>

                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
        </>
    );
};

export default ImageUpload;