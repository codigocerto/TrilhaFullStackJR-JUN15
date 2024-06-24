//arquivo de conexões com a API

//ícone de carregamento
const loadingIcon = $(".spinner-border");

//função para exibir e esconder ícone de carregamento
//é ativada no início das requisições e escondida no fim
function loadingSpinner(){
    loadingIcon.toggle();
}

//URL da API
const URL = "https://trilhafullstackjr-jun15-production-2f5f.up.railway.app";
// const URL = "http://127.0.0.1:2130";

//requisita a lista de todos os projetos
export async function getProjetos(){
    loadingSpinner();
    try{
        const response = await fetch (`${URL}/projetos`);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        loadingSpinner();
        return data

    }
    catch(error){
        console.error(error);
        loadingSpinner();
        return null;
    }
}

//envia um novo projeto para ser adicionado, e retorna a lista de projetos atualizada
export async function addProjeto(dadosProjeto){
    loadingSpinner();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projeto/criar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner()
        return data;
    }
    catch(error){
        alert("O projeto não pôde ser inserido");
        console.error(error);
    }
    loadingSpinner();

}

//edita um projeto, e retorna a lista de projetos atualizada
export async function editarProjeto(dadosProjeto){
    loadingSpinner();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projeto/editar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner()
        return data;
    }
    catch(error){
        alert("O projeto não pôde ser editado");
        console.error(error);
    }
    loadingSpinner();
}

//remove os projetos com os ids passados, e retorna a lista de projetos atualizada
export async function removerProjeto(ids){
    loadingSpinner();
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ids": ids})
    };

    try{
        const response = await fetch(`${URL}/projetos/deletar`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if(data["projetos não encontrados"].length > 0){
            throw new Error(`O seguintes projetos não puderam ser removidos ${data["projetos não encontrados"].join(" ")}`);
        }
        loadingSpinner();
        return data;
    }
    catch(error){
        alert("O projeto não pôde ser removido");
        console.error(error);
    }
    loadingSpinner();

}

//recebe e armazena a lista de projetos

let projetos = await getProjetos();
if(!projetos){
    alert("Não foi possível se conectar so servidor.");
}


//exporta uma função para retornar a lista de projetos
export function getListaProjetos(){
    return projetos;
}

//exporta uma função para setar a lista de projetos
export function setProjetos(atualizacaoProjetos){
    projetos = atualizacaoProjetos;
}
