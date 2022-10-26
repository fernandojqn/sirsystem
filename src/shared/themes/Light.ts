import { createTheme } from "@mui/material";
import { yellow, amber } from "@mui/material/colors";

/**
 * #16140E preto
 * 
 * #D807BA cinza claro
 * #C4C2AE cinza escuro
 * 
 * #FFC61D amarelo
 * #E5AC1C amarelo 2
 * #C1930C amarelo 3
 * #A5790C amarelo 4
 * 
 * #FFC61D #A5790C gradiente claro
 * #FBBF5E #1614DE gradiente escuro
 */

export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: '#E5AC1C',
            light: '#FFC61D',
            dark: '#C1930C',
            contrastText: '#ffffff'
        },
        secondary: {
          main: yellow[500],
          dark: yellow[700],
          light: yellow[300],
          contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3'
        }
    }
    
})