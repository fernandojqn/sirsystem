import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemUsuarios {
    id: number;
    login: string;
    nome: string;
}

export interface IDetalhesUsuarios {
    id: number; 
    nome: string; login: string;
    permissoes: string; departamento: string;
    tel: string; cel: string; email: string;

}

type TUsuariosComTotalCount = {
    data: IListagemUsuarios[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TUsuariosComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/usuarios?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar os usuários')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar os usuários') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesUsuarios | Error> => {
    try {
        const { data } = await Api.get(`/usuarios/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar o usuário');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar o usuário') 
    }
}

const create = async (dados: Omit<IDetalhesUsuarios, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesUsuarios>('/usuarios', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro de usuários')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro do usuário') 
    }
}

const updateById = async (id: number, dados: IDetalhesUsuarios): Promise<void | Error> => {
    try {
      await Api.put(`/usuarios/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/usuarios/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}


export const UsuariosServices = {
    getAll, getById, create, updateById, deleteById
};

//