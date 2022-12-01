import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { AtividadesServices } from "../../../shared/services/api/atividades/AtividadesServices";


type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteAtividadesProps {
    isExternalLoading?: boolean;
  }

export const AutoCompleteAtividades: React.FC<IAutoCompleteAtividadesProps> = ({isExternalLoading = false}) => {
    const { fieldName, registerField, defaultValue, error, clearError } = useField('ativ'); //mudar
    const [isLoading, setIsLoading] = useState(false);
    const { debounce } = useDebounce();
    const [busca, setBusca] = useState('');

    const [options, setOptions] = useState<TAutoCompleteOption[]>([])
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    useEffect(() => {
        registerField({
          name: fieldName,
          getValue: () => selectedId,
          setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
      }, [registerField, fieldName, selectedId]);

    useEffect(() => {
        setIsLoading(true);
            debounce(() => {
                AtividadesServices.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if(result instanceof Error) {
                        //alert(result.message);
                    } else {
                        console.log(result);

                        setOptions(result.data.map(atividade => ({id: atividade.id, label: atividade.atividade}))); 
                    }

                });
            });

    }, [busca]);
    

    //Para salvar o ID 
    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;
    
        const selectedOption = options.find(option => option.id === selectedId);
        if (!selectedOption) return null;

        return selectedOption;
    }, [selectedId, options]);



    return (
        <Autocomplete 
            openText='Abrir'
            closeText='Fechar'
            clearText="Linpar"
            noOptionsText='Sem opções'
            loadingText='Carregando...'

            disablePortal

            loading={isLoading}
            popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined}
            onInputChange={(_, newValue) => setBusca(newValue)} //já altera quando digita, puxando as atividades
            onChange={(_, newValue) => {setSelectedId(newValue?.id); setBusca(''); clearError();}} //texto escrito, para pegar o nome na hora de salvar a tela
            value={autoCompleteSelectedOption}
            disabled={isExternalLoading}
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    size="small"
                    label="Atividades"

                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )
}