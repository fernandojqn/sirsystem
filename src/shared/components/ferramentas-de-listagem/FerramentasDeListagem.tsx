import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material"

interface IFerramentasDeListagemProps {
    //label
    textoDaBusca?: string;
    mostrarInputBusca?: boolean;
    aoMudarTextoDaBusca?: (novoTexto: string) => void;
    //Botao
    textoDoBotaoNovo?: string;
    mostrarBotaoNovo?: boolean;
    aoClicarNoBotaoNovo?: () => void;
}



export const FerramentasDeListagem: React.FC<IFerramentasDeListagemProps> = (
    { textoDaBusca = '', mostrarInputBusca = false, aoMudarTextoDaBusca,
    textoDoBotaoNovo='Novo', mostrarBotaoNovo = true, aoClicarNoBotaoNovo}
    ) => {

    const theme = useTheme();

    return (
        <Box 
            component={Paper}
            height={theme.spacing(5)} 
            marginX={1} 
            padding={1} 
            display="flex"
            gap={1}
            alignItems="center"
            elevation={3}
            >
            

            {mostrarInputBusca && 
                (<TextField 
                size="small"
                placeholder="Pesquisar..."
                value={textoDaBusca}
                onChange={(e) => aoMudarTextoDaBusca?.(e.target.value)}
                />)}
             
            
            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button 
                    color="primary"
                    disableElevation
                    variant="contained"
                    endIcon={<Icon>add</Icon>}
                    onClick={aoClicarNoBotaoNovo}
                    > 
                        {textoDoBotaoNovo}
                    </Button>
                )}
                
            </Box>
        </Box>
    )
}