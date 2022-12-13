import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemClientes {
    id: number;
    sufixo: string; nome: string; 
    
}

export interface IDetalhesCliente {
    id: number; 
    sufixo: string; nome: string; 
    tipoEmpresa: string; documento: string; inscricao: string; ccm: string;
    contato: string; tel: string; cel: string; email: string; site: string;

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string; 

    endEnt: string; numEnt: string; complEnt: string; bairroEnt: string; cidadeEnt: string;
    ufEnt: string; cepEnt: string; paisEnt: string; muniEnt: string; 

    endCor: string; numCor: string; complCor: string; bairroCor: string; cidadeCor: string;
    ufCor: string; cepCor: string; paisCor: string; muniCor: string; 

    pag1: string; pag2: string; pag3: string; pag4: string; pag5: string; 
    pag6: string; desc1: string; desc2: string; desc3: string; obs: string; 
    
    ativ: number; vend: number;
    cofins: number; pis: number; icms: number; ipi: number;

    simplesNasc: string; retemISS: string;
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

        return new Error('erro ao criar registro de Cliente')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro Cliente') 
    }
}

const updateById = async (id: number, dados: IDetalhesCliente): Promise<void | Error> => {
    try {
      await Api.put(`/clientes/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/clientes/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}

export const ClientesServices = {
    getAll, getById, create, updateById, deleteById
};