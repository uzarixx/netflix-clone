import { FC, useEffect } from 'react';
import styles from './Film.module.scss';
import { useFetchContent } from '../../../hooks/useFetchContent';
import { useNavigate } from 'react-router-dom';
import Player from '../../ui/player';

const Film: FC = () => {
  const navigate = useNavigate();
  const { content } = useFetchContent();
  useEffect(() => {
    if (content?.seasons?.length) {
      navigate(`/series/${content.id}`);
    }
  }, [content]);
  const backToContent = () => {
    navigate('/');
  };
  return (
    <>{
      content?.films.map((el) =>
        <Player isFilm={true} back={backToContent} titleName={content?.name} name={content?.name}
                videoLink={el.videoLink} />,
      )}</>
  );
};

export default Film;