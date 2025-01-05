import React from 'react';

interface DateFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    min?: string;
    max?: string;
}

const DateField: React.FC<DateFieldProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    required = false,
    min,
    max
}) => {
    return (
        <div className='mb-4'>
            <label className="text-gray-700 text-sm ml-1 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type="date"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                max={max}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default DateField;