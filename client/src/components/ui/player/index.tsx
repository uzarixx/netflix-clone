import { FC, useEffect, useRef, useState } from 'react';
import styles from './Player.module.scss';
import ReactPlayer from 'react-player';
import Play from '../icons/player/Play';
import ScrollTime from '../icons/player/ScrollTime';
import Sound from '../icons/player/Sound';
import FullWidth from '../icons/player/FullWidth';
import BackArrow from '../icons/player/BackArrow';
import Next from '../icons/player/Next';
import Episodes from '../icons/player/Episodes';

interface content {
  videoLink: string;
  name: string;
  back: () => void;
  nextEpisode?: () => void;
  titleName: string;
  isFilm: boolean | undefined;
  episodes?: { id: number, name: string, playing: boolean }[] | undefined;
  selectEpisode?: (e: string | number) => void;
}

const Player: FC<content> = ({ videoLink, name, back, titleName, isFilm, nextEpisode, episodes, selectEpisode }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [onMove, setOnMove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [playing, setPlaying] = useState(false);
  const [episodesList, setEpisodesList] = useState(false);
  const [seek, setSeek] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [initialLength, setInitialLength] = useState(0);

  const onChangeSeek = (seek: number) => {
    if (seeking) return;
    setSeek(seek);
  };
  const seekFunc = (value: string) => {
    setSeeking(true);
    setSeek(() => Number(value));
    if (playerRef.current !== null) {
      playerRef.current.seekTo(Number(value));
    }
    setTimeout(() => setSeeking(false), 1000);
  };

  const plusTime = () => {
    setSeek((s) => s + 5);
    if (playerRef.current !== null) {
      const value = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(value + 5);
    }
  };
  const minusTime = () => {
    setSeek((s) => s - 5);
    if (playerRef.current !== null) {
      const value = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(value - 5);
    }
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsOpen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsOpen(false);
      }
    }
  }

  const handleMouseMove = () => {
    setOnMove(true);
  };

  useEffect(() => {
    let timeoutId: any;
    if (onMove) {
      timeoutId = setTimeout(() => {
        setOnMove(false);
        setEpisodesList(false);
      }, 10000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onMove]);
  return (
    <div className={`${styles.videoWrapper} ${onMove || styles.activeVideoWrapper}`}
         onMouseMove={handleMouseMove}>
      <ReactPlayer
        ref={playerRef}
        playIcon={<Play isStart={playing} />}
        width={'100%'}
        height={'100%'}
        volume={volume}
        url={videoLink}
        playing={playing}
        onEnded={nextEpisode}
        muted={false}
        onDuration={(e) => setInitialLength(e)}
        onProgress={(e) => onChangeSeek(e.playedSeconds)}
        progressInterval={200}
      />
      <div className={`${styles.mainStop} ${!onMove && !playing && styles.mainStopActive}`}>
        <div className={styles.infoWrapper}>
          <p>You're watching</p>
          <h3>{titleName}</h3>
        </div>
      </div>
      {onMove && <div className={styles.back} onClick={back}><BackArrow /> <p>Go Back</p></div>}
      <div className={`${styles.navigationContainer} ${onMove && styles.navigationContainerActive}`}>
        <div className={styles.scrollBar}>
          <input type='range' value={seek} onChange={(e) => seekFunc(e.target.value)} max={initialLength} />
        </div>
        <div className={styles.controlButtons}>
          <div className={styles.left}>
            <button className={styles.play} onClick={() => setPlaying(!playing)}><Play isStart={playing} /></button>
            <button className={styles.minus} onClick={minusTime}><ScrollTime /></button>
            <button className={styles.plus} onClick={plusTime}><ScrollTime /></button>
            <button className={styles.sound} onClick={() => setVolume((val) => val >= 0.1 ? 0 : 1)}>
              <Sound value={volume} />
              <input
                type={'range'} min={0} max={10}
                onClick={(e) => e.stopPropagation()}
                value={volume * 10}
                onChange={(e) => setVolume(Number(e.target.value) / 10)}
                defaultValue={0.5} /></button>
            <p>{name}</p>
          </div>
          <div className={styles.right}>
            {isFilm || <button onClick={nextEpisode}>
              <Next />
            </button>}
            {episodesList && <div className={`${styles.episodes}`} onClick={() => setEpisodesList(false)}>
              {episodes?.map((el) =>
                <span
                  onClick={() => selectEpisode && selectEpisode(el.id)} key={el.id}
                  className={`${el.playing && styles.active}`}>{el.id}. {el.name}</span>,
              )}
            </div>}
            {isFilm || <button onClick={() => setEpisodesList(!episodesList)}>
              <Episodes />
            </button>}
            <button onClick={toggleFullScreen}>
              <FullWidth isOpen={isOpen} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;