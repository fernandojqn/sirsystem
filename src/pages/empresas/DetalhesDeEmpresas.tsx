import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components"
import { IVFormErrors, useVForm, VForm, VTextField } from "../../shared/forms";
import { LayoutBase } from "../../shared/layouts"
import { AtividadesServices } from "../../shared/services/api/atividades/AtividadesServices";
import * as yup from 'yup';


interface IFormData {
    atividade: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    atividade: yup.string().required().min(3),
    
});

export const DetalhesDeEmpresas: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [atividade, setAtividade] = useState('');

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
            setIsLoading(true);

            AtividadesServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/atividades');
                } else {
                    setAtividade(result.atividade);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                atividade: ''
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
                    AtividadesServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/atividades');   
                            } else {
                                navigate(`/atividades/detalhesDeAtividades/${result}`);   
                            }
                            
                        }
                    })
                }
                else {
                    AtividadesServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setAtividade(dados.atividade);
                            if (isSaveAndClose()) {
                                navigate('/atividades');   
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
                         
        AtividadesServices.deleteById(id)
          .then(result => {
            
              if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro apagado com sucesso!');
              navigate('/atividades');
            }
          });
      
  };




    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Nova atividade' : atividade}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/atividades/detalhesDeAtividades/novo')}
                aoClicarBotaoVoltar = {() => navigate('/atividades')}
        />}>

        {/* Formulario*/}
        <VForm ref={formRef}  onSubmit={handleSave}> 
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
                                Atividade 
                            </Typography>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                                <VTextField name='atividade' label="Atividade" fullWidth disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                        </Grid>
                    </Grid>    
                </Box>
            </VForm>
        </LayoutBase>
    )
}