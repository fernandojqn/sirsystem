import { Box, Button, ButtonGroup, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material";



interface IFerramentasDeDetalhesProps {
    textoBotaoNovo?: string;
    
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;

    carregandoBotaoSalvar?: boolean;
    carregandoBotaoSalvarEVoltar?: boolean;
    carregandoBotaoApagar?: boolean;
    carregandoBotaoNovo?: boolean;
    carregandoBotaoVoltar?: boolean;

    aoClicarBotaosalvar?: () => void;
    aoClicarBotaoSalvarEVoltar?: () => void;
    aoClicarBotaoApagar?: () => void;
    aoClicarBotaoNovo?: () => void;
    aoClicarBotaoVoltar?: () => void;
}



export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
        textoBotaoNovo = 'Novo', mostrarBotaoSalvar: mostrarBotaoSalvar = true, mostrarBotaoSalvarEVoltar = true,
        mostrarBotaoApagar = true, mostrarBotaoNovo = true, mostrarBotaoVoltar = true,
        carregandoBotaoSalvar = false, carregandoBotaoSalvarEVoltar = false, carregandoBotaoApagar = false,
        carregandoBotaoNovo = false, carregandoBotaoVoltar = false,
        aoClicarBotaosalvar, aoClicarBotaoSalvarEVoltar, aoClicarBotaoApagar,
        aoClicarBotaoNovo, aoClicarBotaoVoltar
}) => {

    const theme = useTheme();
    const xsDown =useMediaQuery(theme.breakpoints.down('xs')); // até 600
    const smDown =useMediaQuery(theme.breakpoints.down('sm')); // até 900
    const dmDown =useMediaQuery(theme.breakpoints.down('md')); // até 1200

    return (
        <Box 
            component={Paper}
            height={dmDown? theme.spacing(4) : theme.spacing(5)} 
            marginX={1} 
            padding={1} 
            display="flex"
            gap={1}
            alignItems="center"
            elevation={3}
            >

            {(mostrarBotaoSalvar && !carregandoBotaoSalvar) && (
                <Button 
                size={dmDown ? "small" : "medium"}
                    color="primary"
                    disableElevation
                    variant={"contained"}
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarBotaosalvar}
                > 
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Salvar 
                    </Typography>
                </Button>
            )}
            {(carregandoBotaoSalvar) && (<Skeleton width={108} height={60}/>)}

           {( mostrarBotaoSalvarEVoltar && !carregandoBotaoSalvarEVoltar && !smDown && !dmDown) && (
                <Button 
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>save</Icon>}
                    onClick={aoClicarBotaoSalvarEVoltar}
                > 
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Salvar e voltar
                    </Typography>
                </Button>
            )}
            {(carregandoBotaoSalvarEVoltar && !smDown && !dmDown) && (<Skeleton width={180} height={60}/>)}
           
            {(mostrarBotaoApagar && !carregandoBotaoApagar) && (
                <Button 
                    size={dmDown? "small" : "medium"}
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>delete</Icon>}
                    onClick={aoClicarBotaoApagar}
                    > 
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Apagar
                    </Typography>
                </Button>
            )}
            {(carregandoBotaoApagar) && (<Skeleton width={108} height={60}/>)}
          
            {( mostrarBotaoNovo && !carregandoBotaoNovo) && (
                <Button 
                    size={dmDown? "small" : "medium"}
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>add</Icon>}
                    onClick={aoClicarBotaoNovo}
                    > 
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                    {textoBotaoNovo}
                    </Typography>                        
                </Button>
            )}
            {(carregandoBotaoNovo) && (<Skeleton width={108} height={60}/>)}

            { (mostrarBotaoVoltar || carregandoBotaoVoltar) && (
                <Divider orientation="vertical" variant="middle" />
            )}

            { (mostrarBotaoVoltar && !carregandoBotaoVoltar) && (
                <Button 
                    size={dmDown? "small" : "medium"}
                    color="primary"
                    disableElevation
                    variant="outlined"
                    startIcon={<Icon>arrow_back</Icon>}
                    onClick={aoClicarBotaoVoltar}
                    > 
                    <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                        Voltar
                    </Typography>
                </Button>
            )}
            {carregandoBotaoVoltar && (<Skeleton width={108} height={60}/>)}

        </Box>
    )
}