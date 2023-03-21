import { FC, useEffect, useState } from 'react';
import styles from './Series.module.scss';
import Banner from './banner';
import { useFetchContent } from '../../../hooks/useFetchContent';
import { useNavigate } from 'react-router-dom';


const Series: FC = () => {
  const navigate = useNavigate();
  const { content, contentId } = useFetchContent();
  const [season, setSeason] = useState(1);
  const onClickEpisode = (props: { numberEpisode: number, numberSeason: number }) => () => {
    navigate(`/series/view/${contentId}/${props.numberSeason}/${props.numberEpisode}`);
  };

  useEffect(() => {
    if (content?.films?.length) {
      navigate(`/film/view/${content.id}`);
    }
  }, [content]);
  return (
    <>
      <Banner
        bannerLink={content?.previewImage}
        description={content?.description}
        publicationDate={content?.publicationDate}
        name={content?.name}
        yearCategory={content?.yearCategory}
      />
      <div className={styles.episodes}>
        <div className={styles.title}>
          <h3>Episodes</h3>
          <span>{content?.name}</span>
        </div>
        <div className={styles.episodesContainer}>
          {content?.seasons?.filter((el) => el.numberSeason === season).map((el) => el.episodes.map((el) =>
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