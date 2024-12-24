import React from 'react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { LoginFormData } from '../../types/auth.types';

interface LoginFormProps {
    formData: LoginFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    formData,
    handleChange,
    handleSubmit,
    loading
}) => {
    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

            <InputField
                label="Email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
            >
                {loading ? 'Processing...' : 'Login'}
            </Button>
        </form>
    );
};