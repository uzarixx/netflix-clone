import React, { FC } from 'react';
import PinInput from 'react-pin-input';

interface props {
  setPin: (s: string) => void;
}

const PinInputComponent: FC<props> = ({ setPin }) => {
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
        borderColor: 'white',
        color: 'white',
        fontSize: '40px',
        width: '90px',
        height: '90px',
        margin: '10px',
      }}
      inputFocusStyle={{
        borderColor: 'white',
        color: 'white',
        fontSize: '40px',
        width: '90px',
        height: '90px',
        scale: '1.1',
      }}
      autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
    />

  );
};

export default PinInputComponent;