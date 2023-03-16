import { FC, useEffect, useState } from 'react';
import { useFetchSeries } from '../../../hooks/useFetchSeries';
import { useParams } from 'react-router-dom';
import styles from './SeriesPlayer.module.scss';

const SeriesPlayer: FC = () => {
  const params = useParams();
  const [muted, setMuted] = useState(true);
  const { series } = useFetchSeries();
  const link = String(series?.seasons?.filter((el) => el.numberSeason === Number(params.season)).flatMap((el) => el.episodes.filter((el) => el.id === Number(params.episode)))[0].videoLink);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMuted(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={styles.videoWrapper}>
      <video src={link} muted={muted} playsInline controls={true} autoPlay color={'red'} />
    </div>
  )
    ;
};
export default SeriesPlayer;