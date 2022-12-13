import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

/**
 * Construção da Tag:
 * <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
 */

//Lista dos itens
const itens = [{label: "Selecionar:"}, {label: "1 - Interestaduais - somente operações sujeitas ao regime da Subst.Tributária"}, 
  {label: "2 - Interestaduais - operações com ou sem Subst.Tributária"},
  {label: "3 - Totalidade das operações do informante"}]

type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTFCodOperacao: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
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