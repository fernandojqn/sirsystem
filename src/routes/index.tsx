
import { Navigate, Route, Routes } from "react-router-dom";
import { DetalhesDeClientes, ListagemDeClientes } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";

    
export const AppRoutes = () => {
    

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard />} />
            <Route path='/clientes' element={<ListagemDeClientes />} />
            <Route path='/clientes/detalhesDeClientes/:id' element={<DetalhesDeClientes />} />

            <Route path='*' element={<Navigate to ='/pagina-inicial' />} />
        </Routes>
    )
};