import { FC, useEffect, useState } from 'react';
import styles from './PreviewVideo.module.scss';
import SoundOn from '../icons/SoundOn';
import SoundOff from '../icons/SoundOff';
import Play from '../icons/Play';
import Info from '../icons/Info';
import FilmsService from '../../../services/fetchServices/filmsService';
import { useAppDispatch } from '../../../store/store';
import { setMoreInfoData, setMoreInfoOpen } from '../../../store/counter/popupsSlice';

interface IFilm {
  previewVideo: string;
  createdAt: string;
  description: string;
  id: number;
  isFilm: boolean;
  name: string;
  previewImage: string;
  publicationDate: string;
  rating: number;
  yearCategory: number;
}


const PreviewVideo: FC = () => {
  const dispatch = useAppDispatch();
  const [sound, setSound] = useState(true);
  const [film, setFilm] = useState<IFilm>();
  useEffect(() => {
    const fetchFilm = async () => {
      const { data } = await FilmsService.getRandomFilm();
      setFilm(data);
    };
    fetchFilm();
  }, []);
  const onClickOpen = () => {
    dispatch(setMoreInfoOpen(true));
    dispatch(setMoreInfoData(film));
  };
  return (
    <div className={styles.video}>
      <video
        muted={sound}
        src={film?.previewVideo}
        autoPlay
        loop
      />
      <div className={styles.info}>
        <h3>{film?.name}</h3>
        <h4>{film?.description}</h4>
        <div className={styles.buttons}>
          <button className={styles.buttonPlay}><Play /> Play</button>
          <button className={styles.moreInfo} onClick={onClickOpen}><Info /> More Info</button>
        </div>
      </div>
      <div className={styles.buttonSound}>
        <button onClick={() => setSound(!sound)}>{sound ? <SoundOff /> : <SoundOn />}</button>
        <span>{film?.yearCategory}+</span>
      </div>
    </div>
  );
};

export default PreviewVideo;