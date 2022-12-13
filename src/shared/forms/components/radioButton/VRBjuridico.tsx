/**
 * Radio Button 2 opções, tag:
 *  <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
 *      <Typography marginRight={1}> Optante pelo Simples Nacional: </Typography>
        <VRadioButton2 name="simplesNasc" />
    </Grid>
 */

import { FormControl, FormControlLabel, Radio, RadioGroup, TextField, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import { ChangeEvent, useEffect, useState } from "react";


type TVTextFieldProps = {
    name: string;
}

export const VRBjuridico: React.FC<TVTextFieldProps> = ({name, ...rest}) => {
    
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
                <FormControlLabel name='sim' value="sim" control={<Radio value="sim" size="small" />} label="Juridica" />
                <FormControlLabel name='nao' value="nao" control={<Radio size="small" />} label="Fisica" />
            </RadioGroup>
        </FormControl>
                
    );
};