import { createTheme } from "@mui/material";
import { yellow, amber } from "@mui/material/colors";


export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: amber[400],
            light: amber[600],
            dark: amber[800],
            contrastText: '#ffffff'
        },
        secondary: {
          main: yellow[700],
          dark: yellow[900],
          light: yellow[500],
          contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3'
        }
    }
})