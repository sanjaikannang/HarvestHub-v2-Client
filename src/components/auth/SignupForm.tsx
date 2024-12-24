import React from 'react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { SignupFormData } from '../../types/auth.types';
import { User, ShoppingCart } from 'lucide-react';

interface SignupFormProps {
    formData: SignupFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}

interface RoleOption {
    value: string;
    label: string;
    icon: React.ReactNode;
}

const roleOptions: RoleOption[] = [
    {
        value: 'Farmer',
        label: 'Farmer',
        icon: <User className="w-6 h-6" />
    },
    {
        value: 'Buyer',
        label: 'Buyer',
        icon: <ShoppingCart className="w-6 h-6" />
    },
    // {
    //     value: 'Admin',
    //     label: 'Admin',
    //     icon: <Shield className="w-6 h-6" />
    // }
];

export const SignupForm: React.FC<SignupFormProps> = ({
    formData,
    handleChange,
    handleSubmit,
    loading
}) => {
    const handleRoleSelect = (role: string) => {
        const event = {
            target: {
                name: 'role',
                value: role
            }
        } as React.ChangeEvent<HTMLInputElement>;
        handleChange(event);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-harvest-offwhite shadow-xl border rounded-xl px-6 pt-6 pb-8 mb-4">
            <h2 className="text-xl mb-4 text-center">Sign Up</h2>

            <InputField
                label="Name"
                name="name"
                type="text"
                placeholder='John Doe'
                value={formData.name}
                onChange={handleChange}
            />

            <InputField
                label="Email"
                name="email"
                type="text"
                placeholder='john@gmail.com'
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                placeholder='********'
                value={formData.password}
                onChange={handleChange}
            />

            <InputField
                label="Phone Number"
                name="phoneNo"
                type="text"
                placeholder='9876543210'
                value={formData.phoneNo}
                onChange={handleChange}
            />

            <div className="mb-4">
                <label className="block text-center text-gray-700 text-sm mb-4">
                    Select Role
                </label>
                <div className="flex justify-evenly gap-4">
                    {roleOptions.map((role) => (
                        <div key={role.value} className="flex flex-col items-center">
                            <button
                                type="button"
                                onClick={() => handleRoleSelect(role.value)}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg border shadow-sm transition-all duration-200 hover:bg-harvest-lightgray ${formData.role === role.value
                                    ? 'border-harvest-secondary bg-harvest-extralight'
                                    : 'border-gray-200'
                                    }`}
                            >
                                <div
                                    className="text-xl"
                                    style={{ strokeWidth: '0.1' }}
                                >
                                    {role.icon}
                                </div>
                            </button>
                            <span className="mt-2 text-[12px]">{role.label}</span>
                        </div>
                    ))}
                </div>

            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? 'Processing...' : 'Sign Up'}
            </Button>
        </form>
    );
};