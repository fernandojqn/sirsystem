import { useEffect,  useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDeDetalhes } from "../../shared/components"
import { LayoutBase } from "../../shared/layouts"
import { ClientesServices } from "../../shared/services/api/clientes/ClientesServices";
import { VForm, useVForm, IVFormErrors } from "../../shared/forms";
import * as yup from 'yup';
import ClienteForm from "../../shared/forms/cliente-form/ClienteForm";


interface IFormData {
    sufixo: string; nome: string; documento: string; inscricao: string; ccm: string;
    contato: string; tel: string; cel: string; email: string; site: string; 
}



const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
    sufixo: yup.string().required().min(3),
    nome: yup.string().notRequired().default(''), 
    documento: yup.string().notRequired().default(''),
    inscricao: yup.string().notRequired().default(''),
    ccm: yup.string().notRequired().default(''),
    contato: yup.string().notRequired().default(''),
    tel: yup.string().notRequired().default(''),
    cel: yup.string().notRequired().default(''),
    email: yup.string().email().notRequired().default(''),
    site: yup.string().url().notRequired().default(''),
});


export const DetalhesDeClientes: React.FC = () => {
    // passar o submit para o botão salvar  
    const  {formRef, save, saveAndClose, isSaveAndClose } = useVForm();

    const navigate = useNavigate();
    const { id = 'novo' } = useParams<'id'>();
    const [isLoading, setIsLoading] = useState(false);
    const [sufixo, setSufixo] = useState('');
    

    //trazer dados do cliente
    useEffect(() => {
        if (id !== 'novo') { // se for diferente de novo
            setIsLoading(true);

            ClientesServices.getById(Number(id))
            .then((result) => {
                setIsLoading(false);

                if (result instanceof Error) {
                    alert(result.message);
                    navigate('/clientes');
                } else {
                    setSufixo(result.sufixo);
                    formRef.current?.setData(result);
                }
            });
        } else { 
            formRef.current?.setData({
                sufixo: '', nome: '', documento: '', inscricao: '', ccm: '',
            });
        }
    }, [id]);

    const handleSave = (dados: IFormData) => {
        
        //validação
        formValidationSchema.
            validate(dados, {abortEarly: false}) //abortEarly:false valida todos os campos
            .then((dadosValidados) => {
                
                setIsLoading(true)

                if (id === 'novo') {
                    ClientesServices.create(dadosValidados)
                    .then((result) => {
                        setIsLoading(false)

                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            if (isSaveAndClose()) {
                                navigate('/clientes');   
                            } else {
                                navigate(`/clientes/detalhesDeClientes/${result}`);   
                            }
                            
                        }
                    })
                }
                else {
                    ClientesServices.updateById(Number(id), {id: Number(id), ...dadosValidados})
                    .then((result) => {
                        setIsLoading(false)
                        
                        if (result instanceof Error ) {
                            alert(result.message);
                        } else {
                            setSufixo(dados.sufixo);
                            if (isSaveAndClose()) {
                                navigate('/clientes');   
                            }
                        }
                    });
                }
            })

            .catch ((errors: yup.ValidationError) => {
                const validationErrors: IVFormErrors = {};

                errors.inner.forEach(error => {
                    if(!error.path) return;

                    validationErrors[error.path] = error.message;

                });

                console.log(validationErrors)

                formRef.current?.setErrors(validationErrors); // escrever texto especifico {nome: 'Precisa', email: 'necessita'}
            })
    };

    const handleDelete = (id: number) => {
                         
          ClientesServices.deleteById(id)
            .then(result => {
              
                if (result instanceof Error) {
                alert(result.message);
              } else {
                alert('Registro apagado com sucesso!');
                navigate('/clientes');
              }
            });
        
      };


    return(
        <LayoutBase 
            titulo= {id === 'novo' ? 'Novo cliente' : sufixo}
            barraDeFerramentas = {<FerramentasDeDetalhes 
                mostrarBotaoNovo = {id !== 'novo'}
                mostrarBotaoApagar = {id !== 'novo'}

                aoClicarBotaosalvar = {save}
                aoClicarBotaoSalvarEVoltar = {saveAndClose}
                aoClicarBotaoApagar = {() => handleDelete(Number(id))}
                aoClicarBotaoNovo = {() => navigate('/clientes/detalhesDeClientes/novo')}
                aoClicarBotaoVoltar = {() => navigate('/clientes')}
        />}>
        
        {/* Formulario*/}
            <VForm ref={formRef} onSubmit= {handleSave} >
                <ClienteForm/>
            </VForm>
         </LayoutBase>
    )        
}