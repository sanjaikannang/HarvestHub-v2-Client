import { CloudUpload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';

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
    const [previews, setPreviews] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        if (maxFiles && e.target.files.length > maxFiles) {
            alert(`Maximum ${maxFiles} files allowed`);
            e.target.value = '';
            return;
        }

        // Create preview URLs
        const newPreviews = Array.from(e.target.files).map(file => 
            URL.createObjectURL(file)
        );
        setPreviews(newPreviews);

        // Call the parent onChange
        onChange(e);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = (index: number) => {
        // Remove preview
        setPreviews(prev => prev.filter((_, i) => i !== index));
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="mb-4">
            <label className="text-gray-700 text-sm ml-1 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {/* Preview Area */}
            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {previews.map((preview, index) => (
                        <div key={preview} className="relative">
                            <img 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Area */}
            <div 
                className={`upload-area mt-2 p-4 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors ${
                    previews.length === 0 ? 'h-48' : 'h-32'
                }`}
                onClick={handleClick}
            >
                <CloudUpload size={40} className="mx-auto text-gray-600" />
                <p className="mt-2 text-gray-600">
                    Upload or drag & drop your files <br />
                    <span className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. {maxFiles} files)</span>
                </p>

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
    );
};

export default ImageUpload;