import React, { useCallback, useState } from 'react';
import { CloudUpload, Trash } from 'lucide-react';

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
    const [dragActive, setDragActive] = useState(false);
    const [previews, setPreviews] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);

    const processFiles = (newFiles: File[]) => {
        // Limit to first 3 files
        const validFiles = newFiles.slice(0, 3);
        
        // Create preview URLs
        const newPreviews = validFiles.map(file => URL.createObjectURL(file));
        
        // Clean up old preview URLs
        previews.forEach(url => URL.revokeObjectURL(url));
        
        setPreviews(newPreviews);
        setFiles(validFiles);
        onChange(validFiles);
    };

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(Array.from(e.dataTransfer.files));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        processFiles(Array.from(e.target.files));
    };

    const handleDeleteImage = (index: number) => {
        // Revoke the URL of the preview being deleted
        URL.revokeObjectURL(previews[index]);
        
        // Create new arrays without the deleted item
        const newPreviews = previews.filter((_, i) => i !== index);
        const newFiles = files.filter((_, i) => i !== index);
        
        setPreviews(newPreviews);
        setFiles(newFiles);
        onChange(newFiles);
    };

    return (
        <div className="mb-4">
            <label className="mb-1 text-sm font-medium text-gray-700">
                Upload Image
            </label>
            <div
                className={`relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    dragActive 
                        ? "bg-blue-50" 
                        : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    multiple
                    className="hidden"
                />
                
                <label 
                    htmlFor={name}
                    className="flex flex-col items-center justify-center w-full h-full p-4 cursor-pointer"
                >
                    <CloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG ( Max 3 images )
                    </p>
                </label>
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="object-cover w-full h-24 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(index)}
                                className="absolute bottom-2 right-2 p-1 bg-red-500 rounded-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 focus:outline-none"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
        </div>
    );
};

export default ImageUpload;