import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";


export const LightTheme = createTheme ({
    palette: {
        primary: {
            main: yellow[500],
            light: yellow[300],
            dark: yellow[700]
        },
        secondary: {
          main: cyan[500],
          dark: cyan[400],
          light: cyan[300],
          contrastText: '#ffffff',
        },
        background: {
            paper: '#ffffff',
            default: '#f7f6f3'
        }
    }
})