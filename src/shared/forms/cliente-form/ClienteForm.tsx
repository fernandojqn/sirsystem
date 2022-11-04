/** Formulario Cliente Detalhes */

import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid, LinearProgress, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import { VAutoComplete } from "../components/VAutoCompleteUF";
import { VTextField } from "../components/VTextField";


export default function ClienteForm() {
    const [isLoading, setIsLoading] = useState(false);

return(
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
                    <VTextField fullWidth label="Sufixo" name='sufixo' disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                </Grid>
                
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <VTextField fullWidth label="Nome" name='nome' disabled={isLoading}size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                </Grid>

            </Grid>
    
            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextField fullWidth label="C.N.P.J. / C.P.F." placeholder="só digite os numeros" name='cnpj' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextField fullWidth label="Inscrição Estadual / R.G." name='ie' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextField fullWidth label="C.C.M." placeholder="só digite os numeros" name='cnpj/cpf' disabled={isLoading} size="small"/>
                </Grid>

            </Grid>


            {/*Contato*/}
            <Grid item>
                <Typography variant="h5">
                    Contato
                </Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <VTextField fullWidth label="Contato" name='contato' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <VTextField fullWidth label="Telefone" placeholder="(11) 1111-1111" name='tel' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <VTextField fullWidth label="Celular" placeholder="(11) 91111-1111" name='cel' disabled={isLoading} size="small"/>
                </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <VTextField fullWidth label="E-mail" name='email' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                    <VTextField fullWidth label="Site" name='site' disabled={isLoading} size="small"/>
                </Grid>
            </Grid>


            {/*Endereço*/}
            <Grid item>
                <Typography variant="h5">
                    Endereço
                </Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={7} lg={4} xl={3}>
                    <VTextField fullWidth label="Endereço" name='end' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <VTextField fullWidth label="Numero" name='num' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <VTextField fullWidth label="complemento" name='compl' disabled={isLoading} size="small"/>
                </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                    <VTextField fullWidth label="Bairro" name='bairro' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
                    <VTextField fullWidth label="Cidade" name='cidade' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                    <VTextField fullWidth  name='uf' disabled={isLoading} size="small"/>
                </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
                
                <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                    <VTextField fullWidth label="C.E.P." name='cep' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                    <VTextField fullWidth label="País" name='pais' disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                    <VTextField fullWidth label="Cod. Municipio" name='mun' disabled={isLoading} size="small"/>
                </Grid>
            </Grid>

            {/*End de Entrega*/}
            <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMore />} >
                        <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                            <Grid item>
                                <Typography variant="h5">
                                    Endereço de entrega
                                </Typography>
                            </Grid>
                            <Grid item flex={2} display="flex" alignItems="center" justifyContent="end" marginRight={2}>
                                <Checkbox  defaultChecked />

                                <Typography >
                                    o mesmo do endereço
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column" padding={2} spacing={2}>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={7} lg={4} xl={3}>
                                    <VTextField fullWidth label="Endereço" name='endEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                    <VTextField fullWidth label="Numero" name='numEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="complemento" name='complEnt' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                                    <VTextField fullWidth label="Bairro" name='bairroEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
                                    <VTextField fullWidth label="Cidade" name='cidadeEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                    <VTextField fullWidth label="Estado" name='ufEnt' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                
                                <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                    <VTextField fullWidth label="C.E.P." name='cepEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                    <VTextField fullWidth label="País" name='paisEnt' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="Cod. Municipio" name='munEnt' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>

            {/*End de Correspondencia*/}
            <Grid item direction="row"  marginTop={1} marginLeft={0.4} xs={12} >
                <Accordion >
                    <AccordionSummary expandIcon={<ExpandMore />} >
                        <Grid container item direction="row" component={Box} flex={1} display="flex"  >
                            <Grid item>
                                <Typography variant="h5">
                                    Endereço de correspondencia
                                </Typography>
                            </Grid>
                            <Grid item flex={2} display="flex" alignItems="center" justifyContent="end" marginRight={2}>
                                <Checkbox  defaultChecked />

                                <Typography >
                                    o mesmo do endereço
                                </Typography>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="column" padding={2} spacing={2}>
                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={7} lg={4} xl={3}>
                                    <VTextField fullWidth label="Endereço" name='endCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                    <VTextField fullWidth label="Numero" name='numCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="complemento" name='complCor' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                <Grid item xs={12} sm={12} md={5} lg={4} xl={3}>
                                    <VTextField fullWidth label="Bairro" name='bairroCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={5} lg={2} xl={2}>
                                    <VTextField fullWidth label="Cidade" name='cidadeCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                                    <VTextField fullWidth label="Estado" name='ufCor' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2}>
                                
                                <Grid item xs={12} sm={12} md={3} lg={4} xl={3}>
                                    <VTextField fullWidth label="C.E.P." name='cepCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}>
                                    <VTextField fullWidth label="País" name='paisCor' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="Cod. Municipio" name='munCor' disabled={isLoading} size="small"/>
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
                                    <VTextField fullWidth label="tipo de atividade" name='ativ' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={4} xl={2}>
                                    <VTextField fullWidth label="Vendedor" name='vend' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={2} lg={5} xl={3}>
                                    <Typography> Condições de Pagamentos: </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="1x" name='pag1' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="2x" name='pag2' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="3x" name='pag3' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="4x" name='pag4' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="5x" name='pag5' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="6x" name='pag6' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={2} lg={5} xl={3}>
                                    <Typography> Desconto: </Typography>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="%" name='desc1' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="%" name='desc2' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={1.66} lg={2} xl={2}>
                                    <VTextField fullWidth label="%" name='desc3' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item  spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={6} lg={5} xl={3} >
                                    <Typography marginRight={1}> Optante pelo Simples Nacional: </Typography>
                                    
                                    <RadioGroup row  name="simplesNac" defaultValue={false}>
                                        <FormControlLabel value={true} control={<Radio size="small" />} label="Sim" />
                                        <FormControlLabel value={false} control={<Radio size="small" />} label="Não" />
                                    </RadioGroup>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={5} xl={3} >
                                    <Typography marginRight={1}> Retem I.S.S.: </Typography>

                                    <RadioGroup row  name="retemISS" defaultValue={false}>
                                        <FormControlLabel value={true} control={<Radio size="small" />} label="Sim" />
                                        <FormControlLabel value={false} control={<Radio size="small" />} label="Não" />
                                    </RadioGroup>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="% COFINS" name='cofins' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="% PIS" name='pis' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="% ICMS" name='icms' disabled={isLoading} size="small"/>
                                </Grid>

                                <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
                                    <VTextField fullWidth label="% IPI" name='ipi' disabled={isLoading} size="small"/>
                                </Grid>
                            </Grid>

                            <Grid container item direction="row" spacing={2} alignItems="center">
                                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                                    <VTextField fullWidth label="Observação:" name='obs' disabled={isLoading} 
                                                size="small" multiline/>
                                </Grid>
                            </Grid>
                        
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    </Box>
)

};