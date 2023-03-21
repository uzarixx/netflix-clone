import React, { FC, useState } from 'react';
import styles from './LoginLayout.module.scss';
import NetflixLogo from '../../ui/icons/NetflixLogo';
import { FormProvider, SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import FormInput from '../../ui/inputs/authInput';
import SubmitButton from '../../ui/buttons/submitButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationAuth } from '../../../utils/validation/validationAuth';
import UserService from '../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../store/store';
import { fetchAuthAccount } from '../../../store/counter/userSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const imageBg = 'https://assets.nflxext.com/ffe/siteui/vlv3/5523db5a-e2b2-497f-a88b-61f175c3dbad/209471d1-7f9a-4624-aa69-d7e10668ff4a/UA-en-20230306-popsignuptwoweeks-perspective_alpha_website_small.jpg';

export const incorrectPassword = 'Incorrect password. Please try again or you can. ';

export const accountIsCreate = 'Sorry, we can\'t find an account with this email address. Please try again or ';

type Inputs = {
  email: string,
  password: string,
};
const LoginLayout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorRegisterMessage, setErrorRegisterMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const methods = useForm<Inputs>({
    resolver: yupResolver(validationAuth),
  });
  const onSubmit: SubmitHandler<Inputs> = async (props) => {
    try {
      let token;
      if (isLogin) {
        token = await UserService.login(props.email, props.password);
      } else {
        token = await UserService.registration(props.email, props.password);
      }
      localStorage.setItem('token', token.data.token);
      dispatch(fetchAuthAccount());
    } catch (e: any) {
      console.log(e);
      if (e.response.status === 308) {
        navigate('two-factor');
      }
      setErrorMessage(e.response.data.message.message);
      setErrorRegisterMessage(e.response.data.message);
    }
  };
  const changeLoginType = () => {
    setIsLogin(!isLogin);
    setErrorRegisterMessage('');
    setErrorMessage('');
  };
  const onClickError = () => {
    if (isLogin) {
      navigate('/login-help');
    } else {
      changeLoginType();

    }
  };
  return (
    <div className={styles.loginContainer}>
      <img
        className={styles.imageBg}
        src={imageBg}
      />
      <div className={styles.loginWrapper}>
        <header><NetflixLogo /></header>
        <form className={styles.formContainer} onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProvider {...methods}>
            <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
            {errorMessage &&
              <div className={styles.errorAuth}>
                <p>
                  {errorMessage === 'Incorrect password.' ? incorrectPassword : accountIsCreate}
                  <a onClick={onClickError}>
                    {errorMessage === 'Incorrect password.' ? 'Reset your password' : 'create a new account'}
                  </a>
                </p>
              </div>
            }
            {!isLogin && errorRegisterMessage && <div className={styles.errorAuth}><p>{errorRegisterMessage}</p></div>}
            <FormInput placeholder={'Email'} name={'email'} error={methods.formState.errors} type={'email'}
                       value={methods.watch('email')} />
            <FormInput placeholder={'Password'} name={'password'} error={methods.formState.errors} type={'password'}
                       value={methods.watch('password')} />
            <SubmitButton type={'submit'}>{isLogin ? 'Sign In' : 'Sign Up'}</SubmitButton>
            <Link to={'login-help'} className={styles.needHelp}>Need help?</Link>
            <div className={styles.newToNetflix}><p>{isLogin ? 'New to Netflix?' : 'Have account?'}</p>
              <span onClick={changeLoginType}>{isLogin ? 'Sign up now.' : 'Sign in now.'}</span></div>
          </FormProvider>
        </form>
      </div>
    </div>
  );
};

export default LoginLayout;