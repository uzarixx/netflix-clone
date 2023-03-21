import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../semantical/Header';
import MainContent from '../../pages/MainContent';
import Series from '../../pages/Series';
import SeriesPlayer from '../../pages/SeriesPlayer';
import Film from '../../pages/Film';
import Profile from '../../pages/Profile';
import Password from '../../pages/Password';
import DisabledTwoFactor from '../../pages/DisabledTwoFactor';


const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<MainContent />} />
        <Route path={`/series/:id`} element={<Series />} />
        <Route path={`/series/view/:id/:season/:episode`} element={<SeriesPlayer />} />
        <Route path={'/film/view/:id'} element={<Film />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/password'} element={<Password />} />
        <Route path={'/disabled-two-factor'} element={<DisabledTwoFactor />} />
      </Routes>
    </>
  );
};

export default MainLayout;