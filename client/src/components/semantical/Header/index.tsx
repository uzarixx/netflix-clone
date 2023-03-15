import React, { FC, useEffect, useRef, useState } from 'react';
import styles from './Header.module.scss';
import NetflixLogo from '../../../components/ui/icons/NetflixLogo';
import Avatar from '../../../assets/png/avatar-1.png';
import Search from '../../ui/icons/Search';
import { fetchAuthUser, setAccount, setUser } from '../../../store/counter/userSlice';
import { useAppDispatch } from '../../../store/store';

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [openSettings, setOpenSettings] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const ref = useRef<(HTMLDivElement | null)>(null);
  const onClickSettings = (event: MouseEvent) => {
    const targetNode = event.target as Node;
    if (ref.current && !ref.current.contains(targetNode)) {
      setOpenSettings(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', onClickSettings);
    return () => {
      document.addEventListener('mousedown', onClickSettings);
    };
  }, []);

  const onLogout = () => {
    dispatch(setAccount(null));
    dispatch(setUser(null));
  };

  const onChangeUser = () => {
    dispatch(setUser(null));
    localStorage.removeItem('userToken');
  };
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.leftHeader}>
          <NetflixLogo />
          <ul>
            <li>My List</li>
            <li>Movies</li>
            <li>Series</li>
          </ul>
        </div>
        <div className={styles.rightHeader}>
          <div>
            {searchOpen || <div onClick={() => setSearchOpen(!searchOpen)}><Search /></div>}
          </div>
          <div className={styles.userBlock} onClick={() => setOpenSettings(!openSettings)}>
            <img src={Avatar} />
            {openSettings || <span className={styles.clue}>Open settings</span>}
            <div ref={ref} className={`${styles.settings} ${openSettings && styles.settingsOpen}`}
                 onClick={(e) => e.stopPropagation()}>
              <ul>
                <li>Profile</li>
                <li onClick={onChangeUser}>Change profile</li>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;