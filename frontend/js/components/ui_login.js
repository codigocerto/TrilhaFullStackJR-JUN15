import { cadastrar_usuario, validar_usuario, atualizarMeusProjetos, atualizarUsuarioAtivo, alterar_senha, deletar_usuario } from "../data/data.js";
import { showMeusProjetos } from "./ui_pagina_meus_projetos.js";
import { slideUpAnchor } from "../main.js";

let logado;
let usuarioAtivo;

export async function verifyLogado(){
    logado = false;
    usuarioAtivo = await atualizarUsuarioAtivo();
    if(localStorage.getItem('access_token') !== ''){
        if(await atualizarMeusProjetos()){
            signedUp();
            logado = true;
            showMeusProjetos();
            return true;
        }
        localStorage.setItem('access_token', '');
    }
    loginButtons();
    logado = false;
    return false;
}

const loginButtonsDiv = $("#login-buttons");
const buttonLogin = $(`<button id="login" type="button" class="btn btn-outline-light me-2">Entrar</button>`);
const buttonSignUp = $(`<button id="signup" type="button" class="btn btn-light me-2">Cadastrar</button>`);

const settings = nomeUsuarioAtivo => $(`
    <div class="flex-shrink-0 btn-group dropdown mx-3">
          <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>${nomeUsuarioAtivo}</strong>
          </a>
          <ul class="dropdown-menu dropdown-menu-end text-small shadow" style="">
            <li><a id="opcoes" class="dropdown-item" href="#">Opções</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a id="logout" class="dropdown-item" href="#">Sair</a></li>
          </ul>
        </div>`);


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
    loginButtonsDiv.append(settings(usuarioAtivo.username));
    $("#logout").on("click", () => {
        if(!confirm("Deseja sair?")){
            return;
        }
        logout();
    });
    $("#opcoes").on("click", showOpcoesPage);
}

buttonLogin.on("click", () => {
    showLoginPage();
    slideUpAnchor();
})

buttonSignUp.on("click", () => {
    showSignUp();
    slideUpAnchor();
})

export function logout(){
    localStorage.setItem('access_token', '');
    location.reload();
}


//elementos da página de exibição
const projetoView = $("#view"); 
//container dentro da seção que será inserido o formulário
const projetoViewBoxText = $(`<div id="view-box-text" class="p-5 text-center bg-body-tertiary rounded-3 mt-5"></div>`);

const loginForm = $(`
    <form>
        <h1 class="h3 mb-5 fw-normal">Entre com a sua conta</h1>

        <div id="username-form" class="form-floating">
            <input required name="username" type="text" class="form-control mb-2" id="floatingInput" placeholder="name@example.com" autocomplete="on">
            <label for="floatingInput">Usuário</label>
        </div>
        <div id="password-form" class="form-floating">
            <input required name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="on">
            <label for="floatingPassword">Senha</label>
        </div>
        <button class="btn btn-primary w-100 py-2 mt-4" type="submit">Entrar</button>
        <hr>
        <button id="login-cadastrar" class="btn btn-outline-light w-100 py-2" type="button">Cadastrar</button>
  </form>`);

const invalidFeedback = mensagem => (`
    <div class="text-danger pt-1">
        ${mensagem}
    </div>`)

const opcoesForm = $(`
    <form>
        <h1 class="h3 mb-5 fw-normal">Alterar Senha</h1>
        <div id="new-password-form" class="form-floating mb-3">
            <input required name="password" type="password" class="form-control" id="floatingNewPassword" placeholder="Password" autocomplete="on">
            <label for="floatingPassword">Nova senha</label>
        </div>
        <button class="btn btn-primary w-100 py-2 mt-4" type="submit">Alterar</button>
        <hr>
        <button id="deletarConta" class="btn btn-warning w-100 py-2 my-5" type="button">Deletar conta</button>
  </form>`);


function showOpcoesPage(){
    projetoView.empty()
    projetoViewBoxText.empty()

    projetoViewBoxText.append(opcoesForm);
    projetoView.append(projetoViewBoxText);
    const newPassword = opcoesForm.find("#floatingNewPassword");
    const deletarContaBotao = opcoesForm.find("#deletarConta");

    slideUpAnchor();

    opcoesForm.on("submit", async(e) => {
        e.preventDefault();
        const novaSenha = newPassword.val();
        if(!confirm("A senha será alterada. Deseja continuar?")){
            return;
        }
        
        if(await alterar_senha(novaSenha)){
            alert("Senha alterada!");
        }

    });
    deletarContaBotao.on("click", async () => {
        if(!confirm("A conta e os projetos associados serão permanentemente deletados. Deseja continuar?")){
            return;
        }
        if(await deletar_usuario()){
            alert("Conta deletada!");
            logout();
        }
        else{
            logout();
        }

    });
}

export function showLoginPage(){
    projetoView.empty()
    projetoViewBoxText.empty()

    projetoViewBoxText.append(loginForm);
    projetoView.append(projetoViewBoxText);

    const username = loginForm.find("#floatingInput");
    const password = loginForm.find("#floatingPassword");

    $("#login-cadastrar").on("click", () => {
        showSignUp();
    });

    loginForm.on("submit", async(e) => {
        e.preventDefault();
        const token = await validar_usuario(username.val(), password.val());
        if(!token){
            if(!username.hasClass("is-invalid")){
                username.addClass("is-invalid");
                password.addClass("is-invalid");
                loginForm.find("#password-form").append(invalidFeedback("Usuário ou senha incorretos."));
            }
            return;
        }

        localStorage.setItem('access_token', token.access_token);

        await verifyLogado();
        $(".nav-link").removeClass("active");
        $("#meus-projetos").addClass("active");
        showMeusProjetos();
    });

}

const cadastrarForm = $(`
    <form>
        <h1 class="h3 mb-5 fw-normal">Crie sua conta</h1>

        <div id="username-form" class="form-floating">
            <input required name="username" type="text" class="form-control mb-2" id="floatingInput" placeholder="name@example.com" autocomplete="on">
            <label for="floatingInput">Usuário</label>
        </div>
        <div id="password-form" class="form-floating">
            <input required name="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" autocomplete="on">
            <label for="floatingPassword">Senha</label>
        </div>
        <button class="btn btn-primary w-100 py-2 mt-5" type="submit">Cadastrar</button>
  </form>`);

export function showSignUp(){
    projetoView.empty()
    projetoViewBoxText.empty()

    projetoViewBoxText.append(cadastrarForm);
    projetoView.append(projetoViewBoxText);

    const username = cadastrarForm.find("#floatingInput");
    const password = cadastrarForm.find("#floatingPassword");

    cadastrarForm.on("submit", async(e) => {
        e.preventDefault();
        const usuario = await cadastrar_usuario(username.val(), password.val());
        if(!usuario){
            if(!username.hasClass("is-invalid")){
                username.addClass("is-invalid");
                cadastrarForm.find("#password-form").append(invalidFeedback("Usuário já existe"));
            }
            return;
        }
        const token = await validar_usuario(username.val(), password.val());

        localStorage.setItem('access_token', token.access_token);

        await verifyLogado();
        $(".nav-link").removeClass("active");
        $("#meus-projetos").addClass("active");
        showMeusProjetos();
    });

}