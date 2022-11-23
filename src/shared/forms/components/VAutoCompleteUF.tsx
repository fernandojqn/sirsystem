import { TextField, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import { useEffect, useState } from "react";


type TVAutoCompleteUFProps = TextFieldProps & {
    name: string;
}



export const VAutoCompleteUF: React.FC<TVAutoCompleteUFProps> = ({name, ...rest}) => {
    
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name); 

    const[value, setValue] =useState(defaultValue || '');

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
            onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e)}}

            defaultValue={defaultValue}
            
            value ={value}
            onChange = {e => {setValue(e.target.value); rest.onChange?.(e)}}

        />
    );
};