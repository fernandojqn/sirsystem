
import { Navigate, Route, Routes } from "react-router-dom";
import { DetalhesDeUsuarios, DetalhesDeClientes, DetalhesDeFornecedores, DetalhesDeTransportadoras, ListagemDeUsuarios, 
         ListagemDeClientes, ListagemDeFornecedores, ListagemDeTransportadoras, ListagemDeVendedores, DetalhesDeVendedores, 
         ListagemDeEmpresas, DetalhesDeEmpresas, DetalhesDeAtividades, ListagemDeAtividades } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";

    
export const AppRoutes = () => {
    
    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>}/>
            
            <Route path='/atividades' element={<ListagemDeAtividades/>}/>
            <Route path='/atividades/detalhesDeAtividades/:id' element={<DetalhesDeAtividades/>}/>

            <Route path='/clientes' element={<ListagemDeClientes/>}/>
            <Route path='/clientes/detalhesDeClientes/:id' element={<DetalhesDeClientes/>}/>

            <Route path='/empresas' element={<ListagemDeEmpresas/>}/>
            <Route path='/empresas/detalhesDeEmpresas/:id' element={<DetalhesDeEmpresas/>}/>

            <Route path='/fornecedores' element={<ListagemDeFornecedores/>}/>
            <Route path='/fornecedores/detalhesDeFornecedores/:id' element={<DetalhesDeFornecedores/>}/>

            <Route path='/transportadoras' element={<ListagemDeTransportadoras/>}/>
            <Route path='/transportadoras/detalhesDeTransportadoras/:id' element={<DetalhesDeTransportadoras/>}/>

            <Route path='/usuarios' element={<ListagemDeUsuarios/>}/>
            <Route path='/usuarios/detalhesDeUsuarios/:id' element={<DetalhesDeUsuarios/>}/>

            <Route path='/vendedores' element={<ListagemDeVendedores/>}/>
            <Route path='/vendedores/detalhesDeVendedores/:id' element={<DetalhesDeVendedores/>}/>

            <Route path='*' element={<Navigate to ='/pagina-inicial'/>}/>
        </Routes>
    )
};