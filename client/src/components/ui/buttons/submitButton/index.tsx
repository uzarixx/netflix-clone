import React, { FC } from 'react';
import styles from './SubmitButton.module.scss';

interface props {
  children: React.ReactNode;
  type: 'submit';
}

const SubmitButton: FC<props> = ({ children, type }) => {
  return (
    <button type={type} className={styles.button}>{children}</button>
  );
};

export default SubmitButton;