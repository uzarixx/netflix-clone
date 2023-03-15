import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import styles from './SelectUserLayout.module.scss';
import NetflixLogo from '../../ui/icons/NetflixLogo';
import Avatar0 from '../../../assets/png/avatar-1.png';
import Avatar1 from '../../../assets/png/avatar-2.png';
import Avatar2 from '../../../assets/png/avatar-3.png';
import Avatar3 from '../../../assets/png/avatar-4.png';
import Avatar4 from '../../../assets/png/avatar-5.png';
import Pen from '../../ui/icons/Pen';
import AddButton from '../../ui/icons/AddButton';
import AddUser from './addUser';
import EditUser from './editUser';
import Lock from '../../ui/icons/Lock';
import UserService from '../../../services/fetchServices/userFetch';
import PinWindow from './pinWindow';
import { fetchAuthUser } from '../../../store/counter/userSlice';

const SelectUserLayout: FC = () => {
  const dispatch = useAppDispatch();
  const [pinOpen, setPinOpen] = useState({ isOpen: false, userId: 0 });
  const [editUser, setEditUser] = useState({ isOpen: false, username: '', id: 0, isPin: false });
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [manageUser, setManageUser] = useState(false);
  const accountSelector = useAppSelector((root) => root.userSlice.account);
  const onManageUser = () => {
    setManageUser(!manageUser);
  };
  if (isCreateUser || editUser.isOpen) {
    return (
      <div className={styles.selectUserContainer}>
        <header><NetflixLogo /></header>
        {editUser.isOpen ? <EditUser onClose={setEditUser} editUser={editUser} /> :
          isCreateUser && <AddUser onClose={setIsCreateUser} />}
      </div>
    );
  }
  const openEditUser = (username: string, id: number, isPin: boolean) => () => {
    setEditUser({ isOpen: true, username: username, id: id, isPin: isPin });
  };

  const onLoginUser = (el: { username: string, id: number, isPin: boolean }) => async () => {
    if (!el.isPin) {
      const { data } = await UserService.loginUser(el.id, 1337);
      localStorage.setItem('userToken', data.token);
      dispatch(fetchAuthUser());
    } else {
      setPinOpen({ ...pinOpen, isOpen: true, userId: el.id });
    }
  };

  return (
    <div className={styles.selectUserContainer}>
      {pinOpen.isOpen && <PinWindow id={pinOpen.userId} onClose={setPinOpen} />}
      <header><NetflixLogo /></header>
      <div className={styles.selectUserWrapper}>
        <h3>{manageUser ? 'Manage Profiles:' : 'Who\'s watching?'}</h3>
        <div className={styles.usersContainer}>
          {accountSelector?.users.map((el, i) =>
            <div className={`${styles.usersWrapper} ${manageUser && styles.usersActiveWrapper}`} key={i}
                 onClick={manageUser ? openEditUser(el.username, el.id, el.isPin) : onLoginUser(el)}>
              {manageUser && <span><Pen /></span>}
              {el.avatar ? <img src={el.avatar} /> : <img
                src={i === 0 ? Avatar0 : i === 1 ? Avatar1 : i === 2 ? Avatar2 : i === 3 ? Avatar3 : i === 4 ? Avatar4 : ''} />}
              <p>{el.username}</p>
              <div className={styles.lockSvg}>
                {el.isPin && <Lock />}
              </div>
            </div>,
          )}
          {accountSelector && accountSelector.users.length <= 4 &&
            <div className={styles.addProfile} onClick={() => setIsCreateUser(true)}>
              <span><AddButton /></span>
              <p>Add Profile</p>
            </div>}
        </div>
        <button
          className={`${manageUser && styles.activeButton}`}
          onClick={onManageUser}>
          {manageUser ? 'DONE' : 'MANAGE PROFILES'}
        </button>
      </div>
    </div>
  );
};

export default SelectUserLayout;