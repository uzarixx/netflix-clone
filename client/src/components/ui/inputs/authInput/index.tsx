import React, { FC } from 'react';
import styles from './AuthInput.module.scss';
import { useFormContext } from 'react-hook-form';

interface props {
  placeholder: string;
  name: string;
  type?: string;
  error?: { [key: string]: any } | undefined;
  value: string;
}

const FormInput: FC<props> = ({ placeholder, name, type, error, value }) => {
  const { register } = useFormContext();
  return (
    <div className={styles.inputWrapper}>
      <input className={`${styles.input} ${error && error[name]?.message && styles.errorActive}`}
             type={type || 'text'} {...register(name)} id={placeholder + name} />
      <label className={`${value && styles.labelActive}`} htmlFor={placeholder + name}>{placeholder}</label>
      {error && <p className={styles.error}>{error && error[name]?.message}</p>}
    </div>
  );
};

export default FormInput;