import * as yup from 'yup';



export const passwordsValidate = yup.object().shape({
  password: yup.string().min(3, 'Min length 3 character').max(32, 'Max length 32 character').required('Input is required').oneOf([yup.ref('passwordRepeat')], 'Passwords must be the same'),
  passwordRepeat: yup.string().min(3, 'Min length 3 character').max(32, 'Max length 32 character').required('Input is required').oneOf([yup.ref('password')], 'Passwords must be the same'),
});