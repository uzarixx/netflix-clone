import * as yup from 'yup';

export const validationHelpAccount = yup.object().shape({
  email: yup.string().email('Please enter a valid email'),
});