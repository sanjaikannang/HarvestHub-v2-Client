import React from 'react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { LoginFormData } from '../../types/auth.types';
import { useFormik } from 'formik';
import { loginValidationSchema } from '../../schemas/validationSchema';
import LoadingSpinner from '../common/LoadingSpinner';
import { Link } from 'react-router-dom';

interface LoginFormProps {
    loading: boolean;
    onSubmit: (values: LoginFormData) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ loading, onSubmit }) => {
    const formik = useFormik({
        initialValues: { email: '', password: '' }, // Initial form values
        validationSchema: loginValidationSchema, // Validation schema
        onSubmit: (values) => { onSubmit(values); }, // Handle form submission
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-harvest-offwhite shadow-xl border rounded-xl px-6 pt-6 pb-8 mb-4">
                <h2 className="text-xl mb-4 text-center">Login</h2>


                {/* Input fields */}
                <InputField
                    label="Email"
                    name="email"
                    type="text"
                    placeholder="john@gmail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.errors.email && formik.touched.email ? formik.errors.email : undefined}
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.errors.password && formik.touched.password ? formik.errors.password : undefined}
                />


                {/* Submit button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <LoadingSpinner /> : 'Login'}
                </Button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-harvest-secondary">
                        Signup here
                    </Link>
                </p>
            </div>
        </>
    );
};
