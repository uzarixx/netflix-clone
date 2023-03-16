import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../semantical/Header';
import MainContent from '../../pages/MainContent';
import Series from '../../pages/Series';
import SeriesPlayer from '../../pages/SeriesPlayer';


const MainLayout: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={'/'} element={<MainContent />} />
        <Route path={`/series/:id`} element={<Series />} />
        <Route path={`/series/view/:id/:season/:episode`} element={<SeriesPlayer />} />
      </Routes>
    </>
  );
};

export default MainLayout;