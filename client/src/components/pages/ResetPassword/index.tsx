import React, { FC, useEffect, useState } from 'react';
import styles from './ResetPassword.module.scss';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UserService from '../../../services/fetchServices/userFetch';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordsValidate } from '../../../utils/validation/validationResetPassword';
import { useAppDispatch } from '../../../store/store';
import { fetchAuthAccount } from '../../../store/counter/userSlice';
import HeaderDecor from '../../semantical/HeaderDecor';
import ProfileInput from '../../ui/inputs/profileInput';


const ResetPassword: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verifyToken = async (token: string | null) => {
    if (token) {
      try {
        const { data } = await UserService.verifyForgotToken(token);
        setEmail(data);
      } catch (e) {
        navigate('/');
        console.log(e);
      }
    }
  };
  useEffect(() => {
    if (searchParams.get('token')) {
      verifyToken(searchParams.get('token'));
    } else {
      navigate('/');
    }
  }, []);
  const methods = useForm<{ password: string, passwordRepeat: string }>({
    resolver: yupResolver(passwordsValidate),
  });

  const onSubmit: SubmitHandler<{ password: string, passwordRepeat: string }> = async (props) => {
    try {
      const { data } = await UserService.loginAndUpdatePassword(searchParams.get('token') || '', props.password);
      localStorage.setItem('token', data.token);
      dispatch(fetchAuthAccount());
      navigate('/');
    } catch (e) {
      navigate('/');
    }
  };
  return (
    <div className={styles.resetPasswordContainer}>
      <HeaderDecor />
      <form className={styles.resetPasswordWrapper} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormProvider {...methods}>
          <h1>Change your password</h1>
          <span className={styles.Info}>Protect your account with a unique password at least 6 characters long.</span>
          <div className={styles.emailValue}>
            <p>Current Email</p>
            <span>{email}</span>
          </div>
          <ProfileInput
            type={'password'}
            placeholder={'New password (6-60 characters)'}
            name={'passwordRepeat'}
            value={methods.watch('passwordRepeat')}
            error={methods.formState.errors}
          />
          <ProfileInput
            type={'password'}
            placeholder={'Re-enter new password'}
            name={'password'}
            value={methods.watch('password')}
            error={methods.formState.errors}
          />
          <div className={styles.buttonsWrapper}>
            <button type={'submit'} className={styles.save}>Save</button>
            <button type={'reset'} className={styles.remove} onClick={() => navigate('/')}>Cancel</button>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};
export default ResetPassword;