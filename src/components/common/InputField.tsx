import React from 'react';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder
}) => (
    <div className="mb-4">
        <label className="text-gray-700 text-sm ml-1 mb-2">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    </div>
);