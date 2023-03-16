import React, { FC, useEffect, useState } from 'react';
import styles from './PinWindows.module.scss';
import PinInput from 'react-pin-input';
import NetflixLogo from '../../../ui/icons/NetflixLogo';
import UserService from '../../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../../store/store';
import { fetchAuthUser } from '../../../../store/counter/userSlice';
import PinInputComponent from '../../../ui/inputs/pinInput';

interface props {
  id: number;
  onClose: (props: { isOpen: boolean, userId: number }) => void;
}

const PinWindow: FC<props> = ({ id, onClose }) => {
  const dispatch = useAppDispatch();
  const [pin, setPin] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    const onLoginUser = async () => {
      try {
        const { data } = await UserService.loginUser(id, Number(pin));
        localStorage.setItem('userToken', data.token);
        dispatch(fetchAuthUser());
        onCloseWindow();
      } catch (e: any) {
        console.log(e);
        setMessage(e.response.data.message);
      }
    };
    pin.length >= 4 ? onLoginUser() : setMessage('');
  }, [pin]);
  const onCloseWindow = () => {
    onClose({ isOpen: false, userId: 0 });
  };
  return (
    <div className={styles.pinWindowContainer}>
      <span onClick={onCloseWindow}>CLOSE</span>
      <div className={styles.pinWindowWrapper}>
        <NetflixLogo />
        <h2>Enter your PIN to access this profile.</h2>
        <PinInputComponent setPin={setPin} />
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default PinWindow;