import { TextField, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import { validateHeaderValue } from "http";
import { useEffect, useState } from "react";


type TVTextFieldCnpjCpfProps = TextFieldProps & {
    name: string;
}

export const VTextFieldDocumento: React.FC<TVTextFieldCnpjCpfProps> = ({name, ...rest}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name); 

    const[value, setValue] = useState(defaultValue || '');
    
    

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
            
    }) 
        
    }, [registerField, fieldName, value])

    

  


    return (
        <TextField 
            {...rest}

            error = {!!error}
            helperText={error}
            defaultValue={defaultValue}
            value ={value}
            label = {value.length == 11 ? 'CPF' : value.length == 14 ? 'CNPJ' : "Documento CNPJ / CPF"}
            onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e)}}
            onChange = {e => {setValue(e.target.value); rest.onChange?.(e)}}
        />
    );
};

