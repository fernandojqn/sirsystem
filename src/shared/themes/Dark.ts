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
      main: '#FFC61D',
      light: amber[200],
      dark: amber[600],
      contrastText: '#ffffff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
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
