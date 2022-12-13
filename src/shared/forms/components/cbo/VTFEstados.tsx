import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

/**
 * Construção da Tag:
 * <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
 */

//Lista dos estados
const itens = [{label: 'AC'}, {label: 'AL'}, {label: 'AP'}, {label: 'AM'}, {label: 'BA'}, {label: 'CE'}, {label: 'DF'}, {label: 'ES'},
    {label: 'GO'}, {label: 'MA'}, {label: 'MT'}, {label: 'MS'}, {label: 'MG'}, {label: 'PA'}, {label: 'PB'}, {label: 'PR'}, {label: 'PE'},
    {label: 'PI'}, {label: 'RJ'}, {label: 'RN'}, {label: 'RS'}, {label: 'RO'}, {label: 'RR'}, {label: 'SC'}, {label: 'SP'}, {label: 'SE'},
    {label: 'TO'},]


type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTFEstados: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

  const [value, setValue] = useState(defaultValue || '');


  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);


  return (
    <TextField
      {...rest}
      
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      select 
      value={value}
      onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
      onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
    >
      
      {itens.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}

    </TextField>
  );
};