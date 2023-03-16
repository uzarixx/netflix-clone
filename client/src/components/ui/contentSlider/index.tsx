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

const ContentSlider: FC = () => {
  const content = useAppSelector((root) => root.contentSlice.content);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchMainContent());
  }, []);
  const openMoreInfo = (props: IMoreInfo) => () => {
    dispatch(setMoreInfoOpen(true));
    dispatch(setMoreInfoData(props));
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
                      <button className={styles.play}>
                        <Play />
                      </button>
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