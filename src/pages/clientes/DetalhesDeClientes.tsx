import { Box,  Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices } from "../../shared/services/api/clientes/ClientesServices";
import { VTextField, VForm, useVForm } from "../../shared/forms";


interface IFormData {
    nome: string;
    email: string;
    cidadeId: number;
}

export const DetalhesDeClientes: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm(); 
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');
    

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
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
        } else { 
            formRef.current?.setData({
                nome: '',
                email: '',
                cidade: ''
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
                    if (isSaveAndClose()) {
                        navigate('/clientes');   
                    } else {
                        navigate(`/clientes/detalhesDeClientes/${result}`);   
                    }
                    
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
                    if (isSaveAndClose()) {
                        navigate('/clientes');   
                    }
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

    

    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo cliente' : nome}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/clientes/detalhesDeClientes/novo')}
                aoClicarBotaoVoltar = {() => navigate('/clientes')}
        />}>
        
       
        
        {/* Formulario*/}
            <VForm ref={formRef} onSubmit= {handleSave}>
                
                <Box margin={1} display= 'flex' flexDirection='column' component={Paper} variant= 'outlined'>
                
                    <Grid container direction="column" padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                        <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}
                        
                        <Grid item>
                            <Typography variant="h5">
                                Geral
                            </Typography>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="nome" placeholder="Nome" name='nome' disabled={isLoading}/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                            
                        </Grid>
                
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="E-mail" placeholder="Email" name='email' disabled={isLoading}/>
                            </Grid>
                        </Grid>

                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField fullWidth label="Cidade" placeholder="Cidade" name='cidade' disabled={isLoading}/>
                            </Grid>
                        </Grid>

                    </Grid>
                
                </Box>
                   
            </VForm>
         </LayoutBase>
    )        
}