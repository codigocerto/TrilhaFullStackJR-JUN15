//arquivo principal
if(localStorage.getItem('access_token') === null){
    localStorage.setItem('access_token', '');
}

//verifica se o dispositivo do usuário tem preferência por modo escuro, e aplica de acordo
const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
if(isDarkTheme){
    $("html").attr("data-bs-theme", "dark");
}

//imports das funções das páginas de exibição
import { showProjetosPublicos } from "./components/ui_pagina_projetos_publicos.js";
import { showMeusProjetos } from "./components/ui_pagina_meus_projetos.js";
import { showRemoverProjetos } from "./components/ui_remover_projetos.js";
import { showAdicionarProjeto } from "./components/ui_adicionar_projetos.js";
import { showEditarProjeto } from "./components/ui_editar_projetos.js";
import { isLogado, showLoginPage, verifyLogado } from "./components/ui_login.js";
import { atualizarProjetosPublicos } from "./data/data.js";

await verifyLogado();
await atualizarProjetosPublicos();

//elementos dos botões das abas
const botaoProjetosPublicos = $("#projetos-publicos");
const botaoMeusProjetos = $("#meus-projetos");
const botaoAdicionar = $("#adicionar");
const botaoEditar = $("#editar");
const botaoRemover = $("#remover");

const anchor = $("#anchor");
const sidebar = $("#sidebar");
const area = $("#area");


//slide da lista ao clicar no anchor
anchor.on("click", () => {
    sidebar.toggleClass("d-flex");
    sidebar.slideToggle("slow");
});
export function slideUpAnchor(){
    if(area.css("display") == "flex"){
        return;
    }
    sidebar.removeClass("d-flex");
    sidebar.slideUp("slow");
}


//ação de exibir página
botaoProjetosPublicos.on("click", () => {
    $(".nav-link").removeClass("active");
    botaoProjetosPublicos.addClass("active");
    showProjetosPublicos();
})
botaoMeusProjetos.on("click", () => {
    if(!isLogado()){
        showLoginPage();
        slideUpAnchor();
        return;
    }
    $(".nav-link").removeClass("active");
    botaoMeusProjetos.addClass("active");
    showMeusProjetos();
})
botaoAdicionar.on("click", () => {
    if(!isLogado()){
        showLoginPage();
        slideUpAnchor();
        return;
    }
    $(".nav-link").removeClass("active");
    botaoAdicionar.addClass("active");
    slideUpAnchor();
    showAdicionarProjeto();

});
botaoEditar.on("click", () => {
    if(!isLogado()){
        showLoginPage();
        slideUpAnchor();
        return;
    }
    $(".nav-link").removeClass("active");
    botaoEditar.addClass("active");
    showEditarProjeto();
});
botaoRemover.on("click", () => {
    if(!isLogado()){
        showLoginPage();
        slideUpAnchor();
        return;
    }
    $(".nav-link").removeClass("active");
    botaoRemover.addClass("active");
    showRemoverProjetos();
});

if(isLogado()){
    botaoMeusProjetos.click();
}
else{
    botaoProjetosPublicos.click();
}


//clica na aba ao iniciar a página
// botaoLogin.click()
// botaoProjetosPublicos.click()
// botaoMeusProjetos.click()
// botaoAdicionar.click();
// botaoEditar.click();
// botaoRemover.click();


