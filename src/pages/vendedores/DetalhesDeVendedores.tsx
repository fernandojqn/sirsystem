import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices } from "../../shared/services/api/clientes/ClientesServices";
import { VForm, useVForm, IVFormErrors, VTextField, VNumericFormat, VTFCriEscrituracao, VPatternFormat } from "../../shared/forms";
import * as yup from 'yup';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { VendedoresServices } from "../../shared/services/api/vendedores/VendedoresServices";


interface IFormData {
    nome: string; documento: string; inscricao: string; 
    contato: string; tel: string; cel: string; email: string;

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string; 

    comissao: number; irpf: number; 
    banco: string; agencia: string; conta: string; pix: string;
    obs: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    nome: yup.string().notRequired().default(''), 
    documento: yup.string().notRequired().default(''),
    inscricao: yup.string().notRequired().default(''),
        
    contato: yup.string().notRequired().default(''),
    tel: yup.string().notRequired().default(''),
    cel: yup.string().notRequired().default(''),
    email: yup.string().email().notRequired().default(''),
        
    end: yup.string().notRequired().default(''),
    num: yup.string().notRequired().default(''),
    compl: yup.string().notRequired().default(''),
    bairro: yup.string().notRequired().default(''),
    cidade: yup.string().notRequired().default(''),
    uf: yup.string().notRequired().default(''),
    cep: yup.string().notRequired().default(''),
    pais: yup.string().notRequired().default(''),
    muni: yup.string().notRequired().default(''),

    banco: yup.string().notRequired().default(''), 
    agencia: yup.string().notRequired().default(''), 
    conta: yup.string().notRequired().default(''), 
    pix: yup.string().notRequired().default(''), 
    obs: yup.string().notRequired().default(''), 

    comissao: yup.number().notRequired().default(0), 
    irpf: yup.number().notRequired().default(0), 
});


export const DetalhesDeVendedores: React.FC = () => {
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
                    navigate('/vendedores');
                } else {
                    setNome(result.nome);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                nome: '', documento: '', inscricao: '', 
                contato: '', tel: '', cel: '', email: '', 
                
                end: '', num: '', compl: '', bairro: '', cidade: '',
                uf: '', cep: '', pais: 'Brasil', muni: '',
                
                comissao: 0, irpf: 0, 
                banco: '', agencia: '', conta: '', pix: '',
                obs: ''
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
                    VendedoresServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/vendedores');   
                            } else {
                                navigate(`/vendedores/detalhesDeVendedores/${result}`);   
                            }
                        }
                    })
                }
                else {
                    VendedoresServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setNome(dados.nome);
                            if (isSaveAndClose()) {
                                navigate('/vendedores');   
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
        //confirm
          VendedoresServices.deleteById(id)
            .then(result => {
                if (result instanceof Error) {
                alert(result.message);
              } else {
                alert('Registro apagado com sucesso!');
                navigate('/vendedores');
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
    
    // Fazendo a tela 
    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo vendedor' : nome}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/vendedores/detalhesDeVendedores/novo')}
                aoClicarBotaoVoltar = {() => navigate('/vendedores')}
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
                        </Grid>
                
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                <VTextField name='documento' fullWidth placeholder="só digite os numeros"  disabled={isLoading} size="small" />
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                            <VNumericFormat name='inscricao' label="Inscrição Estadual / R.G." fullWidth disabled={isLoading}/>
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
                                <VNumericFormat name='num' label="Numero" fullWidth disabled={isLoading}/>
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
                            <VTFCriEscrituracao name='uf' label="UF" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
            
                        <Grid container item direction="row" spacing={2}>
                            <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                <VPatternFormat name='cep' label="C.E.P." format="#####-###" disabled={isLoading}
                                     valueIsNumericString={true} onBlur={checkCep}/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                <VTextField name='pais' label="País" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                <VTextField name='muni' label="Cod. Municipio" fullWidth disabled={isLoading} size="small"/>
                            </Grid>
                        </Grid>
                        
            
                       
                        
                        {/*Complemento*/}
                        <Grid item direction="row" marginTop={1} marginLeft={0.4} xs={12} >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Typography variant="h5">
                                        Dados bancarios
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={5} xl={3}>
                                                <VNumericFormat name='comissao' label="Comissão" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={4} xl={2}>
                                                <VNumericFormat name='irpf' label="% IRPF" fullWidth disabled={isLoading}/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='banco' label="Banco" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='agencia' label="Agência" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='conta' label="Conta" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='pix' label="Pix" fullWidth disabled={isLoading}/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <VTextField name='obs' label="Observação:" fullWidth disabled={isLoading} size="small" multiline/>
                                            </Grid>
                                        </Grid>
                                    
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
            
                    </Grid>
                </Box>
            </VForm>
         </LayoutBase>
         
    )        
}