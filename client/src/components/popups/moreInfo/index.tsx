import React, { FC, useState } from 'react';
import styles from './MoreInfo.module.scss';
import Play from '../../ui/icons/Play';
import Like from '../../ui/icons/Like';
import { useAppSelector } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { setMoreInfoData, setMoreInfoOpen } from '../../../store/counter/popupsSlice';
import SoundOff from '../../ui/icons/SoundOff';
import SoundOn from '../../ui/icons/SoundOn';
import date from '../../../utils/date';
import { useNavigate } from 'react-router-dom';
import { IMoreInfo } from '../../../constants/types';



const MoreInfo: FC = () => {
  const navigate = useNavigate();
  const [sound, setSound] = useState(true);
  const dispatch = useDispatch();
  const moreLike = useAppSelector((root) => root.contentSlice.content);
  const useData = useAppSelector((root) => root.popupsSlice.moreInfoData);
  const isOpen = useAppSelector((root) => root.popupsSlice.moreInfoOpen);
  const onCloseMoreInfo = () => {
    dispatch(setMoreInfoOpen(false));
    dispatch(setMoreInfoData(null));
    setSound(true);
  };

  const onOpenNextContent = (props: IMoreInfo) => () => {
    dispatch(setMoreInfoData(props));
  };

  const openSeries = (id: number | undefined) => () => {
    navigate(`/series/${id}`)
  }

  return (
    <div className={`${styles.moreInfoContainer} ${isOpen && styles.moreInfoContainerOpen}`} onClick={onCloseMoreInfo}>
      <div className={`${styles.moreInfoContainer}  ${isOpen && styles.moreInfoContainerOpen}`}
           onClick={(e) => e.stopPropagation()}>
        <div className={styles.videoWrapper}>
          <button className={styles.closeMoreInfo} onClick={onCloseMoreInfo}>X</button>
          <video
            src={useData?.previewVideo}
            autoPlay loop muted={sound} />
          <div className={styles.infoWrapper}>
            <h3>{useData?.name}</h3>
            <div className={styles.buttons}>
              <button className={styles.playButton} onClick={useData?.isFilm ? () => {} : openSeries(useData?.id)}><Play /> Play</button>
              <button className={styles.plusButton}>+</button>
              <button className={styles.likeButton}><Like /></button>
            </div>
            <div className={styles.tags}>
              <span>{useData?.rating}% Match</span>
              <p>{date(useData?.publicationDate)}</p>
              <b>{useData?.yearCategory}+</b>
              <b>HD</b>
            </div>
            <span>{useData?.description}</span>
          </div>
          <div className={styles.volumeButton} onClick={() => setSound(!sound)}>{sound ? <SoundOff /> :
            <SoundOn />}</div>
        </div>
        <div className={styles.moreLikeThis}>
          <h3>More Like This</h3>
          {moreLike?.map((el, i) =>
            <div key={i} className={styles.videosContainer}>
              {i === 1 && el.content.map((el) =>
                <div className={styles.videosWrapper} onClick={onOpenNextContent(el)}>
                  <div className={styles.imageContainer}>
                    <img src={el.previewImage} alt='film-image-preview' />
                    <p>{el.name}</p>
                  </div>
                  <div className={styles.infoContainer}>
                    <p className={styles.rating}>{el.rating}% Match</p>
                    <div className={styles.etcWrapper}>
                      <p>{el.yearCategory}+</p>
                      <p>{date(el.publicationDate)}</p>
                    </div>
                    <span>
                      {el.description.slice(0, 120)}{el.description.length >= 120 && '...'}
                    </span>
                  </div>
                </div>,
              )}
            </div>,
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;