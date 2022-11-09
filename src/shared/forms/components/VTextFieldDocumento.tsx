import { TextField, TextFieldProps } from "@mui/material";

import { useField } from "@unform/core";
import { useEffect, useState } from "react";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

type TVTextFieldCnpjCpfProps = TextFieldProps & {
    name: string;
}

export const VTextFieldDocumento: React.FC<TVTextFieldCnpjCpfProps> = ({name, ...rest}) => {
    const {fieldName, registerField, defaultValue, error, clearError} = useField(name); 

    const[value, setValue] =useState(defaultValue || '');

    const [cpfCnpj, setCpfCnpj] = useState("");
    const [mask, setMask] = useState("");

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
    }) 
    }, [registerField, fieldName, value])


    return (
        <CpfCnpj 
            {...rest}

            error = {!!error}
            helperText={error}
            defaultValue={defaultValue}
            value ={value}
            
            

        />
    );
};

//onKeyDown={(e) => {error && clearError(); rest.onKeyDown?.(e)}}
//onChange = {e => {setValue(e.target.value); rest.onChange?.(e)}}