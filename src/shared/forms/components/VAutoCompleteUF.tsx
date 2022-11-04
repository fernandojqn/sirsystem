import { Autocomplete, AutocompleteProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";


const estados = [ "Acre (AC)", "Alagoas (AL)", "Amapá (AP)", "Amazonas (AM)", "Bahia (BA)",
    "Ceará (CE)", "Distrito Federal (DF)", "Espírito Santo (ES)", "Goiás (GO)", "Maranhão (MA)",
    "Mato Grosso (MT)", "Mato Grosso do Sul (MS)", "Minas Gerais (MG)", "Pará (PA)", "Paraíba (PB)",
    "Paraná (PR)", "Pernambuco (PE)", "Piauí (PI)", "Rio de Janeiro (RJ)", "Rio Grande do Norte (RN)",
    "Rio Grande do Sul (RS)", "Rondônia (RO)", "Roraima (RR)", "Santa Catarina (SC)", "São Paulo (SP)",
    "Sergipe (SE)", "Tocantins (TO)"
]

type TVAutoComplete = AutocompleteProps & {
    nome: string;
};



export const VAutoComplete: React.FC<TVAutoComplete> = ({nome}) => {
    const {fieldName, registerField, defaultValue} = useField(nome);

    const[value, setValue] =useState(defaultValue || '');

    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => value,
            setValue: (_, newValue) => setValue(newValue),
    }) 
    }, [registerField, fieldName, value])

    return (
        <Autocomplete 

            defaultValue={defaultValue}
            value ={value}
            
            
            
        />
    );
};
