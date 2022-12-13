import { Box, Button, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components"
import { IVFormErrors, useVForm, VForm, VPatternFormat, VTextField } from "../../shared/forms";
import { LayoutBase } from "../../shared/layouts"
import { UsuariosServices } from "../../shared/services/api/usuarios/UsuariosServices";
import * as yup from 'yup';


interface IFormData {
    nome: string; login: string;
    permissoes: string; departamento: string;
    tel: string; cel: string; email: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().required().min(3), 
    login: yup.string().required().min(3),
    permissoes: yup.string().notRequired().default(''), 
    departamento: yup.string().notRequired().default(''),
    tel: yup.string().notRequired().default(''),
    cel: yup.string().notRequired().default(''),
    email: yup.string().notRequired().default('')
});

export const DetalhesDeUsuarios: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [usuario, setUsuario] = useState('');

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
            setIsLoading(true);

            UsuariosServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/usuarios');
                } else {
                    setUsuario(result.nome);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                nome: '', login: '',
                permissoes: '', departamento: '',
                tel: '', cel: '', email: ''
            });
        }
    }, [id]);

    // Salvando Clientes
    const handleSave = (dados: IFormData) => {
        //validação
        formValidationSchema.
            validate(dados, {abortEarly: false}) //abortEarly:false valida todos os campos
            .then((dadosValidados) => {
                
                setIsLoading(true)

                if (id === 'novo') {
                    UsuariosServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/usuarios');   
                            } else {
                                navigate(`/usuarios/detalhesDeusuarios/${result}`);   
                            }
                            
                        }
                    })
                }
                else {
                    UsuariosServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setUsuario(dados.nome);
                            if (isSaveAndClose()) {
                                navigate('/usuarios');   
                            }
                        }
                    });
                }
            })

            .catch ((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;

                });

                formRef.current?.setErrors(validationErrors); // escrever texto especifico {nome: 'Precisa', email: 'necessita'}
            })
    }

    // Deletar Cliente
    const handleDelete = (id: number) => {
                         
        UsuariosServices.deleteById(id)
          .then(result => {
            
              if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro apagado com sucesso!');
              navigate('/usuarios');
            }
          });
      
  };




    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo usuario' : usuario}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/usuarios/detalhesDeusuarios/novo')}
                aoClicarBotaoVoltar = {() => navigate('/usuarios')}
        />}>

        {/* Formulario*/}
        <VForm ref={formRef} onSubmit= {handleSave} >
                <Box margin={1} display= 'flex' flexDirection='column' component={Paper} variant= 'outlined'>
                    
                    <Grid container direction="column" padding={2} spacing={2}>
                        {/* Loading da pagina*/}
                        {isLoading && (
                            <Grid item>
                        <LinearProgress variant='indeterminate' />
                            </Grid>
                        )}
            
                        {/* Dados Cadastrias */}
                        <Grid item>
                            <Typography variant="h5">
                                Dados Cadastrais 
                            </Typography>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='nome' label="Nome" fullWidth disabled={isLoading}size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='login' label="Login" fullWidth disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>    
                        </Grid>
                
                        {/*Contato*/}
                        <Grid item>
                            <Typography variant="h5">
                                Contato
                            </Typography>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
                                <VPatternFormat name='tel' label="telefone" format="(##) #####-####" disabled={isLoading}
                                    valueIsNumericString={true}/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
                                <VPatternFormat name="cel" label="Celular" format="(##) #####-####" disabled={isLoading}
                                    valueIsNumericString={true}/>
                            </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField name='email' label="E-mail" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>

                        {/* Permissoes */}
                        <Grid item>
                            <Typography variant="h5">
                                Permissões 
                            </Typography>
                        </Grid>
                
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='permissão' label="Permissão" fullWidth disabled={isLoading}size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='departamento' label="Departamento" fullWidth disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>    
                        </Grid>

                        <Grid container item direction="row" alignContent="right">
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Button 
                                size="small"
                                color="primary"
                                disableElevation
                                variant="contained"
                            > 
                                <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                                    Resetar Senha
                                </Typography>
                            </Button>
                            </Grid>   
                        </Grid>
                    </Grid>
                </Box>
            </VForm>
        </LayoutBase>
    )
}