import { Image, Margin } from "@mui/icons-material";
import { Avatar, Box, Divider, Drawer, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../../contexts";
import MenuLista from "../menu-lista/MenuLista";


interface IMenuLateral {
    children: React.ReactNode
}

//React.fc é um componente funcional, é para quando eu quiser colocar ele dentro de algo, pagina
export const MenuLateral: React.FC<IMenuLateral> = ({children}) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    {/* Drawer responsivel */}
    const{ isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

    return(
        <> {/* Fragment, drawer primeiro e o filho que seria a pagina depois, por isso que tem o fragment */}
            
            {/* Menu Lateral */}
            <Drawer open={isDrawerOpen} variant={mdDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box width={theme.spacing(28)} >
                    
                    <Box width='90%' height={theme.spacing(5)} display='flex' alignItems= 'left' 
                        justifyContent='left' padding={theme.spacing(1)}>

                        {/* <Avatar alt="L" sx={{height: theme.spacing(5), width: theme.spacing(5)}} 
                                src='./../../images/icons/iconSOS.jpg' />  */}
                        <Avatar alt="L" sx={{height: theme.spacing(5), width: theme.spacing(5)}} 
                                src='./../../images/icons/iconSOS.jpg' /> 
                    
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ width: theme.spacing(2)}}/>

                        <Box>
                            <Box>
                                <Typography mt={0} sx={{ width: theme.spacing(10), paddingLeft: theme.spacing(1)}}
                                ><strong>Sir System</strong></Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ width: theme.spacing(13), paddingLeft: theme.spacing(1)}}
                                >version: 0.1.2</Typography>
                            </Box>
                        </Box>
                    </Box>
                    
                    <Divider  flexItem />    

                    <MenuLista />  
                
                </Box>
            </Drawer>
            
            {/* parte da direita onde vai receber as telas de cadastros */}
            <Box height='100vh' marginLeft={mdDown ? 0 : theme.spacing(28)}>
                {children}
            </Box>
        </>
    );
}