import React, { FC } from 'react';
import styles from './AddUser.module.scss';
import Avatar from '../../../../assets/png/avatar-4.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationCreateUser } from '../../../../utils/validation/validationCreateUser';
import UserService from '../../../../services/fetchServices/userFetch';
import { useAppDispatch } from '../../../../store/store';
import { fetchAuthAccount } from '../../../../store/counter/userSlice';

interface Inputs {
  username: string;
}

interface props {
  onClose: (val: boolean) => void;
}

const AddUser: FC<props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit} = useForm<Inputs>({
    resolver: yupResolver(validationCreateUser),
  });
  const onSubmit: SubmitHandler<Inputs> = async (props) => {
    try {
      await UserService.createUser(props.username);
      dispatch(fetchAuthAccount());
      onClose(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.addUserContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.addUserWrapper} autoComplete={'off'}>
        <div className={styles.title}>
          <h3>Add Profile</h3>
          <h5>Add a profile for another person watching Netflix</h5>
        </div>
        <div className={styles.userCreate}>
          <img src={Avatar} />
          <input type={'search'} role={'presentation'} autoComplete={'new-password'}
                 placeholder={'Name'} {...register('username')} />
        </div>
        <div className={styles.buttons}>
          <button className={styles.submitButton} type={'submit'}>CONTINUE</button>
          <button className={styles.submitReset} type={'reset'} onClick={() => onClose(false)}>CANCEL</button>
        </div>
      </form>
    </div>
  );
};
export default AddUser;