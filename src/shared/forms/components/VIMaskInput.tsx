import React, { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';
import { IMaskInput  } from 'react-imask';
import { IMaskInputProps, IMaskMixinProps } from 'react-imask/dist/mixin';


type TVTextFieldProps = TextFieldProps & Omit<IMaskInputProps, 'value'> &  IMaskMixinProps & {
  name: string;

  onValueChange?: (value: string) => void;
}
/**
 * - Para resgatar o valor numérico no correto use o `onValueChange`
 * - Para eventos normais use o `onChange`
 */

export const VIMaskInput: React.FC<TVTextFieldProps> = ({ name, onValueChange, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState<string>(defaultValue );


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, value) => setValue(value),
    });
  }, [fieldName, value, registerField]);


  const handleChange = (value: string) => {
    setValue(value);
    onValueChange && onValueChange(value);
    
  };

  //IMaskInput
  return (
    <IMaskInput
      {...rest as any}
      customInput={TextField}
      variant="outlined" 
      unmask={true}

      value={value}
      error={!!error}
      helperText={error}
      onValueChange={() => handleChange(value)}
    />
  );
};
