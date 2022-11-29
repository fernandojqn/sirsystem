import { Api } from "../axios-config";
import { Environment } from "../../../enviroments";

export interface IListagemEmpresas {
    id: number;
    sufixo: string; nome: string; 
}

export interface IDetalhesEmpresas {
    id: number;
    sufixo: string; nome: string; 
    
    documento: string; inscricao: string; ccm: string;
    
    contato: string; tel: string; cel: string; email: string; site: string;
    
    end: string; num: string; compl: string; bairro: string; cidade: string;
    uf: string; cep: string; pais: string; muni: string;
    
    unidade: string; nomeUnidade: string; modeloCF: string; numSerie: string; obs: string;
    obsFisco: string;

    codNatureza: string; modeloNF: string; serie: string; optSN: boolean;
    aliqICMS: number; aliqCOFINS: number; aliqPIS: number; perfil: string;
    
    tipoRegime: string; criEscrit: string; aproCredito: string; tipoContri: string;
    codEstruttura: string; codOperacao: string;
}

type TEmpresasComTotalCount = {
    data: IListagemEmpresas[]; // variavel com as informações de busca
    totalCount: number; //a quantidade de resultados
}

//GetAll buscar todos
// vai ser uma constante que vai aguardar : Recebimento <qualquer coisa / nada> e vai fazer 
const getAll = async (page = 1, filter = ''): Promise<TEmpresasComTotalCount | Error> => { //receber como padrão a pagina 1
    try {
        // criei um constante e ela recebe o que tem que procurar divide por paginas e coloca a quantidade que eu formatei e pegar o nome
        const urlRelativa = `/empresas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&sufixo_like=${filter}`;
        //constante que vai receber a data = aguardar a Api pegar os resultados (caminho)
        const { data, headers } = await Api.get(urlRelativa)
        
        if(data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
            }
        }

        return new Error('erro ao listar as empresas')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao listar as empresas') 
    }
}


// Get by id Buscar por ID
const getById = async (id: number): Promise<IDetalhesEmpresas | Error> => {
    try {
        const { data } = await Api.get(`/empresas/${id}`);
        
        if(data) {
            return data;
        }

        return new Error('erro ao carregar a empresa');

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao carregar a empresa') 
    }
}

const create = async (dados: Omit<IDetalhesEmpresas, 'id'>): Promise<number | Error> => { //Omit esconder o dado id
    try {
        const { data } = await Api.post<IDetalhesEmpresas>('/empresas', dados);
        
        if(data) {
            return data.id; // A resposta vai ser só o ID pois já tenho todas as informações
        }

        return new Error('erro ao criar registro de empresas')

    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao criar registro de empresa') 
    }
}

const updateById = async (id: number, dados: IDetalhesEmpresas): Promise<void | Error> => {
    try {
      await Api.put(`/empresas/${id}`, dados);
    } catch (error) {
      console.error(error);
      return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
    }
  };

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/empresas/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as {message: string}).message || 'erro ao deletar registro.') 
    }
}


export const EmpresasServices = {
    getAll, getById, create, updateById, deleteById
};

