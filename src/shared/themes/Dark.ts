import { createTheme } from '@mui/material';
import { cyan, yellow, amber } from '@mui/material/colors';

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

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e5ac1c',
      light: '#ffc61d',
      dark: '#c1930c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#c1930c',
      light: '#e5ac1c',
      dark: '#a5790c',      
      contrastText: '#ffffff',
    },
    background: {
      paper: '#303134',
      default: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    }
  }
});
