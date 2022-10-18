import { ForkRight } from "@mui/icons-material";
import { Avatar, Box, Divider, Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import {yellow} from "@mui/material/colors";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseProps {
    children: React.ReactNode;
    titulo: string;
    barraDeFerramentas?: ReactNode;
}

export const LayoutBase: React.FC<ILayoutBaseProps> =({children, titulo, barraDeFerramentas}) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    
    const {toggleDrawerOpen} = useDrawerContext();

    return (
        <Box  height="100%" display="flex" flexDirection="column" gap={1}>
            <Box bgcolor={yellow[500]} padding={2} display="flex" alignItems="center" gap={2}
                 height={theme.spacing(3)}>
                
                
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon> menu </Icon>
                    </IconButton>
                )}
                
                <Typography 
                    variant={smDown ? 'h6' : 'h5'}
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis" > {titulo} </Typography>

                
                <Divider 
                
                orientation="vertical" variant="middle" flexItem />
                    
                <Avatar 
                        alt="A" sx={{height: theme.spacing(5), width: theme.spacing(5)}} 
                        src='./../../images/icons/iconSOS.jpg' />
                    
            </Box>
                        
            {barraDeFerramentas && 
                (<Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    );
};