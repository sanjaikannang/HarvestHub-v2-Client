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


// Product upload form validation schema
export const productUploadValidationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Product Name is Required !')
        .min(3, 'Product Name must be at least 3 characters !'),
    description: Yup.string()
        .required('Description is Required !')
        .min(20, 'Description Must be at Least 20 Characters Long !'),
    startingPrice: Yup.number()
        .required('Starting Price is Required !')
        .positive('Starting Price Must be Greater Than 0 !'),
    quantity: Yup.number()
        .required('Quantity is Required !')
        .positive('Quantity Must be Greater Than 0 !')
        .integer('Quantity Must be a Whole Number !'),
    startingDate: Yup.date()
        .required('Starting Date is Required !')
        .min(new Date(), 'Starting Date Must be in The Future !'),
    endingDate: Yup.date()
        .required('Ending Date is Required !')
        .min(
            Yup.ref('startingDate'),
            'Ending Date Must be After Starting Date !'
        )
        .test(
            'duration-check',
            'Duration Must be Between 24 and 72 Hours !',
            function (endDate) {
                const startDate = this.parent.startingDate;
                if (!startDate || !endDate) return true;

                const hoursDifference = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
                return hoursDifference >= 24 && hoursDifference <= 72;
            }
        ),
    bidStartTime: Yup.string()
        .required('Bid Start Time is Required !')
        .test(
            'start-time-range',
            'Bid Start Time Must be Within The Selected Date Range !',
            function (startTime) {
                const { startingDate, endingDate } = this.parent;
                if (!startTime || !startingDate || !endingDate) return true;

                const bidStart = new Date(`${startingDate.toISOString().split('T')[0]}T${startTime}`);
                return bidStart >= startingDate && bidStart <= endingDate;
            }
        ),
    bidEndTime: Yup.string()
        .required('Bid End Time is Required !')
        .test(
            'end-time-range',
            'Bid End Time Must be After Start Time and Within Date Range !',
            function (endTime) {
                const { startingDate, endingDate, bidStartTime } = this.parent;
                if (!endTime || !bidStartTime || !startingDate || !endingDate) return true;

                const bidStart = new Date(`${startingDate.toISOString().split('T')[0]}T${bidStartTime}`);
                const bidEnd = new Date(`${startingDate.toISOString().split('T')[0]}T${endTime}`);

                if (bidEnd <= bidStart) return false;
                if (bidEnd > endingDate) return false;

                const durationMinutes = (bidEnd.getTime() - bidStart.getTime()) / (1000 * 60);
                return durationMinutes >= 10 && durationMinutes <= 60;
            }
        ),
    images: Yup.array()
        .required('Images are Required !')
        .length(3, 'Exactly 3 Images are Required !')
});