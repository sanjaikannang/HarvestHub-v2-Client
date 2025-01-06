import React from 'react';

interface TextAreaProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    rows?: number;
    placeholder?: string;
    required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    rows = 4,
    placeholder,
    required = false
}) => {
    return (
        <div className='mb-4'>
            <label className="text-gray-700 text-sm ml-1 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
                name={name}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
                required={required}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default TextArea;