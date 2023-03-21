import React, { FC, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ContentSlider.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { fetchMainContent } from '../../../store/counter/contentSlice';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode } from 'swiper';
import { setMoreInfoData, setMoreInfoOpen } from '../../../store/counter/popupsSlice';
import Play from '../icons/Play';
import Like from '../icons/Like';
import { IMoreInfo } from '../../../constants/types';
import { useNavigate } from 'react-router-dom';

const ContentSlider: FC = () => {
  const navigate = useNavigate();
  const content = useAppSelector((root) => root.contentSlice.content);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMainContent());
  }, []);
  const openMoreInfo = (props: IMoreInfo) => () => {
    dispatch(setMoreInfoOpen(true));
    dispatch(setMoreInfoData(props));
  };

  const openVideo = (id: number, isFilm: boolean) => () => {
    isFilm ? navigate(`/film/view/${id}`) : navigate(`/series/${id}`);
  };
  return (
    <>
      {content?.map((el, i) =>
        <div className={styles.mainWrapper} key={i}>
          <h2>{el.contentCategory}</h2>
          <div className={styles.mainSlicker}>
            <Swiper
              slidesPerView={8}
              spaceBetween={8}
              freeMode={true}
              modules={[FreeMode]}
              className={styles.mySwiper}
            >
              {el.content.map((el) =>
                <SwiperSlide key={el.id} className={styles.slide} onClick={openMoreInfo(el)}>
                  <img src={el.previewImage} className={styles.slideImg} />
                  <div className={styles.onHover}>
                    <h4>{el.name}</h4>
                    <div className={styles.buttons}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <button className={styles.play} onClick={openVideo(el.id, el.isFilm)}>
                          <Play />
                        </button>
                      </div>
                      <button className={styles.like}>
                        <Like />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>,
              )}
            </Swiper>
          </div>
        </div>,
      )}
    </>

  );
};

export default ContentSlider;