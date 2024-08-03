import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/, 'Email must be a valid domain'),
  password: Yup.string()
    .required('Please enter your password')
    .min(8, 'Your password is too short')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter'),
});
