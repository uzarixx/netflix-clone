import React, { FC, useEffect, useState } from 'react';
import styles from './TwoFactor.module.scss';
import NetflixLogo from '../../ui/icons/NetflixLogo';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../store/store';
import { fetchAuthAccount } from '../../../store/counter/userSlice';
import PinInputComponent from '../../ui/inputs/pinInput';

const TwoFactor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    const login = async () => {
      try {
        const { data } = await UserService.loginTwoFactor(pin);
        localStorage.setItem('token', data.token);
        dispatch(fetchAuthAccount());
        navigate('/');
      } catch (e) {
        console.log(e);
        setErrorMessage(true);
      }
    };
    pin.length >= 4 ? login() : setErrorMessage(false);
  }, [pin]);

  return (
    <div className={styles.twoFactorContainer}>
      <NetflixLogo />
      <h3>Login verification</h3>
      <h5>Enter your code from e-mail</h5>
      <PinInputComponent setPin={setPin} />
      {errorMessage && <p>Token is not a valid</p>}
      <Link to={'/'}>Go Back</Link>
    </div>
  );
};

export default TwoFactor;