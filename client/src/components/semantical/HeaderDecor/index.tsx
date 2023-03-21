import React, { FC } from 'react';
import styles from './HeaderDecor.module.scss';
import NetflixLogo from '../../ui/icons/NetflixLogo';
import Avatar from '../../../assets/png/avatar-1.png';

const HeaderDecor: FC = () => {
  return (
    <header className={styles.header}>
      <NetflixLogo />
      <img src={Avatar} />
    </header>
  );
};

export default HeaderDecor;