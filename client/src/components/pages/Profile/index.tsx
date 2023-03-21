import { FC } from 'react';
import styles from './Profile.module.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';
import Avatar from '../../../assets/png/avatar-1.png';
import { useOnClickTwoFactor } from './functions/useOnClickTwoFactor';
import { useProfileLock } from './functions/useProfileLock';
import PinSmallInput from '../../ui/inputs/pinSmallInput';

const Profile: FC = () => {
  const account = useAppSelector((root) => root.userSlice.account);
  const user = useAppSelector((root) => root.userSlice.user);
  const { checked, sendMessage, onClickTwoFactor } = useOnClickTwoFactor(account?.twoFactor);
  const { changePin, onClickSetPin, onClickRemovePin, setPin, onClickUpdatePin } = useProfileLock();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}><h1>Account</h1></div>
        <div className={styles.security}>
          <h2>membership & billing</h2>
          <Link to={'/password'}>Change password</Link>
        </div>
        <div className={styles.security}>
          <h2>two factor authentication</h2>
          {sendMessage ? <p>We have sent a message to your email</p> :
            <input type='checkbox' checked={checked} onChange={onClickTwoFactor} />
          }
        </div>
        <div className={styles.profile}>
          <h2>profile</h2>
          <div className={styles.profileSettings}>
            <div className={styles.left}>
              <img src={Avatar} alt={'avatar'} />
              <p>{user?.username}</p>
            </div>
            <div className={styles.right}>
              {user?.isPin ?
                <button onClick={onClickRemovePin}>Remove profile lock</button> :
                <>
                  {changePin ?
                    <div className={styles.pinWrapper}>
                      <PinSmallInput setPin={setPin} />
                      <button onClick={onClickUpdatePin}>Save pin</button>
                    </div> :
                    <button onClick={onClickSetPin}>Profile lock</button>
                  }
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;