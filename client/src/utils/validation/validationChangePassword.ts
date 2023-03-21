import * as yup from 'yup';


export const passwordsValidate = yup.object().shape({
  currentPassword: yup.string().required('Input is required'),
  password: yup.string().min(6, 'Password should be between 6 and 60 characters').max(32, 'Password should be between 6 and 60 characters').required('Password should be between 6 and 60 characters').oneOf([yup.ref('passwordRepeat')], 'Must match your new password.'),
  passwordRepeat: yup.string().min(6, 'Password should be between 6 and 60 characters').max(32, 'Password should be between 6 and 60 characters').required('Password should be between 6 and 60 characters').oneOf([yup.ref('password')], 'Must match your new password.'),
});