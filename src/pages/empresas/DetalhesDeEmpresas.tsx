import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, LinearProgress, MenuItem, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhes } from "../../shared/components"
import { IVFormErrors, useVForm, VForm, VNumericFormat, VPatternFormat, VRadioButton2, VTextField, VTextFieldUF } from "../../shared/forms";
import { LayoutBase } from "../../shared/layouts"
import { EmpresasServices } from "../../shared/services/api/empresas/EmpresasServices";
import * as yup from 'yup';
import { ExpandMore } from "@mui/icons-material";


interface IFormData {
    sufixo: string; nome: string; 
    
    documento: string; inscricao: string; ccm: string;
    
    contato: string; tel: string; cel: string; email: string; site: string;
    
    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string;
    
    unidade: string; nomeUnidade: string; modeloCF: string; numSerie: string; obs: string;
    obsFisco: string;

    codNatureza: string; modeloNF: string; serie: string; optSN: boolean;
    aliqICMS: number; aliqCOFINS: number; aliqPIS: number; perfil: string;
    
    tipoRegime: string; criEscrit: string; aproCredito: string; tipoContri: string;
    codEstruttura: string; codOperacao: string;
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
    
    unidade: yup.string().notRequired().default(''), 
    nomeUnidade: yup.string().notRequired().default(''), 
    modeloCF: yup.string().notRequired().default(''), 
    numSerie: yup.string().notRequired().default(''),
    obs: yup.string().notRequired().default(''),
    obsFisco: yup.string().notRequired().default(''),

    codNatureza: yup.string().notRequired().default(''), 
    modeloNF: yup.string().notRequired().default(''), 
    serie: yup.string().notRequired().default(''), 
    optSN: yup.boolean().default(false),
    aliqICMS: yup.number().notRequired().default(0), 
    aliqCOFINS: yup.number().notRequired().default(0), 
    aliqPIS: yup.number().notRequired().default(0), 
    perfil: yup.string().notRequired().default(''),
    
    tipoRegime: yup.string().notRequired().default(''), 
    criEscrit: yup.string().notRequired().default(''), 
    aproCredito: yup.string().notRequired().default(''), 
    tipoContri: yup.string().notRequired().default(''),
    codEstruttura: yup.string().notRequired().default(''), 
    codOperacao: yup.string().notRequired().default('')
});


export const DetalhesDeEmpresas: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [sufixo, setSufixo] = useState('');

    //trazer dados da empresa
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
            setIsLoading(true);

            EmpresasServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/empresas');
                } else {
                    setSufixo(result.sufixo);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                sufixo: ''
            });
        }
    }, [id]);

    // Salvando Empresa
    const handleSave = (dados: IFormData) => {
        //validação
        formValidationSchema.
            validate(dados, {abortEarly: false}) //abortEarly:false valida todos os campos
            .then((dadosValidados) => {
                
                setIsLoading(true)

                if (id === 'novo') {
                    EmpresasServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/empresas');   
                            } else {
                                navigate(`/empresas/detalhesDeEmpresas/${result}`);   
                            }
                            
                        }
                    })
                }
                else {
                    EmpresasServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setSufixo(dados.sufixo);
                            if (isSaveAndClose()) {
                                navigate('/empresas');   
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
                         
        EmpresasServices.deleteById(id)
          .then(result => {
            
              if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro apagado com sucesso!');
              navigate('/empresas');
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


    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Nova empresa' : sufixo}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/empresas/detalhesDeEmpresas/novo')}
                aoClicarBotaoVoltar = {() => navigate('/empresas')}
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
                                                fullWidth placeholder="(11) 1111-1111" disabled={isLoading}/> 
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
                                <VTextFieldUF name='uf' label="UF" fullWidth disabled={isLoading} size="small" />
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
                        
            
                        {/*Dados Complementares*/}
                        <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                            <Accordion> 
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                                        <Grid item>
                                            <Typography variant="h5">
                                                Dados complementares
                                            </Typography>
                                        </Grid>
                                        
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                                                <VTextField name='unidade' label="Unidade" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                                                <VTextField name='nomeUnidade' label="Nome" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <VTextField name='modeloCF' label="Modelo cupom fiscal" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                                <VTextField name='numSerie' label="Número de série" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <VTextField name='obs' label="Obs da empresa" fullWidth disabled={isLoading} size="small" multiline/>
                                            </Grid>
                                        </Grid>

                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <VTextField name='obsFisco' label="Informações adicionais de interesse do fisco" fullWidth disabled={isLoading} size="small" multiline/>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
            
                        {/*Dados governamentais*/}
                        <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                                        <Grid item>
                                            <Typography variant="h5">
                                                Dados governamentais
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                                <VTextField name='codNatureza' label="Cod. Natureza" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                                <VTextField name='modeloNF' label="Modelo NF" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                                <VTextField name='serie' label="Série" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item spacing={2}>
                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                                                <Typography marginRight={1}> Optante pelo Simples Nacional: </Typography>
                                                <VRadioButton2 name="simplesNasc" />
                                            </Grid>

                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                                                <Typography marginRight={1}> Perfil: </Typography>
                                                <VRadioButton2 name="simplesNasc" />
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VNumericFormat name='aliqICMS' label="Aliq. ICMS" fullWidth disabled={isLoading} />
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VNumericFormat name='aliqCOFINS' label="Aliq. COFINS" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VNumericFormat name='aliqPIS' label="Aliq. PIS" fullWidth disabled={isLoading}/>
                                            </Grid>
                                        </Grid>

                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='tipoRegime' label="Tipo do Regime" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='criEscrit' label="Critério de escritura" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='aproCredito' label="Apropriação de crédito" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>

                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='tipoContri' label="Tipo de contribuição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='codEstruttura' label="Cod de Estrutura" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                                <VTextField name='codOperacao' label="Cod. nº operação" fullWidth disabled={isLoading} size="small"/>
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