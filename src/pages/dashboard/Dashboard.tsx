import { LayoutBase } from "../../shared/layouts";



export const Dashboard: React.FC = () => {

    return(
        <LayoutBase 
            titulo= 'Página inicial'
            barraDeFerramentas={<>barraDeFerramentas</>} >
           Dashboard
        </LayoutBase>
    )
};