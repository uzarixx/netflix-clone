import React, { FC, useState } from 'react';
import styles from './LoginHelp.module.scss';
import NetflixLogo from '../../ui/icons/NetflixLogo';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationHelpAccount } from '../../../utils/validation/validationHelpAccount';
import UserService from '../../../services/fetchServices/userFetch';


const LoginHelp: FC = () => {
  const [isSend, setIsSend] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(validationHelpAccount) });
  const onSubmit: SubmitHandler<{ email: string }> = async (props) => {
    try {
      await UserService.createForgotToken(props.email);
      setIsSend(true);
      setEmail(props.email);
      setError(false);
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };
  return (
    <div className={styles.loginHelpContainer}>
      <div className={styles.header}>
        <NetflixLogo />
        <Link to={'/'}>Login</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
        <h1>{isSend ? 'Email Sent' : 'Forgot Email/Password'}</h1>
        {error && <div className={styles.errorNotFound}> No account found for this email address.</div>}
        <p>{isSend ? `An email with instructions on how to reset your password has been sent to ${email}. Check your spam or junk folder if you don’t see the email in your inbox.`
          : 'We will send you an email with instructions on how to reset your password.'}
        </p>
        {isSend || <><input
          className={`${errors.email && styles.active}`}
          placeholder={'name@example.com'}
          type={'email'} {...register('email')} />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
          <button type={'submit'}>Email me</button>
        </>}
      </form>
    </div>
  );
};
export default LoginHelp;