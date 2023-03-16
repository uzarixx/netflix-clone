import { FC } from 'react';
import styles from './Banner.module.scss';
import date from '../../../../utils/date';

interface props {
  bannerLink: string | undefined;
  description: string | undefined;
  name: string | undefined;
  publicationDate: string | undefined;
  yearCategory: number | undefined;
}

const Banner: FC<props> = ({ bannerLink, description, name, publicationDate, yearCategory }) => {
  return (
    <div className={styles.bannerContainer}>
      <img src={bannerLink} alt='Banner' />
      <div className={styles.bannerInfo}>
        <h3>{name}</h3>
        <div className={styles.info}>
          <p>{date(publicationDate)}</p>
          <b>|</b>
          <span>{yearCategory}+</span>
        </div>
        <h4>
          {description}
        </h4>
      </div>
    </div>
  );
};
export default Banner;