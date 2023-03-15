import React, { FC, useEffect, useState } from 'react';
import styles from './PinWindows.module.scss';
import PinInput from 'react-pin-input';
import NetflixLogo from '../../../ui/icons/NetflixLogo';
import UserService from '../../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../../store/store';
import { fetchAuthUser } from '../../../../store/counter/userSlice';

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
        <PinInput
          length={4}
          initialValue=''
          secret
          secretDelay={100}
          type='numeric'
          onChange={(value) => setPin(value)}
          inputMode='number'
          style={{ padding: '10px', margin: '10px' }}
          inputStyle={{
            borderColor: 'white',
            color: 'white',
            fontSize: '40px',
            width: '90px',
            height: '90px',
            margin: '10px',
          }}
          inputFocusStyle={{
            borderColor: 'white',
            color: 'white',
            fontSize: '40px',
            width: '90px',
            height: '90px',
            scale: '1.1',
          }}
          autoSelect={true}
          regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default PinWindow;