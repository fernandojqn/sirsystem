import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppThemeContext } from "../shared/contexts";

    
export const AppRoutes = () => {
    //Themas pegar o toggletheme lá do contexto
    const { toggleTheme } = useAppThemeContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button  variant="contained" onClick={toggleTheme}> teste </Button>} />
            

            <Route path='*' element={<Navigate to ='/pagina-inicial' />} />
        </Routes>
    )
};