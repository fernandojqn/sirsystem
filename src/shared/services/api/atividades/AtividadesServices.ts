import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemAtividades {
    id: number;
    atividade: string;
    
}

export interface IDetalhesAtividades {
    id: number; 
    atividade: string;
}

type TAtividadeComTotalCount = {
    data: IListagemAtividades[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TAtividadeComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/atividades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&atividade_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar as atividades')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar as atividades') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesAtividades | Error> => {
    try {
        const { data } = await Api.get(`/atividades/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar a atividade');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar a atividade') 
    }
}

const create = async (dados: Omit<IDetalhesAtividades, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesAtividades>('/atividades', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro de atividades')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro de atividade') 
    }
}

const updateById = async (id: number, dados: IDetalhesAtividades): Promise<void | Error> => {
    try {
      await Api.put(`/atividades/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/atividades/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}


export const AtividadesServices = {
    getAll, getById, create, updateById, deleteById
};

//