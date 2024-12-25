import * as Yup from 'yup';


// Signup form validation schema
export const signupValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is Required !')
        .min(3, 'Name must be at least 3 characters !'),
    email: Yup.string()
        .required('Email is Required !')
        .email('Invalid email address !'),
    password: Yup.string()
        .required('Password is Required !')
        .min(8, 'Password must be at least 8 characters'),
    phoneNo: Yup.string()
        .required('Phone Number is Required !')
        .matches(/^\d{10}$/, 'Phone Number must be 10 digits !'),
    role: Yup.string().required('Role is Required !'),
});


// Login form validation schema
export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email Address !')
        .required('Email is Required !'),
    password: Yup.string()
        .required('Password is Required !')
        .min(8, 'Password must be at least 8 characters !'),
});