import { FC, useState } from 'react';
import { useFetchContent } from '../../../hooks/useFetchContent';
import { useNavigate, useParams } from 'react-router-dom';
import Player from '../../ui/player';
import { ReactNetflixPlayer } from 'react-netflix-player';

const SeriesPlayer: FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { content } = useFetchContent();
  const season = content?.seasons?.filter((el) => el.numberSeason === Number(params.season))[0];
  const episode = content?.seasons?.filter((el) => el.numberSeason === Number(params.season)).flatMap((el) => el.episodes.filter((el) => el.id === Number(params.episode)))[0];
  const episodesList = season?.episodes.map((el) => ({
    id: el.numberEpisode,
    name: el.name,
    playing: el.id >= 2 ? Number(params.episode) > el.id : true,
  }));
  const backToSeasons = () => {
    navigate(`/series/${season?.contentId}`);
  };
  const nextEpisode = () => {
    season?.episodes[Number(params.episode)]?.numberEpisode ?
      navigate(`/series/view/${season?.contentId}/${season?.numberSeason}/${season?.episodes[Number(params.episode)].numberEpisode}`) :
      backToSeasons();
  };
  const selectEpisode = (e: string | number) => {
    navigate(`/series/view/${season?.contentId}/${season?.numberSeason}/${e}`);
  };
  return (
    <Player
      videoLink={`${episode?.videoLink}`}
      name={`${episode?.name}`}
      titleName={`${content?.name}`}
      isFilm={false}
      back={backToSeasons}
      nextEpisode={nextEpisode}
      episodes={episodesList}
      selectEpisode={selectEpisode}
    />
  );
};
export default SeriesPlayer;
