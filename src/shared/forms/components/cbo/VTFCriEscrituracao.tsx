import { useEffect, useState } from 'react';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

/**
 * Construção da Tag:
 * <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
 */

//Lista dos estados
const itens = [{label: "Selecionar:"}, {label: "1 - Regime Caixa"},
  {label: "2 - Regime de Competencia (consolidada)"},
  {label: "3 - Regime de Competencia (detalhada)"}]


type TVTextFieldProps = TextFieldProps & {
  name: string;
}
export const VTFCriEscrituracao: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
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