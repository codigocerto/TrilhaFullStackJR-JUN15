import { logout } from "../components/ui_login.js";

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
        if(response.status === 401){
            alert(`Sessão expirada. Faça login novamente`);
            logout();
        }
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projetos/criar`, options);
        if(response.status === 401){
            alert(`Sessão expirada. Faça login novamente`);
            logout();
        }
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(dadosProjeto)
    };

    try{
        const response = await fetch(`${URL}/projetos/editar`, options);
        if(response.status === 401){
            alert(`Sessão expirada. Faça login novamente`);
            logout();
        }
        
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({"ids": ids})
    };

    try{
        const response = await fetch(`${URL}/projetos/deletar_varios`, options);
        if(response.status === 401){
            alert(`Sessão expirada. Faça login novamente`);
            logout();
        }
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

//criação de conta
export async function cadastrar_usuario(username, password){
    loadingSpinner();
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "senha": password
        })
    };
    try{
        const response = await fetch(`${URL}/usuarios/cadastrar`, options);
        if(response.status === 409){
            loadingSpinner();
            return false;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner();
        return data;
    }
    catch(error){
        loadingSpinner();
        console.error(error);
    }
}

//deletar conta
export async function deletar_usuario(){
    loadingSpinner();
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    };
    try{
        const response = await fetch(`${URL}/usuarios/deletar`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner();
        return data;
    }
    catch(error){
        alert("Não foi possível deletar a conta.")
        loadingSpinner();
        console.error(error);
    }
}
//alterar senha
export async function alterar_senha(password){
    loadingSpinner();
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
            "username": "",
            "senha": password,
            "ativo": null
        })
    };
    try{
        const response = await fetch(`${URL}/usuarios/editar`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner();
        return data;
    }
    catch(error){
        loadingSpinner();
        alert("Não foi possível alterar a senha");
        console.error(error);
    }
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
        if(response.status === 401){
            loadingSpinner();
            return false;
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner();
        return data;
    }
    catch(error){
        loadingSpinner();
        console.error(error);
    }
}

//remove os projetos com os ids passados, e retorna a lista de projetos atualizada
export async function getUsuarioAtivo(){
    if(localStorage.getItem('access_token') == ''){
        return;
    }
    loadingSpinner();
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
    };

    try{
        const response = await fetch(`${URL}/auth/usuario`, options);
        if(response.status === 401){
            alert(`Sessão expirada. Faça login novamente`);
            logout();
        }
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        loadingSpinner();
        return data;
    }
    catch(error){
        console.error(error);
    }
    loadingSpinner();

}

//recebe e armazena a lista de projetos públicos
let projetosPublicos;
export async function atualizarProjetosPublicos(){
    projetosPublicos = await getProjetosPublicos();
}
export function importProjetosPublicos(){
    return projetosPublicos;
}
export function setProjetosPublicos(atualizacaoProjetos){
    projetosPublicos = atualizacaoProjetos;
}

//recebe e armazena a lista de projetos do usuário
let meusProjetos;
export async function atualizarMeusProjetos(){
    meusProjetos = await getMeusProjetos();
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

//retorna o usuário ativo
let usuarioAtivo;
export async function atualizarUsuarioAtivo(){
    usuarioAtivo = await getUsuarioAtivo();
    return usuarioAtivo
}