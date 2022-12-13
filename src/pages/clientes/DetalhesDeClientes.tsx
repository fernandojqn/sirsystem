import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices } from "../../shared/services/api/clientes/ClientesServices";
import { VForm, useVForm, IVFormErrors, VTextField, VNumericFormat, VTFEstados, VPatternFormat, VRadioButton2, VTFTipoEmpresa} from "../../shared/forms";
import * as yup from 'yup';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid, LinearProgress, 
         MenuItem, 
         Paper, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { AutoCompleteAtividades } from "./components/AutoCompleteAtividades";
import { AutoCompleteVendedores } from "./components/AutoCompleteVendedores";



// Itens do formulario
interface IFormData {
    sufixo: string; nome: string; 
    tipoEmpresa: string; documento: string; inscricao: string; ccm: string;
    contato: string; tel: string; cel: string; email: string; site: string; 

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string;

    endEnt: string; numEnt: string; complEnt: string; bairroEnt: string; cidadeEnt: string;
    ufEnt: string; cepEnt: string; paisEnt: string; muniEnt: string; 

    endCor: string; numCor: string; complCor: string; bairroCor: string; cidadeCor: string;
    ufCor: string; cepCor: string; paisCor: string; muniCor: string; 

    pag1: string; pag2: string; pag3: string; pag4: string; pag5: string; 
    pag6: string; desc1: string; desc2: string; desc3: string; obs: string; 
    
    ativ: number; vend: number;
    cofins: number; pis: number; icms: number; ipi: number;

    simplesNasc: string; retemISS: string;
}


// YUP validação do formulario
const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    sufixo: yup.string().required().min(3),
    nome: yup.string().notRequired().default(''), 
    
    tipoEmpresa: yup.string().notRequired().default(''),
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

    endEnt: yup.string().notRequired().default(''),
    numEnt: yup.string().notRequired().default(''),
    complEnt: yup.string().notRequired().default(''),
    bairroEnt: yup.string().notRequired().default(''),
    cidadeEnt: yup.string().notRequired().default(''),
    ufEnt: yup.string().notRequired().default(''),
    cepEnt: yup.string().notRequired().default(''),
    paisEnt: yup.string().notRequired().default(''),
    muniEnt: yup.string().notRequired().default(''),

    endCor: yup.string().notRequired().default(''),
    numCor: yup.string().notRequired().default(''),
    complCor: yup.string().notRequired().default(''),
    bairroCor: yup.string().notRequired().default(''),
    cidadeCor: yup.string().notRequired().default(''),
    ufCor: yup.string().notRequired().default(''),
    cepCor: yup.string().notRequired().default(''),
    paisCor: yup.string().notRequired().default(''),
    muniCor: yup.string().notRequired().default(''),

    ativ: yup.number().notRequired().default(0), 
    vend: yup.number().notRequired().default(0), 
    pag1: yup.string().notRequired().default(''), 
    pag2: yup.string().notRequired().default(''), 
    pag3: yup.string().notRequired().default(''), 
    pag4: yup.string().notRequired().default(''), 
    pag5: yup.string().notRequired().default(''), 
    pag6: yup.string().notRequired().default(''), 
    desc1: yup.string().notRequired().default(''), 
    desc2: yup.string().notRequired().default(''), 
    desc3: yup.string().notRequired().default(''), 
    obs: yup.string().notRequired().default(''), 

    cofins: yup.number().notRequired().default(0), 
    pis: yup.number().notRequired().default(0), 
    icms: yup.number().notRequired().default(0), 
    ipi: yup.number().notRequired().default(0),

    simplesNasc: yup.string().notRequired().default(''), 
    retemISS: yup.string().notRequired().default(''),
});

// Selects
const itens = [{label: 'Jurídica'}, {label: 'Física'}]

export const DetalhesDeClientes: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [sufixo, setSufixo] = useState('');

    //O mesmo endereço
    const [entrega, setEntrega] = useState<boolean>(false);
    const [corresp, setCorresp] = useState<boolean>(false);
    const [acdEntrega, setAcdEntrega] = useState<boolean>(false);
    const [acdCorresp, setAcdCorresp] = useState<boolean>(false);
    
    const handleEndEntrega = () => {
        if  (entrega === false && acdEntrega === true) {
            setAcdEntrega(false);           
        } else if (entrega === false && acdEntrega === false) {
            setEntrega(true);
            setAcdEntrega(true);
        } else if (entrega === true ) {
            setEntrega(false);
            setAcdEntrega(true); 
        }
    };

    const handleEndCorresp = () => {
        if  (corresp === false && acdCorresp === true) {
            setAcdCorresp(false);           
        } else if (corresp === false && acdCorresp === false) {
            setCorresp(true);
            setAcdCorresp(true);
        } else if (corresp === true ) {
            setCorresp(false);
            setAcdCorresp(true); 
        }
    };

    
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
                
                endEnt: '', numEnt: '', complEnt: '', bairroEnt: '', cidadeEnt: '',
                ufEnt: '', cepEnt: '', paisEnt: 'Brasil', muniEnt: '', 

                endCor: '', numCor: '', complCor: '', bairroCor: '', cidadeCor: '',
                ufCor: '', cepCor: '', paisCor: 'Brasil', muniCor: '',

                pag1: '', pag2: '', pag3: '', pag4: '', pag5: '', 
                pag6: '', desc1: '', desc2: '', desc3: '', obs: '', 
    
                ativ: undefined, vend: undefined,
                cofins: 0, pis: 0, icms: 0, ipi: 0,

                simplesNasc: 'nao', retemISS: 'nao'
            });
        }
    }, [id]);


    // Salvando Clientes
    const handleSave = (dados: IFormData) => {
        setIsLoading(true);
        if (entrega === true) { // O mesmo endereço na entrega
            dados.endEnt = dados.end; dados.numEnt = dados.num; dados.complEnt = dados.compl; dados.bairroEnt = dados.bairro;
            dados.cidadeEnt = dados.cidade; dados.ufEnt = dados.uf; dados.cepEnt = dados.cep; dados.paisEnt = dados.pais;
            dados.muniEnt = dados.muni;
        }

        if (entrega === true) { // O mesmo endereço na correspondencia
            dados.endCor = dados.end; dados.numCor = dados.num; dados.complCor = dados.compl; dados.bairroCor = dados.bairro;
            dados.cidadeCor = dados.cidade; dados.ufCor = dados.uf; dados.cepCor = dados.cep; dados.paisCor = dados.pais;
            dados.muniCor = dados.muni;
        }

        //validação
        formValidationSchema.
            validate(dados, {abortEarly: false}) //abortEarly:false valida todos os campos
            .then((dadosValidados) => {
                
                if (id === 'novo') {
                    ClientesServices.create(dadosValidados)
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
                    ClientesServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setSufixo(dados.sufixo); //meu
                            if (isSaveAndClose()) {
                                navigate('/clientes');   
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
    //CEP Entrega
    const checkCepEnt = (e: { target: { value: any; }; }) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
                .then(data => {
                    formRef.current?.setFieldValue('endEnt', data.logradouro);
                    formRef.current?.setFieldValue('bairroEnt', data.bairro);
                    formRef.current?.setFieldValue('cidadeEnt', data.localidade);
                    formRef.current?.setFieldValue('ufEnt', data.uf);
                    formRef.current?.setFieldValue('munEnt', data.ibge);
                    formRef.current?.setFieldValue('paisEnt', 'Brasil');
                })
    }
    //CEP Correspondencia
    const checkCepCor = (e: { target: { value: any; }; }) => {
        const cep = e.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
                .then(data => {
                    formRef.current?.setFieldValue('endCor', data.logradouro);
                    formRef.current?.setFieldValue('bairroCor', data.bairro);
                    formRef.current?.setFieldValue('cidadeCor', data.localidade);
                    formRef.current?.setFieldValue('ufCor', data.uf);
                    formRef.current?.setFieldValue('munCor', data.ibge);
                    formRef.current?.setFieldValue('paisCor', 'Brasil');
                })
    }

    // TELA  
    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo cliente' : sufixo}
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
                            <Grid item xs={12} sm={12} md={2} lg={1.4} xl={1.4}>
                                <VTFTipoEmpresa name='tipoEmpresa' label="Pessoa" select fullWidth disabled={isLoading} size="small" />
                                
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <VPatternFormat name='documeto' valueIsNumericString={true} disabled={isLoading} 
                                    label = {formRef.current?.getFieldValue('tipoEmpresa') === 'Jurídica' ? "C.N.P.J." : "C.P.F."}
                                    format = {formRef.current?.getFieldValue('tipoEmpresa') === 'Jurídica' ? '##.###.###/####-##' : '###.###.###-##'}/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <VNumericFormat name='inscricao' label="Inscrição Estadual / R.G."  disabled={isLoading}/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                                <VNumericFormat name='ccm' label="C.C.M."  disabled={isLoading}/>
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
                                <VTextField name='contato' label="Contato" fullWidth disabled={isLoading} size='small'/>
                            </Grid>
            
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={2}>
                                <VPatternFormat name='tel' label="telefone" format="(##) ####-####" disabled={isLoading}
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
                                <VTFEstados name='uf' label="UF" fullWidth disabled={isLoading} size="small" />
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
                        
            
                        {/*End de Entrega*/}
                        <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                            <Grid item flex={2} display="flex" alignItems="center" justifyContent="end" marginRight={2}>
                                <FormControlLabel control={
                                    <Checkbox defaultChecked name="cbxEndEntrega" 
                                              onClick={handleEndEntrega} 
                                              checked={entrega}
                                    />} 
                                    label="O mesmo endereço" />
                            </Grid>

                            <Accordion disabled={entrega} expanded={acdEntrega} onClick={handleEndEntrega}> 
                                <AccordionSummary expandIcon={<ExpandMore />}>
                                    <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                                        <Grid item>
                                            <Typography variant="h5">
                                                Endereço de entrega
                                            </Typography>
                                        </Grid>
                                        
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails >
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={7} lg={4} xl={3}>
                                                <VTextField name='endEnt' label="Endereço" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                            <VNumericFormat name='numEnt' label="Numero" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='complEnt' label="complemento" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                                                <VTextField name='bairroEnt' label="Bairro" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
                                                <VTextField name='cidadeEnt' label="Cidade" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                <VTFEstados name='ufEnt' label="Estado" fullWidth disabled={isLoading} size="small" />
                                                    
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            
                                            <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                            <VPatternFormat name='cepEnt' label="C.E.P." format="#####-###" disabled={isLoading}
                                                valueIsNumericString={true} onBlur={checkCepEnt}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                                <VTextField name='paisEnt' label="País" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='munEnt' label="Cod. Municipio" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
            
                        {/*End de Correspondencia*/}
                        <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                            <Grid item flex={2} display="flex" alignItems="center" justifyContent="end" marginRight={2}>
                                <FormControlLabel control={
                                    <Checkbox defaultChecked name="cbxEndCorresp" 
                                              onClick={handleEndCorresp} 
                                              checked={corresp}
                                    />} 
                                    label="O mesmo endereço" />
                            </Grid>

                            <Accordion disabled={corresp} expanded={acdCorresp} onClick={handleEndCorresp}> 
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                                        <Grid item>
                                            <Typography variant="h5">
                                                Endereço de Correspondencia
                                            </Typography>
                                        </Grid>
                                        
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={7} lg={4} xl={3}>
                                                <VTextField name='endCor' label="Endereço" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                            <VNumericFormat name='numCor' label="Numero" fullWidth disabled={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='complCor' label="complemento" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                                                <VTextField name='bairroCor' label="Bairro" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
                                                <VTextField name='cidadeCor' label="Cidade" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                <VTFEstados name='ufCor' label="Estado" fullWidth disabled={isLoading} size="small" />
                                                    
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2}>
                                            
                                            <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                            <VPatternFormat name='cepCor' label="C.E.P." format="#####-###" disabled={isLoading}
                                                valueIsNumericString={true} onBlur={checkCepCor}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                                <VTextField name='paisCor' label="País" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VTextField name='munCor' label="Cod. Municipio" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        
                        {/*Complemento*/}
                        <Grid item direction="row" marginTop={1} marginLeft={0.4} xs={12} >
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMore />} >
                                    <Typography variant="h5">
                                        Complemento
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction="column" padding={2} spacing={2}>
                                        <Grid container item direction="row" spacing={2}>
                                            <Grid item xs={12} sm={12} md={4} lg={5} xl={3}>
                                                <AutoCompleteAtividades  isExternalLoading={isLoading}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={4} xl={2}>
                                                <AutoCompleteVendedores  isExternalLoading={isLoading}/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={1} alignItems="center">
                                            <Grid item xs={12} sm={12} md={2} lg={3} xl={3}>
                                                <Typography> Condições de Pagamentos:</Typography>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag1' label="1º condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag2' label="2ª condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag3' label="3º condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag4' label="4º condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag5' label="5º condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VTextField name='pag6' label="6º condição" fullWidth disabled={isLoading} size="small"/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                                <Typography> Desconto: </Typography>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VNumericFormat name='desc1' label="%" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VNumericFormat name='desc2' label="%" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={1.66} lg={1.5} xl={1.5}>
                                                <VNumericFormat name='desc3' label="%" fullWidth disabled={isLoading} 
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item  spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={3} >
                                                <Typography marginRight={1}> Optante pelo Simples Nacional: </Typography>
                                                <VRadioButton2 name="simplesNasc" />
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={6} lg={5} xl={3} >
                                                <Typography marginRight={1}> Retem I.S.S.: </Typography>
                                                <VRadioButton2 name="retemISS" />
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VNumericFormat name='cofins' label="% COFINS" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VNumericFormat name='pis' label="% PIS" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VNumericFormat name='icms' label="% ICMS" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
            
                                            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                                <VNumericFormat name='ipi' label="% IPI" fullWidth disabled={isLoading}
                                                    thousandsGroupStyle={"thousand"} thousandSeparator={"."}
                                                    decimalScale={2}  decimalSeparator={','}
                                                    valueIsNumericString={true} suffix={'%'}/>
                                            </Grid>
                                        </Grid>
            
                                        <Grid container item direction="row" spacing={2} alignItems="center">
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <VTextField name='obs' label="Observação:" multiline fullWidth disabled={isLoading} size="small" />
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