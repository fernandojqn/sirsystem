import { createTheme } from "@mui/material";
import { yellow, amber } from "@mui/material/colors";

/**
 * #16140E preto
 * 
 * #d8d7ba cinza claro
 * #c4c2ae cinza escuro
 * 
 * #ffc61d amarelo
 * #e5ac1c amarelo 2
 * #c1930c amarelo 3
 * #a5790c amarelo 4
 * 
 * #ffc61d #a5790c gradiente claro
 * #fbbf5e #16140e gradiente escuro
 */

export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: '#e5ac1c',
            light: '#ffc61d',
            dark: '#c1930c',
            contrastText: '#ffffff'
        },
        secondary: {
          main: '#c1930c',
          light: '#e5ac1c',
          dark: '#a5790c',
          contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#ececeb'
        }
    }
})