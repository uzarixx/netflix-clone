import * as yup from 'yup';

export const validationAuth = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Please enter a valid email'),
  password: yup.string().min(4, 'Your password must contain between 4 and 60 characters.').max(60, 'Your password must contain between 4 and 60 characters.').required('Your password must contain between 4 and 60 characters.'),
});