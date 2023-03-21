import { useState } from 'react';
import UserService from '../../../../services/fetchServices/userFetch';

export const useOnClickTwoFactor = (twoFactor: boolean | undefined) => {
  const [checked, setChecked] = useState(twoFactor || false);
  const [sendMessage, setSendMessage] = useState(false);
  const onClickTwoFactor = async () => {
    if (checked) {
      setSendMessage(true);
      await UserService.reqDisableTwoFactor();
    } else {
      setChecked(true);
      await UserService.enableTwoFactor();
    }
  };

  return { sendMessage, checked, onClickTwoFactor };
};