import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemVendedores {
    id: number;
    nome: string; 
    contato: string;
    tel: string;
}

export interface IDetalhesVendedores {
    id: number; 
    nome: string; documento: string; inscricao: string; 
    contato: string; tel: string; cel: string; email: string;

    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string; 

    comissao: number; irpf: number; 
    banco: string; agencia: string; conta: string; pix: string;
    obs: string;
}

type TVendedoresComTotalCount = {
    data: IListagemVendedores[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TVendedoresComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/vendedores?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar os vendedores')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar os vendedores') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesVendedores | Error> => {
    try {
        const { data } = await Api.get(`/vendedores/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar o vendedor');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar o vendedor') 
    }
}

const create = async (dados: Omit<IDetalhesVendedores, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesVendedores>('/vendedores', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro de vendedor')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro vendedor') 
    }
}

const updateById = async (id: number, dados: IDetalhesVendedores): Promise<void | Error> => {
    try {
      await Api.put(`/vendedores/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/vendedores/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}

export const VendedoresServices = {
    getAll, getById, create, updateById, deleteById
};