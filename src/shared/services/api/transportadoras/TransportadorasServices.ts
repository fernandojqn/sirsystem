import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemFornecedores {
    id: number;
    sufixo: string; 
}

export interface IDetalhesFornecedores {
    id: number; 
    sufixo: string; nome: string; documento: string; inscricao: string; ccm: string;
    contato: string; tel: string; cel: string; email: string; site: string;

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string;
    
    cliente: boolean;
}

type TFornecedoresComTotalCount = {
    data: IListagemFornecedores[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TFornecedoresComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/fornecedores?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&sufixo_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar as fornecedores')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar os fornecedores') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesFornecedores | Error> => {
    try {
        const { data } = await Api.get(`/fornecedores/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar o fornecedor');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar o fornecedor') 
    }
}

const create = async (dados: Omit<IDetalhesFornecedores, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesFornecedores>('/fornecedores', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro de fornecedores')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro do fornecedor') 
    }
}

const updateById = async (id: number, dados: IDetalhesFornecedores): Promise<void | Error> => {
    try {
      await Api.put(`/fornecedores/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/fornecedores/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}


export const FornecedoresServices = {
    getAll, getById, create, updateById, deleteById
};

//