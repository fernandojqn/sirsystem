
import { Navigate, Route, Routes } from "react-router-dom";
import { ListagemDeClientes } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";

    
export const AppRoutes = () => {
    

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/clientes' element={<ListagemDeClientes />} />

            <Route path='*' element={<Navigate to ='/pagina-inicial' />} />
        </Routes>
    )
};