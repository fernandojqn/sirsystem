import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

/**
 * Construção da Tag:
 * <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
 */

//Lista dos itens
const itens = [{label: "Selecionar:"}, {label: "0 - Industrial"}, {label: "1 - Prestador de Serviços"}, {label: "2 - Atividade de Comércio"},
  {label: "3 - Atividade Financeira"}, {label: "4 - Atividade Imobiliária"}, {label: "9 - Outros"}]

type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTFCodNatureza: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
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