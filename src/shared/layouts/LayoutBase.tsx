import { Avatar, Box, Divider, Icon, IconButton, Menu, MenuItem, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ReactNode, useState } from "react";
import { useDrawerContext } from "../contexts";

//configurações usuario
const settings = ['Conta', 'Sobre', 'Sair'];

interface ILayoutBaseProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> =({children, titulo, barraDeFerramentas}) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const {toggleDrawerOpen} = useDrawerContext();

    //Configurações usuario
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }; 
         

    return (
        <Box  height="100%" display="flex" flexDirection="column" gap={1}>
            <Box bgcolor={theme.palette.primary.main} padding={2} display="flex" alignItems="center" gap={2}
                 height={theme.spacing(3)} >
                                
                {mdDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon> menu </Icon>
                    </IconButton>
                )}
                
                <Typography color={theme.palette.primary.contrastText} 
                    variant={mdDown ? 'h6' : 'h5'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    >
                       <strong>{titulo}</strong>  
                </Typography>

                <Box flex={1} display="flex" gap={1} justifyContent="end"> 

                    <Divider orientation="vertical" variant="middle" flexItem />

                    <Tooltip title="Configurações">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Avatar" src="./2.jpg" />
                        </IconButton>
                    </Tooltip>
                
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                <Divider orientation="horizontal" variant="middle" />
                            </MenuItem>
                        ))}
                    </Menu>
                
                </Box>

            </Box>
                        
            {barraDeFerramentas && 
                (<Box >
                    {barraDeFerramentas}
                </Box>
            )}

            
            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
};