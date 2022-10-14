import { AppRegistrationRounded, ExpandLess, ExpandMore, Laptop, PermDataSetting, StarBorder, Summarize } from "@mui/icons-material";
import { Box, Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme } from "@mui/material";
import React from "react";
import { useAppThemeContext } from "../../contexts";

export default function MenuLista() {
    const theme = useTheme();
    const { toggleTheme } = useAppThemeContext();

    const [openCadastro, setOpenCadastro] = React.useState(false);
    const handleClickCadastro = () => { setOpenCadastro(!openCadastro); };
  
    const [openOperacoes, setOpenOperacoes] = React.useState(false);
    const handleClickOperacoes = () => { setOpenOperacoes(!openOperacoes); };

    const [openRelatorios, setOpenRelatorios] = React.useState(false);
    const handleClickRelatorios = () => { setOpenRelatorios(!openRelatorios); };

    const [openOpcoes, setOpenOpcoes] = React.useState(false);
    const handleClickOpcoes = () => { setOpenOpcoes(!openOpcoes); };

    return (
      <Box>
        <List component="nav" >
            {/* Cadastro */}
            <ListItemButton onClick={handleClickCadastro}>
                <ListItemIcon >
                    <AppRegistrationRounded />
                </ListItemIcon>
                <ListItemText primary="Cadastros" />
                {openCadastro ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openCadastro} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Atividades" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Clientes" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Empresa" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Fornecedores" />
                </ListItemButton>
    
                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Produtos" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Usuarios" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Vendedores" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Transportadores" />
                </ListItemButton>
            </List>
            </Collapse>

            {/* Operações */}
            <ListItemButton onClick={handleClickOperacoes}>
                <ListItemIcon >
                    <Laptop />
                </ListItemIcon>
                <ListItemText primary="Operações" />
                {openOperacoes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openOperacoes} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>
                
            <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Entrada de compras" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Pedido de vendas" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Ordem de serviços" />
                </ListItemButton>
                   
            </List>
            </Collapse>

            {/* Relatorios */}
            <ListItemButton onClick={handleClickRelatorios}>
                <ListItemIcon >
                    <Summarize />
                </ListItemIcon>
                <ListItemText primary="Relatórios" />
                {openRelatorios ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openRelatorios} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>
                
            <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Eventário de produtos" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Extrato de comissões" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Conciliação financeira" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="historioco de pagamentos" />
                </ListItemButton>
                    
            </List>
            </Collapse>

            {/* Opções */}
            <ListItemButton onClick={handleClickOpcoes}>
                <ListItemIcon >
                    <PermDataSetting />
                </ListItemIcon>
                <ListItemText primary="Opções" />
                {openOpcoes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            
            <Collapse in={openOpcoes} timeout="auto" unmountOnExit>
            
            <List component="div" disablePadding>
                
            <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="Master" />
                </ListItemButton>
                
                <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary="Mudar senha" />
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }} onClick={toggleTheme}>
                    <ListItemText primary="sobre" />
                </ListItemButton>
                
                    
            </List>
            </Collapse>

        </List>
      </Box>
    );
  }