import React, { useCallback, useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { PatternFormatProps, PatternFormat } from 'react-number-format';
import { useField } from '@unform/core';
import { Label } from '@mui/icons-material';
import { getValue } from '@mui/system';
import _ from 'lodash';


type TVTextFieldProps = Omit<PatternFormatProps, 'value' | 'format'> & Omit<TextFieldProps, 'value'> & {
  name: string;

  onValueChange?: (value: string) => void;
}
/**
 * - Para resgatar o valor numérico no correto use o `onValueChange`
 * - Para eventos normais use o `onChange`
 *
 * Para como customizar a formatação verifique a documentação original do `react-number-format` [nesse link](https://www.npmjs.com/package/react-number-format) ou [nesse link](https://s-yadav.github.io/react-number-format/docs/intro/)
 */
export const VPFdocumento: React.FC<TVTextFieldProps> = ({ name, onValueChange, ...rest }) => {
  const { fieldName, defaultValue, registerField, error } = useField(name);
  const [value, setValue] = useState<string>(defaultValue || '');

  const [lbl, setLbl] = useState<string>('Documento');
  const [mask, setMask] = useState<string>('##.###.###/####-##' || "###.###.###-##");
  const [tamanho, setTamanho] = useState<number>(0);

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

    setTamanho(value.length);

  };

   return (
    <PatternFormat
      {...rest as any}

      label={lbl}
      format={mask}
      
      size='small'
      customInput={TextField}
      value={value}
      error={!!error}
      helperText={error}
      onValueChange={({ value }) => handleChange(value)}
    />
  );
  
};
