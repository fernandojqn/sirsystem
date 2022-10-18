import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDeDetalhesProps {
    textoBotaoNovo?: string;
    
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;

    aoClicarBotaosalvar?: () => void;
    aoClicarBotaoSalvarEVoltar?: () => void;
    aoClicarBotaoApagar?: () => void;
    aoClicarBotaoNovo?: () => void;
    aoClicarBotaoVoltar?: () => void;
}

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
        textoBotaoNovo = 'Novo', mostrarBotaoSalvar: mostrarBotaoSalvar = true, mostrarBotaoSalvarEVoltar = true,
        mostrarBotaoApagar = true, mostrarBotaoNovo = true, mostrarBotaoVoltar = true,
        aoClicarBotaosalvar, aoClicarBotaoSalvarEVoltar, aoClicarBotaoApagar,
        aoClicarBotaoNovo, aoClicarBotaoVoltar
}) => {

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

            { mostrarBotaoSalvar && (
                <Button 
                        color="primary"
                        disableElevation
                        variant="contained"
                        startIcon={<Icon>save</Icon>}
                        onClick={aoClicarBotaosalvar}
                        > 
                            Salvar
                </Button>
            )}
            
            { mostrarBotaoSalvarEVoltar && (
                <Button 
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarBotaoSalvarEVoltar}
                    > 
                        Salvar e voltar
                </Button>
            )}
            
            { mostrarBotaoApagar && (
                <Button 
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarBotaoApagar}
                    > 
                        Apagar
                </Button>
            )}
            
            { mostrarBotaoNovo && (
                <Button 
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarBotaoNovo}
                    > 
                        {textoBotaoNovo}
                </Button>
            )}
            
            { mostrarBotaoVoltar && (
            <Divider orientation="vertical" variant="middle" />
            )}

            { mostrarBotaoVoltar && (
                <Button 
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarBotaoVoltar}
                    > 
                        Voltar
                </Button>
            )}
            
        </Box>
    )
}