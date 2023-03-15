import React, { FC, useState } from 'react';
import styles from './MoreInfo.module.scss';
import Play from '../../ui/icons/Play';
import Like from '../../ui/icons/Like';
import { useAppSelector } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { setMoreInfoData, setMoreInfoOpen } from '../../../store/counter/popupsSlice';
import SoundOff from '../../ui/icons/SoundOff';
import SoundOn from '../../ui/icons/SoundOn';

const MoreInfo: FC = () => {
  const [sound, setSound] = useState(true);
  const dispatch = useDispatch();
  const useData = useAppSelector((root) => root.popupsSlice.moreInfoData);
  const isOpen = useAppSelector((root) => root.popupsSlice.moreInfoOpen);
  const onCloseMoreInfo = () => {
    dispatch(setMoreInfoOpen(false));
    dispatch(setMoreInfoData(null));
    setSound(true);
  };
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
              <button className={styles.playButton}><Play /> Play</button>
              <button className={styles.plusButton}>+</button>
              <button className={styles.likeButton}><Like /></button>
            </div>
            <div className={styles.tags}>
              <span>{useData?.rating}% Match</span>
              <p>2022</p>
              <b>{useData?.yearCategory}+</b>
              <b>HD</b>
            </div>
            <span>{useData?.description}</span>
          </div>
          <div className={styles.volumeButton} onClick={() => setSound(!sound)}>{sound ? <SoundOff /> :
            <SoundOn />}</div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;