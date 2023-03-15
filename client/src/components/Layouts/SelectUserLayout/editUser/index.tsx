import React, { FC, useEffect, useState } from 'react';
import styles from './EditUser.module.scss';
import Avatar from '../../../../assets/png/avatar-4.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationCreateUser } from '../../../../utils/validation/validationCreateUser';
import UserService from '../../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../../store/store';
import { fetchAuthAccount } from '../../../../store/counter/userSlice';
import PinInput from 'react-pin-input';

interface Inputs {
  username: string;
}

interface props {
  onClose: (value: { isOpen: boolean, username: string, id: number, isPin: boolean }) => void;
  editUser: { isOpen: boolean, username: string, id: number, isPin: boolean };
}

const EditUser: FC<props> = ({ onClose, editUser }) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    resolver: yupResolver(validationCreateUser),
  });

  useEffect(() => {
    setValue('username', editUser.username);
  }, [editUser.username]);

  const closeUpdateUser = () => {
    dispatch(fetchAuthAccount());
    onClose({ ...editUser, isOpen: false });
  };
  const onSubmit: SubmitHandler<Inputs> = async (props) => {
    try {
      await UserService.updateUser(props.username, editUser.id);
      closeUpdateUser();
    } catch (e) {
      console.log(e);
    }
  };
  const onDeleteUser = async () => {
    await UserService.deleteUser(editUser.id);
    closeUpdateUser();
  };
  const onCheckedPin = () => {
    setChecked(!checked);
    onClose({ ...editUser, isPin: !editUser.isPin });
  };
  const onUpdatePin = async () => {
    if (editUser.isPin) {
      if (pin.length === 4) {
        await UserService.updatePin(editUser.id, Number(pin));
        closeUpdateUser();
      } else {
        setPinError('Pin is not correct');
      }
    } else {
      await UserService.deletePin(editUser.id);
      closeUpdateUser();
    }
  };
  return (
    <div className={styles.editUserContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addUserWrapper} autoComplete={'off'}>
        <div className={styles.title}>
          <h3>Edit Profile</h3>
        </div>
        <div className={styles.userUpdate}>
          <img src={Avatar} />
          <input type={'search'} role={'presentation'} autoComplete={'new-password'}
                 placeholder={'Name'} {...register('username')} />
        </div>
        <div className={styles.editPin}>
          <h4>Profile Lock</h4>
          <div>
            <div
              className={styles.checkbox}
              onClick={onCheckedPin}>
              <span>{editUser.isPin && <span></span>}</span>
              <p>Require a pin to access {editUser.username} profile</p>
            </div>
            {editUser.isPin && <PinInput
              length={4}
              initialValue=''
              secret
              secretDelay={100}
              onChange={(value) => {
                setPin(value);
              }}
              type='numeric'
              inputMode='number'
              style={{ padding: '5px 0', marginTop: '10px' }}
              inputStyle={{ borderColor: 'white', color: 'white', width: '20px', height: '20px' }}
              inputFocusStyle={{ borderColor: 'white', color: 'white' }}
              autoSelect={true}
              regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
            />}
          </div>
          {pinError && pin.length <= 3 && <p>{pinError}</p>}
          <button className={styles.submitButton} type={'button'} onClick={onUpdatePin}>SAVE</button>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.submitButton}
            type={'submit'}>
            SAVE
          </button>
          <button
            className={styles.submitReset}
            type={'reset'}
            onClick={() => onClose({ ...editUser, isOpen: false })}>
            CANCEL
          </button>
          <button
            className={styles.submitReset}
            onClick={onDeleteUser}>
            DELETE PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditUser;