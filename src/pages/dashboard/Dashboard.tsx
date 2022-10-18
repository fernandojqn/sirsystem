import { LayoutBase } from "../../shared/layouts";
import { BarraDeListagem } from "../../shared/components";


export const Dashboard: React.FC = () => {

    return(
        <LayoutBase 
            titulo= 'Página inicial'
            barraDeFerramentas={(
                <BarraDeListagem mostrarInputBusca={true} textoDoBotaoNovo={'Novo'}/>
                )} >
        DashBoard
        </LayoutBase>
    )
};