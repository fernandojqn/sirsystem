/** Formulario Cliente Detalhes */

import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, Grid, LinearProgress, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useState } from "react";
import { VTextField, VTextFieldDocumento } from "..";




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
                    <VTextField name='sufixo' label="Sufixo" fullWidth disabled={isLoading} size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                </Grid>
                
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <VTextField name='nome' label="Nome" fullWidth disabled={isLoading}size="small"/> {/* onChange = {e=> setNome(e.target.value)}*/}
                </Grid>

            </Grid>
    
            <Grid container item direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextFieldDocumento name='documento' label="C.N.P.J. / C.P.F." fullWidth placeholder="só digite os numeros"  disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextField name='inscricao' label="Inscrição Estadual / R.G." fullWidth disabled={isLoading} size="small"/>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                    <VTextField name='ccm' label="C.C.M." fullWidth placeholder="só digite os numeros" disabled={isLoading} size="small"/>
                </Grid>

            </Grid>
        </Grid>
    </Box>
)

};