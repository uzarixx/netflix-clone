import React, { FC, useState } from 'react';
import styles from './Password.module.scss';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ProfileInput from '../../ui/inputs/profileInput';
import { passwordsValidate } from '../../../utils/validation/validationChangePassword';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../services/fetchServices/userFetch';
import { useAppSelector } from '../../../store/store';

type Inputs = {
  currentPassword: string,
  passwordRepeat: string,
  password: string,
};
const Password: FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const methods = useForm<Inputs>({
    resolver: yupResolver(passwordsValidate),
  });
  const onSubmit: SubmitHandler<Inputs> = async (props) => {
    try {
      await UserService.updatePassword(props.password, props.currentPassword);
      navigate('/profile');
      setError('');
    } catch (e: any) {
      console.log(e);
      setError(e.response.data.message);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>Change your password</h1>
          <h3>Protect your account with a unique password at lest 6 characters long.</h3>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <ProfileInput
              placeholder={'Current Password'}
              name={'currentPassword'}
              value={methods.watch('currentPassword')}
              type={'password'}
              error={methods.formState.errors}
            />
            <ProfileInput
              placeholder={'New Password (6-60 characters)'}
              name={'passwordRepeat'}
              value={methods.watch('passwordRepeat')}
              type={'password'}
              error={methods.formState.errors}
            />
            <ProfileInput
              placeholder={'Re-enter new password'}
              name={'password'}
              value={methods.watch('password')}
              type={'password'}
              error={methods.formState.errors}
            />
            <div className={styles.buttonsWrapper}>
              <button type={'submit'} className={styles.save}>Save</button>
              <button type={'reset'} className={styles.remove} onClick={() => navigate('/profile')}>Cancel</button>
            </div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

export default Password;