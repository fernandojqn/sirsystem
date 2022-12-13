import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

/**
 * Construção da Tag:
 * <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
 */

//Lista dos itens
const itens = [{label: "Selecionar:"}, {label: "1 - Estrutura conforme Portaria CAT-32/96 até CAT-69/01 ( Convênio ICMS 40/01)"}, 
  {label: "2 - Estrutura conforme Portaria CAT-32/96 até CAT-92/02 ( Convênio ICMS 142/02)"},
  {label: "3 - Estrutura conforme Portaria CAT-32/96 na versão atual (Convênio 57/95 atutal)"}]

type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTFCodEstrutura: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
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