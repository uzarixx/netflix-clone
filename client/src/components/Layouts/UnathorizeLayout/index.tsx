import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginLayout from '../LoginLayout';
import TwoFactor from '../../pages/TwoFactor';
import LoginHelp from '../../pages/LoginHelp';
import ResetPassword from '../../pages/ResetPassword';


const UnathorizeLayout = () => {
  return (
    <Routes>
      <Route path={'*'} element={<LoginLayout />} />
      <Route path={'/two-factor'} element={<TwoFactor />} />
      <Route path={'/login-help'} element={<LoginHelp />} />
      <Route path={'/reset-password'} element={<ResetPassword />} />
    </Routes>
  );
};

export default UnathorizeLayout;