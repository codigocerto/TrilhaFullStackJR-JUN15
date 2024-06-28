//arquivo de conexões com a API

//ícone de carregamento
const loadingIcon = $(".spinner-border");

//função para exibir e esconder ícone de carregamento
//é ativada no início das requisições e escondida no fim
function loadingSpinner(){
    loadingIcon.toggle();
}

//URL da API
// const URL = "https://trilhafullstackjr-jun15-production-2f5f.up.railway.app";
const URL = "http://127.0.0.1:2130";

//requisita a lista de todos os projetos públicos
export async function getProjetosPublicos(){
    loadingSpinner();
    try{
        const response = await fetch (`${URL}/projetos/`);
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

//requisita a lista de todos os projetos do usuário
export async function getMeusProjetos(){
    if(localStorage.getItem('access_token') == ''){
        console.log("return");
        return;
    }
    loadingSpinner();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    }
    try{
        const response = await fetch (`${URL}/projetos/usuario`, options);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        loadingSpinner();
        localStorage.getItem('access_token');
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
        const response = await fetch(`${URL}/projetos/criar`, options);
        
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
        const response = await fetch(`${URL}/projetos/editar`, options);
        
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
        const response = await fetch(`${URL}/projetos/deletar_varios`, options);
        
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

//autenticação do usuário
export async function validar_usuario(username, password){
    loadingSpinner();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            "username": username,
            "password": password
        })
    };
    try{
        const response = await fetch(`${URL}/auth/token`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // if(data["projetos não encontrados"].length > 0){
        //     throw new Error(`O seguintes projetos não puderam ser removidos ${data["projetos não encontrados"].join(" ")}`);
        // }
        loadingSpinner();
        return data;
    }
    catch(error){
        loadingSpinner();
        console.error(error);
    }
}

//recebe e armazena a lista de projetos públicos
let projetosPublicos = await getProjetosPublicos();
if(!projetosPublicos){
    alert("Não foi possível se conectar ao servidor.");
}
export function importProjetosPublicos(){
    return projetosPublicos;
}
export function setProjetos(atualizacaoProjetos){
    projetos = atualizacaoProjetos;
}

//recebe e armazena a lista de projetos do usuário
let logado= false;
let meusProjetos;
// let meusProjetos = await getMeusProjetos();
// if(meusProjetos){
//     logado = true;
// }
// else{
//     console.error("Usuário não conectado");
// }
export async function atualizarMeusProjetos(){
    meusProjetos = await getMeusProjetos();
    console.log(meusProjetos);
    if(meusProjetos){
        return true;
    }
    return false;
}
export function importMeusProjetos(){
    return meusProjetos;
}
export function setMeusProjetos(atualizacaoProjetos){
    meusProjetos = atualizacaoProjetos;
}
