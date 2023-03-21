import React, { useEffect } from 'react';
import LoginLayout from './components/Layouts/LoginLayout';
import { useAppDispatch, useAppSelector } from './store/store';
import { fetchAuthAccount, fetchAuthUser } from './store/counter/userSlice';
import SelectUserLayout from './components/Layouts/SelectUserLayout';
import MainLayout from './components/Layouts/MainLayout';
import { Route, Routes } from 'react-router-dom';
import TwoFactor from './components/pages/TwoFactor';
import UnathorizeLayout from './components/Layouts/UnathorizeLayout';

const App = () => {
  const dispatch = useAppDispatch();
  const accountSelector = useAppSelector((root) => root.userSlice.account);
  const userSelector = useAppSelector((root) => root.userSlice.user);
  const preloaderUser = useAppSelector((root) => root.userSlice.isPendingUser);
  const preloaderAccount = useAppSelector((root) => root.userSlice.isPendingAccount);
  useEffect(() => {
    dispatch(fetchAuthUser());
    dispatch(fetchAuthAccount());
  }, []);

  return (
    <>
      {preloaderUser || preloaderAccount ? <>Loading...</> :
        <>
          {accountSelector ?
            <>
              {userSelector ? <MainLayout /> : <SelectUserLayout />}
            </>
            :
            <UnathorizeLayout />
          }
        </>}
    </>
  );
};

export default App;
