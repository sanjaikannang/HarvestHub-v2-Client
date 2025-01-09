import React from 'react';

interface DateTimeFieldProps {
    label: string;
    name: string;
    value: string | Date;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    min?: string;
    max?: string;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
    label,
    name,
    value,
    onChange,
    error,
    min,
    max
}) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="datetime-local"
                id={name}
                name={name}
                value={typeof value === 'string' ? value : value.toISOString().slice(0, 16)}
                onChange={onChange}
                min={min}
                max={max}
                className="border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default DateTimeField;