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
        .min(20, 'Description Must be At Least 20 Characters Long !'),
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
    bidStartTime: Yup.date()
        .required('Bid Start Time is Required !')
        .test(
            'start-time-range',
            'Bid Start Time Must be Within The Selected Date Range !',
            function (bidStartTime) {
                const { startingDate, endingDate } = this.parent;
                if (!bidStartTime || !startingDate || !endingDate) return true;

                return bidStartTime >= startingDate && bidStartTime <= endingDate;
            }
        ),
    bidEndTime: Yup.date()
        .required('Bid End Time is Required !')
        .test(
            'end-time-range',
            'Bid End Time Must be After Start Time and Within Date Range !',
            function (bidEndTime) {
                const { startingDate, endingDate, bidStartTime } = this.parent;
                if (!bidEndTime || !bidStartTime || !startingDate || !endingDate) return true;

                // Check if bid end time is after bid start time and within date range
                const isWithinRange = bidEndTime > bidStartTime && bidEndTime <= endingDate;

                // Calculate duration in minutes
                const durationMinutes = (bidEndTime.getTime() - bidStartTime.getTime()) / (1000 * 60);
                const isValidDuration = durationMinutes >= 10 && durationMinutes <= 60;

                return isWithinRange && isValidDuration;
            }
        ),
    images: Yup.array()
        .required('Images are Required !')
        .length(3, 'Exactly 3 Images are Required !')
});