
import { Navigate, Route, Routes } from "react-router-dom";
import { DetalhesDEAtividades, DetalhesDeClientes, DetalhesDeFornecedores, ListagemDeAtividades, ListagemDeClientes, ListagemDeFornecedores } from "../pages";
import { Dashboard } from "../pages/dashboard/Dashboard";

    
export const AppRoutes = () => {
    

    return (
        <Routes>
            <Route path='/pagina-inicial' element={<Dashboard/>}/>
            
            <Route path='/atividades' element={<ListagemDeAtividades/>}/>
            <Route path='/atividades/detalhesDeAtividades/:id' element={<DetalhesDEAtividades/>}/>

            <Route path='/clientes' element={<ListagemDeClientes/>}/>
            <Route path='/clientes/detalhesDeClientes/:id' element={<DetalhesDeClientes/>}/>

            <Route path='/fornecedores' element={<ListagemDeFornecedores/>}/>
            <Route path='/fornecedores/detalhesDeFornecedores/:id' element={<DetalhesDeFornecedores/>}/>

            <Route path='*' element={<Navigate to ='/pagina-inicial'/>}/>
        </Routes>
    )
};