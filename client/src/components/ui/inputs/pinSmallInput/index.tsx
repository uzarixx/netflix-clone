import React, { FC } from 'react';
import PinInput from 'react-pin-input';

interface props {
  setPin: (s: string) => void;
}

const PinSmallInput: FC<props> = ({ setPin }) => {
  return (
    <PinInput
      length={4}
      initialValue=''
      secret
      onChange={(value: string) => setPin(value)}
      secretDelay={100}
      type='numeric'
      inputMode='number'
      style={{ padding: '10px', margin: '10px' }}
      inputStyle={{
        borderColor: 'black',
        color: 'black',
        fontSize: '13px',
        width: '20px',
        height: '20px',
        margin: '5px',
      }}
      inputFocusStyle={{
        borderColor: 'black',
        color: 'black',
        fontSize: '13px',
        width: '20px',
        height: '20px',
      }}
      autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
    />

  );
};

export default PinSmallInput;