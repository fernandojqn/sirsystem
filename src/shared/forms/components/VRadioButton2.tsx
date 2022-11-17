/**
 * Radio Button 2 opções
 */

import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import { ChangeEvent, useEffect, useState } from "react";


type TVTextFieldProps = {
    name: string;
}

export const VRadioButton2: React.FC<TVTextFieldProps> = ({name, ...rest}) => {
    
    const {fieldName, registerField, defaultValue} = useField(name); 

    const[value, setValue] =useState(defaultValue || '');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
    }) 
    }, [registerField, fieldName, value])


    const radioHandlerSN = (event: ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    }

    return (
        <FormControl>
            <RadioGroup {...rest} row  defaultValue={defaultValue} value={value} onChange={radioHandlerSN}>
                <FormControlLabel name='sim' value="sim" control={<Radio value="sim" size="small" />} label="Sim" />
                <FormControlLabel name='nao' value="nao" control={<Radio size="small" />} label="Não" />
            </RadioGroup>
        </FormControl>
                
    );
};