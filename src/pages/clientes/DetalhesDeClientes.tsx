import { Box, Button, Grid, LinearProgress, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices, IDetalhesCliente } from "../../shared/services/api/clientes/ClientesServices";
import { Form } from '@unform/web'
import { VTextField } from "../../shared/forms";
import { FormHandles } from "@unform/core";

interface IFormData {
    nome: string;
    email: string;
    cidadeId: number;
}

export const DetalhesDeClientes: React.FC = () => {
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            ClientesServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/clientes');
                } else {
                    setNome(result.nome);
                    formRef.current?.setData(result);
                }
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        setIsLoading(true)
        if (id === 'novo') {
            ClientesServices.create(dados)
            .then((result) => {
                setIsLoading(false)

                if (result instanceof Error ) {
                    alert(result.message);
                } else {
                    navigate(`/clientes/detalhesDeClientes/${result}`);
                }
            })
        }
        else {
            ClientesServices.updateById(Number(id), {id: Number(id), ...dados})
            .then((result) => {
                setIsLoading(false)
                
                if (result instanceof Error ) {
                    alert(result.message);
                } else {
                    setNome(dados.nome);
                }
            });
        }
    };



    const handleDelete = (id: number) => {
                         
          ClientesServices.deleteById(id)
            .then(result => {
              
                if (result instanceof Error) {
                alert(result.message);
              } else {
                alert('Registro apagado com sucesso!');
                navigate('/clientes');
              }
            });
        
      };

    // passar o submit para o botão salvar  
    const formRef = useRef<FormHandles>(null);

    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo cliente' : nome}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {() => formRef.current?.submitForm()}
                aoClicarBotaoSalvarEVoltar = {() => formRef.current?.submitForm()}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/clientes/detalhesDeClientes/novo')}
                aoClicarBotaoVoltar = {() => navigate('/clientes')}
        />}>
        
       {isLoading &&(
        <LinearProgress variant='indeterminate' />
       )} 
        
        {/* Formulario*/}
            <Form ref={formRef} onSubmit= {handleSave}>
                <Box margin={1} display= 'flex' flexDirection='column' component={Paper} variant= 'outlined'>
                
                    <Grid container direction="column" padding={2} spacing={2}>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={6} md={2}>
                                <VTextField fullWidth placeholder="Nome" name='nome' />
                            </Grid>
                            
                        </Grid>
                
                        <Grid container item direction="row">
                            <Grid item >
                                <VTextField fullWidth placeholder="Email" name='email' />
                            </Grid>
                        </Grid>

                        <Grid container item direction="row">
                            <Grid item >
                                <VTextField fullWidth placeholder="Cidade" name='cidade' />
                            </Grid>
                        </Grid>

                    </Grid>
                
                </Box>
                   
            </Form>
        
        </LayoutBase>
    )        
}