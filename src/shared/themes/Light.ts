import { createTheme } from "@mui/material";
import { yellow } from "@mui/material/colors";


export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: yellow[500],
            light: yellow[300],
            dark: yellow[700],
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