import { FC, useState } from 'react';
import Header from '../../semantical/Header';
import styles from './Series.module.scss';
import Banner from './banner';
import { useFetchSeries } from '../../../hooks/useFetchSeries';
import { useNavigate } from 'react-router-dom';


const Series: FC = () => {
  const navigate = useNavigate();
  const { series, contentId } = useFetchSeries();
  const [season, setSeason] = useState(1);
  const onClickEpisode = (props: { numberEpisode: number, numberSeason: number }) => () => {
    navigate(`/series/view/${contentId}/${props.numberSeason}/${props.numberEpisode}`);
  };
  return (
    <>
      <Banner
        bannerLink={series?.previewImage}
        description={series?.description}
        publicationDate={series?.publicationDate}
        name={series?.name}
        yearCategory={series?.yearCategory}
      />
      <div className={styles.episodes}>
        <div className={styles.title}>
          <h3>Episodes</h3>
          <span>{series?.name}</span>
        </div>
        <div className={styles.episodesContainer}>
          {series?.seasons?.filter((el) => el.numberSeason === season).map((el) => el.episodes.map((el) =>
            <div className={styles.episodesWrapper} key={el.id} onClick={onClickEpisode(el)}>
              <img src={el.imageLink} />
              <div className={styles.title}>
                <p>{el.numberEpisode}. {el.name}</p>
                <b>{Math.floor(el.length / 60)} <br /> мин.</b>
              </div>
              <h4>{el.description}</h4>
            </div>,
          )).flat()}
        </div>
      </div>
    </>
  );
};

export default Series;