import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices } from "../../shared/services/api/clientes/ClientesServices";



export const DetalhesDeClientes: React.FC = () => {
    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') {
            setIsLoading(true);

            ClientesServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/clientes');
                } else {
                    setNome(result.nome);
                }
            });
        }
    }, [id]);

    const handleSave = () => {
        console.log('save')
    }

    const handleDelete = (id: number) => {
        if (confirm('Realmente deseja apagar?')) {
          ClientesServices.deleteById(id)
            .then(result => {
              if (result instanceof Error) {
                alert(result.message);
              } else {
                alert('Registro apagado com sucesso!');
                navigate('/pessoas');
              }
            });
        }
      };

    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo cliente' : nome}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {() => handleSave}
                aoClicarBotaoSalvarEVoltar = {() => handleSave}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/clientes/detalhesDeClientes/novo')}
                aoClicarBotaoVoltar = {() => navigate('/clientes')}
        />}>
        
       {isLoading &&(
        <LinearProgress variant='indeterminate' />
       )} 
        
        
        
        <p>Detalhe de clientes{id}</p>
        
        </LayoutBase>
    )        
}