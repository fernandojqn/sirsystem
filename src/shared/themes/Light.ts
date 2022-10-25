import { createTheme } from "@mui/material";
import { yellow, amber } from "@mui/material/colors";


export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: amber[400],
            light: amber[200],
            dark: amber[600],
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