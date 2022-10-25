import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemClientes {
    id: number;
    nome: string;
    cidadeId: number;
    email: string;
}

export interface IDetalhesCliente {
    id: number;
    nome: string;
    cidadeId: number;
    email: string;
}

type TClientesComTotalCount = {
    data: IListagemClientes[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TClientesComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/clientes?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar os clientes')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar os clientes') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesCliente | Error> => {
    try {
        const { data } = await Api.get(`/clientes/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar o cliente');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar o cliente') 
    }
}

const create = async (dados: Omit<IDetalhesCliente, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesCliente>('/clientes', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro Cliente')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro Cliente') 
    }
}

const updateById = async (id: number, dados: IDetalhesCliente): Promise<void | Error> => {
    try {
        const { data } = await Api.put<IDetalhesCliente>(`/clientes/${id}`, dados);
        
        return new Error('erro ao atualizar registro Cliente')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao atualizar registro Cliente') 
    }
}

const deleteById = async (id: number): Promise<any> => {
    try {
        const { data } = await Api.delete<IDetalhesCliente>(`/clientes/${id}`);
        
        return new Error('erro ao deletar registro Cliente')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro Cliente') 
    }
}


export const ClientesServices = {
    getAll, getById, create, updateById, deleteById
};