import { AppRegistrationRounded, ExpandLess, ExpandMore, Laptop, PermDataSetting, StarBorder, Summarize } from "@mui/icons-material";
import { Box, Collapse, Icon, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useMediaQuery, useTheme } from "@mui/material";
import { on } from "events";
import React from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { useAppThemeContext, useDrawerContext } from "../../contexts";

{/* Botões navegaveis */}
interface IListItemLinkProps {
    label: string;
    to: string;
    onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({ label, to, onClick }) => {
    const navigate = useNavigate();
    
    {/* Marcar botão da pagina */}
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false});
    
    
    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton sx={{ pl: 4 }} selected={!!match} onClick={handleClick}>
                    <ListItemText primary= {label} />
        </ListItemButton>
    );
}


{/* Aplicação */}
export default function MenuLista() {
    const theme = useTheme();
    {/* Drawer responsivel */}
    const{  toggleDrawerOpen } = useDrawerContext();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
                
                <ListItemLink 
                    label = 'Atividades' 
                    to ='/pagina-inicial'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Clientes' 
                    to ='/clientes'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Empresa' 
                    to ='/empresa'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Fornecedores' 
                    to ='/fornecedores'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />

                <ListItemLink 
                    label = 'Produtos' 
                    to ='/produtos'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Usuários' 
                    to ='/usuarios'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Vendedores' 
                    to ='/vendedores'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Transportadoras' 
                    to ='/fornecedores'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />

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
                
            <ListItemLink 
                    label = 'Entrada de compras' 
                    to ='/entrada-de-compras'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Pedido de vendas' 
                    to ='/pedidos-de-vendas'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Ordem de serviço' 
                    to ='/ordem-de-serviço'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
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
                
                <ListItemLink 
                    label = 'Eventário de produtos' 
                    to ='/eventario-de-produtos'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Extrato de comissões' 
                    to ='/extrato-de-comissoes'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Conciliação financeira' 
                    to ='/conciliacao-financeira'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
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
                
            <ListItemLink 
                    label = 'Master' 
                    to ='/master'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Mudar senha' 
                    to ='/mudar-senha'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
                <ListItemLink 
                    label = 'Sobre' 
                    to ='/sobre'
                    onClick = {smDown ? toggleDrawerOpen : undefined} 
                />
                
            </List>
            </Collapse>

        </List>
      </Box>
    );
  }