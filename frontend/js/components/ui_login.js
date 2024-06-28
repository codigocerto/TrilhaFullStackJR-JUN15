import { validar_usuario, atualizarMeusProjetos } from "../data/data.js";
import { showMeusProjetos } from "./ui_pagina_meus_projetos.js";

const loginButtonsDiv = $("#login-buttons");
const buttonLogin = $(`<button id="login" type="button" class="btn btn-outline-light me-2">Login</button>`);
const buttonSignUp = $(`<button id="signup" type="button" class="btn btn-light me-2">Sign-up</button>`);
const buttonLogout = $(`<button id="login" type="button" class="btn btn-outline-light me-2">Logout</button>`);

let logado = false;

export async function verifyLogado(){
    console.log(localStorage.getItem('access_token'));
    if(localStorage.getItem('access_token') !== ''){
        if(await atualizarMeusProjetos()){
            signedUp();
            logado = true;
            return true;
        }
        localStorage.setItem('access_token', '');
    }
    loginButtons();
    logado = false;
    return false;
}

export function isLogado(){
    return logado;
}

function loginButtons(){
    loginButtonsDiv.empty();
    loginButtonsDiv.append(buttonLogin);
    loginButtonsDiv.append(buttonSignUp);
}

function signedUp(){
    loginButtonsDiv.empty();
    loginButtonsDiv.append(buttonLogout);
}

buttonLogin.on("click", () => {
    showLoginPage();
})
buttonLogout.on("click", () => {
    localStorage.setItem('access_token', '');
    location.reload();
})


//elementos da página de exibição
const projetoView = $("#view"); 
const listaProjetos = $("#lista-projetos");
const titulo = $("#titulo-lista");
const anchor = $("#anchor"); //anchor no topo da lista com o título da lista

//seção onde será mostrado o formulário para editar
const projetoViewBox = $(`<div class="container my-5"></div>`);
//container dentro da seção que será inserido o formulário
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3 mt-5"></div>`);

const loginForm = $(`
    <form>
        <h1 class="h3 mb-3 fw-normal">Entrar</h1>

        <div class="form-floating">
            <input required name="username" type="text" class="form-control mb-2" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Usuário</label>
        </div>
        <div class="form-floating">
            <input required name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Senha</label>
        </div>
        <button class="btn btn-primary w-100 py-2 mt-5" type="submit">Sign in</button>
  </form>`);

export function showLoginPage(){
    projetoView.empty()
    projetoViewBoxText.empty()

    projetoViewBoxText.append(loginForm);
    projetoView.append(projetoViewBoxText);

    const username = loginForm.find("#floatingInput");
    const password = loginForm.find("#floatingPassword");



    loginForm.on("submit", async(e) => {
        e.preventDefault();
        const token = await validar_usuario(username.val(), password.val());
        console.log(token)

        localStorage.setItem('access_token', token.access_token);
        console.log(localStorage.getItem('access_token'))

        await atualizarMeusProjetos();
        await verifyLogado();
        $(".nav-link").removeClass("active");
        $("#meus-projetos").addClass("active");
        showMeusProjetos();
    });

}