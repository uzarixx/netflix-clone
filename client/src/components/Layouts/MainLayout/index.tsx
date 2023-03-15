import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../semantical/Header';
import MainContent from '../../pages/MainContent';


const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<MainContent />} />
      </Routes>
    </>
  );
};

export default MainLayout;