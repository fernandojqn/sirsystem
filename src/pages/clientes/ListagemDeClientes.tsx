import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { FerramentasDeListagem } from "../../shared/components"
import { Environment } from "../../shared/enviroments";
import { useDebounce } from "../../shared/hooks";
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices, IListagemClientes } from "../../shared/services/api/clientes/ClientesServices";



export const ListagemDeClientes: React.FC = () => {
    // searchparams joga o texto na url
    const[searchParams, setSearchParams] = useSearchParams();
    // delay na escrita
    const { debounce } = useDebounce(500, true); //tempo do delay e notDelayInFirstTime
    // Navegar detalhe clientes
    const navigate = useNavigate();

    //Lista
    const [rows, setRows] = useState<IListagemClientes[]>([]); // guardar as informações da consulta
    const [totalCount, setTotalCount] = useState(0); //guardar o numero maximo da consulta
    const [isLoading, setIsLoading] = useState(true); //loading do carregamento da busca

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number (searchParams.get('pagina') || '1');
    }, [searchParams]);

    useEffect(() => {
        setIsLoading(true);

        debounce(() => {
            // Chama a consulta e esperamos uma promessa 
            ClientesServices.getAll(pagina, busca) //(1 chama a primeira pagina e busca do usememo)
            .then((result) => { // .then espera a promessa chegar
                setIsLoading(false); 

                if (result instanceof Error) { // se ela for erro faça
                    alert(result.message); // erro na tela
                    return; // e encerrar o processo
                } else {
                    setTotalCount(result.totalCount);
                    setRows(result.data);
                }
            })    
            })
    },[busca, pagina]);

    return(
        <LayoutBase 
            titulo= 'Listagem de Clientes'
            barraDeFerramentas={(
                <FerramentasDeListagem
                aoClicarNoBotaoNovo={() => navigate('/clientes/detalhesDeClientes/novo')} 
                mostrarInputBusca 
                textoDaBusca={busca}
                aoMudarTextoDaBusca={texto => setSearchParams({busca: texto, pagina: '1'}, {replace: true})}/>
            )} >

            {/* Tabela */}
            <TableContainer component={Paper} variant="outlined" sx={{margin: 1, width:"auto"}}>
                <Table>
                    <TableHead> 
                        <TableRow>
                            <TableCell width={40}>Ações</TableCell>
                            <TableCell width={250}>Sufixo</TableCell>
                            <TableCell width={250}>Nomes</TableCell>
                            
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                            <TableCell>
                               <IconButton size = "small" onClick={() => navigate(`/clientes/detalhesDeClientes/${row.id}`)}> 
                                <Icon> edit </Icon>
                               </IconButton>
                            </TableCell>
                            <TableCell>{row.sufixo}</TableCell>
                            <TableCell>{row.nome}</TableCell>
                            
                        </TableRow>
                        ))}
                    </TableBody>

                            {totalCount === 0 && !isLoading && (
                                <caption>{Environment.LISTAGEM_VAZIA}</caption>
                            )}

                    <TableFooter>
                        {/* Barra do loading */}
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                    </TableCell>    
                            </TableRow>
                        )}

                        {/* Paginação */}
                        {(!isLoading && totalCount > Environment.LIMITE_DE_LINHAS) && (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Pagination 
                                        page={pagina}
                                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                                        onChange={(_, newPage) => setSearchParams({busca, pagina: newPage.toString()}, {replace: true})}
                                        />
                                </TableCell>    

                                <TableCell colSpan={1} align="right">
                                    Registros Encontrados: {totalCount}
                                 </TableCell>    

                            </TableRow>
                        )}                        
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBase>
    )
}