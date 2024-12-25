import React from 'react';
import { InputField } from '../common/InputField';
import { Button } from '../common/Button';
import { SignupFormData } from '../../types/auth.types';
import { User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { signupValidationSchema } from '../../schemas/validationSchema';
import LoadingSpinner from '../common/LoadingSpinner';


// Props for the SignupForm component
interface SignupFormProps {
    loading: boolean;
    onSubmit: (values: SignupFormData) => void;
}

interface RoleOption {
    value: string;
    label: string;
    icon: React.ReactNode;
}


// Role options for the signup form
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
];


export const SignupForm: React.FC<SignupFormProps> = ({ loading, onSubmit }) => {
    const formik = useFormik({
        initialValues: { name: '', email: '', password: '', phoneNo: '', role: '' }, // Form initial values
        validationSchema: signupValidationSchema, // Validation schema for the form
        onSubmit: (values) => { onSubmit(values); }, // Form submission handler
    });

    const handleRoleSelect = (role: string) => {
        formik.setFieldValue('role', role); // Set role value in form
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto bg-harvest-offwhite shadow-xl border rounded-xl px-6 pt-6 pb-8 mb-4">
                <h2 className="text-xl mb-4 text-center">Sign Up</h2>


                {/* Input fields for the form */}
                <InputField
                    label="Name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.errors.name && formik.touched.name ? formik.errors.name : undefined}
                />

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

                <InputField
                    label="Phone Number"
                    name="phoneNo"
                    type="text"
                    placeholder="9876543210"
                    value={formik.values.phoneNo}
                    onChange={formik.handleChange}
                    error={formik.errors.phoneNo && formik.touched.phoneNo ? formik.errors.phoneNo : undefined}
                />


                {/* Role selection buttons */}
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
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border shadow-sm transition-all duration-200 hover:bg-harvest-lightgray ${formik.values.role === role.value
                                        ? 'border-harvest-secondary bg-harvest-extralight'
                                        : 'border-gray-200'
                                        }`}
                                >
                                    <div className="text-xl" style={{ strokeWidth: '0.1' }}>
                                        {role.icon}
                                    </div>
                                </button>
                                <span className="mt-2 text-[12px]">{role.label}</span>
                            </div>
                        ))}
                    </div>
                    {formik.errors.role && formik.touched.role && (
                        <div className="text-red-500 text-xs">{formik.errors.role}</div>
                    )}
                </div>


                {/* Submit button */}
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? <LoadingSpinner /> : 'Sign Up'}
                </Button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-harvest-secondary">
                        Login here
                    </Link>
                </p>
            </div>
        </>
    );
};
