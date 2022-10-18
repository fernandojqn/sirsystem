import { LayoutBase } from "../../shared/layouts";
import { FerramentasDeDetalhes } from "../../shared/components";


export const Dashboard: React.FC = () => {

    return(
        <LayoutBase 
            titulo= 'Página inicial'
            barraDeFerramentas={(
                <FerramentasDeDetalhes textoBotaoNovo="Novo"/>
                )} >
        DashBoard
        </LayoutBase>
    )
};