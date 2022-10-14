import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";

    
export const AppRoutes = () => {
    //Themas pegar o toggletheme lá do contexto
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Button  variant="contained" onClick={toggleDrawerOpen}> teste </Button>} />
            

           {/* <Route path='*' element={<Navigate to ='/pagina-inicial' />} /> */}
        </Routes>
    )
};