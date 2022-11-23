import { Box, Checkbox, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components";
import { IVFormErrors, useVForm, VForm, VPatternFormat, VTextField } from "../../shared/forms";
import { LayoutBase } from "../../shared/layouts"
import { FornecedoresServices } from "../../shared/services/api/fornecedores/FornecedoresServices";
import * as yup from 'yup';

interface IFormData {
    sufixo: string; nome: string; documento: string; inscricao: string; ccm: string;
    contato: string; tel: string; cel: string; email: string; site: string; 

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string;

    cliente: boolean;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    sufixo: yup.string().required().min(3),
    nome: yup.string().notRequired().default(''), 
    documento: yup.string().notRequired().default(''),
    inscricao: yup.string().notRequired().default(''),
    ccm: yup.string().notRequired().default(''),
    
    contato: yup.string().notRequired().default(''),
    tel: yup.string().notRequired().default(''),
    cel: yup.string().notRequired().default(''),
    email: yup.string().email().notRequired().default(''),
    site: yup.string().notRequired().default(''),
    
    end: yup.string().notRequired().default(''),
    num: yup.string().notRequired().default(''),
    compl: yup.string().notRequired().default(''),
    bairro: yup.string().notRequired().default(''),
    cidade: yup.string().notRequired().default(''),
    uf: yup.string().notRequired().default(''),
    cep: yup.string().notRequired().default(''),
    pais: yup.string().notRequired().default(''),
    muni: yup.string().notRequired().default(''),

    cliente: yup.boolean().notRequired().default(false)
});


export const DetalhesDeFornecedores: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [sufixo, setSufixo] = useState('');


    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
            setIsLoading(true);

            FornecedoresServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/fornecedores');
                } else {
                    setSufixo(result.sufixo);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                sufixo: '', nome: '', documento: '', inscricao: '', ccm: '',
                contato: '', tel: '', cel: '', email: '', site: '', 
                
                end: '', num: '', compl: '', bairro: '', cidade: '',
                uf: '', cep: '', pais: 'Brasil', muni: '',

                cliente: false
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
                    FornecedoresServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/fornecedores');   
                            } else {
                                navigate(`/fornecedores/detalhesDeFornecedores/${result}`);   
                            }
                            
                        }
                    })
                }
                else {
                    FornecedoresServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setSufixo(dados.sufixo);
                            if (isSaveAndClose()) {
                                navigate('/fornecedores');   
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
    };

    // Deletar Cliente
    const handleDelete = (id: number) => {
                         
        FornecedoresServices.deleteById(id)
          .then(result => {
            
              if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro apagado com sucesso!');
              navigate('/atividades');
            }
          });
      
  };

    //CEP
    const checkCep = (e: { target: { value: any; }; }) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
                .then(data => {
                    formRef.current?.setFieldValue('end', data.logradouro);
                    formRef.current?.setFieldValue('bairro', data.bairro);
                    formRef.current?.setFieldValue('cidade', data.localidade);
                    formRef.current?.setFieldValue('uf', data.uf);
                    formRef.current?.setFieldValue('muni', data.ibge);
                    formRef.current?.setFieldValue('pais', 'Brasil');
                })
    }

    return (
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo Fornecedor' : sufixo}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/fornecedores/detalhesDeFornecedores/novo')}
                aoClicarBotaoVoltar = {() => navigate('/fornecedores')}
            />
        }>

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
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Typography variant="h5">
                                Dados Cadastrais 
                            </Typography>
                            </Grid>
                            
                            <Grid item flex={2} display="flex" alignItems="center" justifyContent="end" marginRight={2}>
                            <Checkbox name="cliente"/>
            
                            <Typography >
                                Salvar como Cliente
                            </Typography>
                        </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='sufixo' label="Sufixo" fullWidth disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                            
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                <VTextField name='nome' label="Nome" fullWidth disabled={isLoading}size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                            </Grid>
                        </Grid>
                
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <VTextField name='documento' fullWidth placeholder="só digite os numeros"  disabled={isLoading} size="small" />
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <VTextField name='inscricao' label="Inscrição Estadual / R.G." placeholder="só digite os numeros" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <VTextField name='ccm' label="C.C.M." fullWidth placeholder="só digite os numeros" disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
            
                        {/*Contato*/}
                        <Grid item>
                            <Typography variant="h5">
                                Contato
                            </Typography>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={5} xl={3}>
                                <VTextField  name='contato' label="Contato" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
                                <VPatternFormat name='tel' label="Telefone" format="(##) #### ####"  
                                                fullWidth placeholder="(11) 1111-1111" disabled={isLoading} /> 
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
                                <VPatternFormat name='cel' label="Celular" format="(##) # #### ####"  
                                                fullWidth placeholder="(11) 91111-1111" disabled={isLoading}/>
                            </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField name='email' label="E-mail" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <VTextField name='site' label="Site" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
            
                        {/*Endereço*/}
                        <Grid item>
                            <Typography variant="h5">
                                Endereço
                            </Typography>
                        </Grid>
                        
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={7} lg={5} xl={3}>
                                <VTextField name='end'label="Endereço" fullWidth disabled={isLoading} size="small" value={'i'}/>
                                    
                            </Grid> 
            
                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                <VTextField name='num' label="Numero" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                <VTextField name='compl' label="complemento" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={4} md={5} lg={4} xl={3}>
                                <VTextField name='bairro' label="Bairro" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={4} md={5} lg={2} xl={2}>
                                <VTextField name='cidade' label="Cidade" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        
                            <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                            <VTextField name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                <VPatternFormat name='cep' label="C.E.P."  format="#####-###" 
                                                fullWidth disabled={isLoading} onBlur={checkCep}/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                <VTextField name='pais' label="País" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                <VTextField name='muni' label="Cod. Municipio" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
                    </Grid>    
                </Box>
            </VForm>
            
        </LayoutBase>
    )
}