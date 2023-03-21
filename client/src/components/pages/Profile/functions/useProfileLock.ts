import { useState } from 'react';
import UserService from '../../../../services/fetchServices/userFetch';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { fetchAuthAccount, setAccount, setIsPinUser, setUser } from '../../../../store/counter/userSlice';


export const useProfileLock = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((root) => root.userSlice.user);
  const account = useAppSelector((root) => root.userSlice.account);
  const [pin, setPin] = useState('');
  const [changePin, setChangePin] = useState(false);
  const onClickSetPin = () => {
    setChangePin(true);
  };


  const onClickUpdatePin = async () => {
    try {
      await UserService.updatePin(user?.id || 0, Number(pin));
      setChangePin(false);
      dispatch(setIsPinUser({ id: user?.id, isPin: true }));
      dispatch(setUser({ ...user, isPin: true }));
    } catch (e) {
      console.log(e);
    }
  };

  const onClickRemovePin = async () => {
    try {
      await UserService.deletePin(user?.id || 0);
      dispatch(setIsPinUser({ id: user?.id, isPin: false }));
      dispatch(setUser({ ...user, isPin: false }));
    } catch (e) {
      console.log(e);
    }
  };

  return { changePin, onClickSetPin, onClickRemovePin, setPin, onClickUpdatePin };
};